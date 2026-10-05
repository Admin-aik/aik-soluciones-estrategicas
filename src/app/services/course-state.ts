import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course, CourseGenerationRequest, CourseUnit, Lesson, ContactInquiry } from '../models/course.model';
import { DEFAULT_AIK_COURSE } from '../data/default-course';
import { Observable, catchError, of, tap } from 'rxjs';

export type AppView = 'inicio' | 'metodologia' | 'contacto' | 'disenador' | 'aula' | 'blog';

@Injectable({
  providedIn: 'root',
})
export class CourseState {
  private readonly http = inject(HttpClient);

  // Splash screen state (5 seconds intro)
  readonly showSplash = signal<boolean>(true);
  readonly splashSecondsLeft = signal<number>(5);
  private splashTimer: ReturnType<typeof setInterval> | null = null;

  // Navigation & Deployed Section on Landing Page
  readonly currentView = signal<AppView>('inicio');
  readonly deployedSection = signal<string | null>(null);

  // Courses collection
  readonly courses = signal<Course[]>([DEFAULT_AIK_COURSE]);
  readonly currentCourse = signal<Course>(DEFAULT_AIK_COURSE);

  // Active lesson in Aula Virtual
  readonly selectedUnitIndex = signal<number>(0);
  readonly selectedLessonIndex = signal<number>(0);

  // Progress and quiz state
  // key: `${courseId}_${unitIdx}_${lessonIdx}_${blockIdx}` -> selected answer index
  readonly quizAnswers = signal<Record<string, number>>({});
  // key: `${courseId}_${unitIdx}_${lessonIdx}` -> boolean
  readonly completedLessons = signal<Record<string, boolean>>({});

  // Loading and errors
  readonly isGenerating = signal<boolean>(false);
  readonly generationError = signal<string | null>(null);

  // Contact form submission status
  readonly isSubmittingContact = signal<boolean>(false);
  readonly contactSuccess = signal<boolean>(false);

  // Computed properties
  readonly currentUnit = computed<CourseUnit | undefined>(() => {
    const course = this.currentCourse();
    const uIdx = this.selectedUnitIndex();
    return course.units[uIdx];
  });

  readonly currentLesson = computed<Lesson | undefined>(() => {
    const unit = this.currentUnit();
    if (!unit) return undefined;
    const lIdx = this.selectedLessonIndex();
    return unit.lessons[lIdx];
  });

  readonly totalLessonsCount = computed<number>(() => {
    const course = this.currentCourse();
    return course.units.reduce((acc, u) => acc + u.lessons.length, 0);
  });

  readonly completedLessonsCount = computed<number>(() => {
    const courseId = this.currentCourse().id;
    const completed = this.completedLessons();
    return Object.keys(completed).filter(
      (k) => k.startsWith(courseId) && completed[k]
    ).length;
  });

  readonly courseProgressPercentage = computed<number>(() => {
    const total = this.totalLessonsCount();
    if (total === 0) return 0;
    const completed = this.completedLessonsCount();
    return Math.min(100, Math.round((completed / total) * 100));
  });

  constructor() {
    this.initSplashCountdown();
    this.loadSavedCourses();
  }

  private initSplashCountdown(): void {
    if (typeof window === 'undefined') {
      this.showSplash.set(false);
      return;
    }

    if (this.splashTimer) {
      clearInterval(this.splashTimer);
    }

    this.splashTimer = setInterval(() => {
      const current = this.splashSecondsLeft();
      if (current <= 1) {
        if (this.splashTimer) clearInterval(this.splashTimer);
        this.splashTimer = null;
        this.showSplash.set(false);
      } else {
        this.splashSecondsLeft.set(current - 1);
      }
    }, 1000);
  }

  skipSplash(): void {
    if (this.splashTimer) {
      clearInterval(this.splashTimer);
      this.splashTimer = null;
    }
    this.showSplash.set(false);
  }

  openSplash(): void {
    this.splashSecondsLeft.set(5);
    this.showSplash.set(true);
    this.initSplashCountdown();
  }

  setView(view: AppView): void {
    this.currentView.set(view);
    this.deployedSection.set(null);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  openSection(sectionKey: string | null): void {
    this.currentView.set('inicio');
    this.deployedSection.set(sectionKey);
    if (typeof window !== 'undefined') {
      if (sectionKey) {
        setTimeout(() => {
          const el = document.getElementById(`seccion-${sectionKey}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else {
            window.scrollTo({ top: 400, behavior: 'smooth' });
          }
        }, 120);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }

  closeSection(): void {
    this.deployedSection.set(null);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  scrollToSection(elementId: string): void {
    this.currentView.set('inicio');
    this.deployedSection.set(elementId.replace('nuestro-', '').replace('seccion-', ''));
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        const el = document.getElementById(elementId) || document.getElementById(`seccion-${elementId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 120);
    }
  }

  selectLesson(unitIdx: number, lessonIdx: number): void {
    this.selectedUnitIndex.set(unitIdx);
    this.selectedLessonIndex.set(lessonIdx);
    this.setView('aula');
  }

  markLessonCompleted(unitIdx: number, lessonIdx: number): void {
    const courseId = this.currentCourse().id;
    const key = `${courseId}_${unitIdx}_${lessonIdx}`;
    this.completedLessons.update((prev) => ({
      ...prev,
      [key]: true,
    }));
  }

  submitQuizAnswer(unitIdx: number, lessonIdx: number, blockIdx: number, answerIndex: number): void {
    const courseId = this.currentCourse().id;
    const key = `${courseId}_${unitIdx}_${lessonIdx}_${blockIdx}`;
    this.quizAnswers.update((prev) => ({
      ...prev,
      [key]: answerIndex,
    }));
  }

  getQuizAnswer(unitIdx: number, lessonIdx: number, blockIdx: number): number | undefined {
    const courseId = this.currentCourse().id;
    const key = `${courseId}_${unitIdx}_${lessonIdx}_${blockIdx}`;
    return this.quizAnswers()[key];
  }

  generateCourseWithAi(payload: CourseGenerationRequest): Observable<Course | null> {
    this.isGenerating.set(true);
    this.generationError.set(null);

    return this.http.post<Course>('/api/generate-course', payload).pipe(
      tap((course) => {
        this.isGenerating.set(false);
        if (course) {
          this.courses.update((list) => [course, ...list]);
          this.currentCourse.set(course);
          this.selectedUnitIndex.set(0);
          this.selectedLessonIndex.set(0);
          this.saveCoursesToStorage();
          this.setView('aula');
        }
      }),
      catchError((err) => {
        this.isGenerating.set(false);
        this.generationError.set('Ocurrió un error al contactar el servicio de IA. Inténtalo de nuevo.');
        console.error('Error generating course:', err);
        return of(null);
      })
    );
  }

  selectCourse(course: Course): void {
    this.currentCourse.set(course);
    this.selectedUnitIndex.set(0);
    this.selectedLessonIndex.set(0);
    this.setView('aula');
  }

  submitContactInquiry(inquiry: Partial<ContactInquiry>): Observable<{ success: boolean; message?: string }> {
    this.isSubmittingContact.set(true);
    this.contactSuccess.set(false);

    return this.http.post<{ success: boolean; message?: string }>('/api/contact', inquiry).pipe(
      tap(() => {
        this.isSubmittingContact.set(false);
        this.contactSuccess.set(true);
      }),
      catchError((err) => {
        this.isSubmittingContact.set(false);
        console.error('Error submitting contact form:', err);
        // Even if network glitches, confirm nicely on client
        this.contactSuccess.set(true);
        return of({ success: true });
      })
    );
  }

  private loadSavedCourses(): void {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem('aik_saved_courses');
      if (stored) {
        const parsed: Course[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Keep default course at the root and merge custom ones
          const filtered = parsed.filter((c) => c.id !== DEFAULT_AIK_COURSE.id);
          this.courses.set([DEFAULT_AIK_COURSE, ...filtered]);
        }
      }
    } catch (e) {
      console.warn('Could not read saved courses from storage', e);
    }
  }

  private saveCoursesToStorage(): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('aik_saved_courses', JSON.stringify(this.courses()));
    } catch (e) {
      console.warn('Could not persist courses to storage', e);
    }
  }
}
