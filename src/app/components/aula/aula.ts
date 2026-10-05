import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CourseState } from '../../services/course-state';
import { LessonBlock } from '../../models/course.model';

@Component({
  selector: 'app-aula',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <div class="bg-slate-100 min-h-screen pb-20">
      <!-- Top Course Bar -->
      <div class="bg-slate-900 text-white border-b border-slate-800 sticky top-20 z-30 shadow-md">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <!-- Title & meta badges -->
            <div>
              <div class="flex items-center gap-2 text-xs text-cyan-400 font-semibold mb-1">
                <span class="rounded-md bg-cyan-950 border border-cyan-800 px-2 py-0.5 uppercase tracking-wider">
                  Aula Virtual LMS
                </span>
                <span>•</span>
                <span>{{ state.currentCourse().level }}</span>
                <span>•</span>
                <span>{{ state.currentCourse().duration }}</span>
              </div>
              <h2 class="text-xl sm:text-2xl font-bold font-serif text-white tracking-tight line-clamp-1">
                {{ state.currentCourse().title }}
              </h2>
            </div>

            <!-- Right Controls: Progress & Tabs -->
            <div class="flex items-center gap-4">
              <!-- Course selector dropdown if multiple courses exist -->
              @if (state.courses().length > 1) {
                <div class="flex items-center gap-2">
                  <select
                    [value]="state.currentCourse().id"
                    (change)="onCourseSelect($event)"
                    class="rounded-xl border border-slate-700 bg-slate-800 text-xs text-slate-200 px-3 py-2 focus:ring-1 focus:ring-cyan-400 focus:outline-hidden"
                  >
                    @for (c of state.courses(); track c.id) {
                      <option [value]="c.id">{{ c.title }}</option>
                    }
                  </select>
                </div>
              }

              <!-- Progress Badge -->
              <div class="flex items-center gap-3 bg-slate-800/80 border border-slate-700/80 rounded-xl px-3.5 py-2">
                <div class="text-right">
                  <p class="text-[10px] uppercase font-bold text-slate-400">Progreso</p>
                  <p class="text-xs font-bold text-cyan-400">{{ state.courseProgressPercentage() }}%</p>
                </div>
                <div class="h-2 w-16 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    [style.width.%]="state.courseProgressPercentage()"
                    class="h-full bg-cyan-400 transition-all duration-300 rounded-full"
                  ></div>
                </div>
              </div>

              <!-- Button to open Project & Evaluation Modal -->
              <button
                type="button"
                (click)="activeTab.set(activeTab() === 'content' ? 'projects' : 'content')"
                class="inline-flex items-center gap-1.5 rounded-xl border border-cyan-400/40 bg-cyan-500/10 px-3.5 py-2 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 transition-colors cursor-pointer"
              >
                <mat-icon class="text-sm scale-90">{{ activeTab() === 'content' ? 'assignment' : 'menu_book' }}</mat-icon>
                <span>{{ activeTab() === 'content' ? 'Proyectos & Evaluación' : 'Volver a Lecciones' }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Layout -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        @if (activeTab() === 'projects') {
          <!-- VISTA DE PROYECTOS INTEGRADORES, EVALUACIÓN FINAL Y FUENTES -->
          <div class="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-lg animate-in fade-in duration-200 space-y-10">
            <!-- Header -->
            <div class="flex items-center justify-between pb-6 border-b border-slate-100">
              <div>
                <span class="text-xs font-bold uppercase tracking-wider text-cyan-700">Culminación del Programa</span>
                <h3 class="text-2xl sm:text-3xl font-bold text-slate-900 font-serif mt-1">
                  Evaluación Final y Proyectos Integradores
                </h3>
              </div>
              <button
                type="button"
                (click)="activeTab.set('content')"
                class="inline-flex items-center gap-1 rounded-xl bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <mat-icon class="text-xs scale-90">arrow_back</mat-icon>
                <span>Regresar a Unidades</span>
              </button>
            </div>

            <!-- Evaluación Final -->
            <div class="rounded-2xl bg-blue-50/70 border border-blue-200/80 p-6 sm:p-8">
              <div class="flex items-center gap-3 text-blue-900 font-bold text-lg mb-3">
                <mat-icon>military_tech</mat-icon>
                <h4>Evaluación Tangible Final</h4>
              </div>
              <p class="text-slate-700 text-sm sm:text-base leading-relaxed">
                {{ state.currentCourse().finalEvaluation }}
              </p>
              <div class="mt-4 pt-4 border-t border-blue-200/60 flex items-center gap-2 text-xs text-blue-800 font-medium">
                <mat-icon class="scale-75 text-cyan-700">folder_shared</mat-icon>
                <span>Modalidad: Entrega a través de Portafolio Digital Escolar con rúbrica por competencias.</span>
              </div>
            </div>

            <!-- Proyectos Integradores Propuestos -->
            <div>
              <h4 class="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <mat-icon class="text-cyan-600">rocket_launch</mat-icon>
                <span>Propuestas de Proyectos Integradores</span>
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                @for (project of state.currentCourse().projectProposals; track project; let pIdx = $index) {
                  <div class="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 shadow-2xs hover:border-cyan-400 hover:shadow-md transition-all">
                    <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-100 text-cyan-800 font-bold text-sm mb-4">
                      0{{ pIdx + 1 }}
                    </div>
                    <p class="text-sm font-semibold text-slate-800 leading-relaxed">
                      {{ project }}
                    </p>
                    <div class="mt-4 pt-3 border-t border-slate-200/70 flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                      <mat-icon class="text-cyan-600 text-xs scale-75">tablet</mat-icon>
                      <span>Trabajo en equipo con tablets</span>
                    </div>
                  </div>
                }
              </div>
            </div>

            <!-- Objetivos de Aprendizaje -->
            <div>
              <h4 class="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <mat-icon class="text-teal-600">track_changes</mat-icon>
                <span>Objetivos de Aprendizaje Alcanzados</span>
              </h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                @for (obj of state.currentCourse().learningObjectives; track obj) {
                  <div class="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
                    <mat-icon class="text-emerald-500 text-base mt-0.5 shrink-0">check_circle</mat-icon>
                    <p class="text-xs sm:text-sm text-slate-700">{{ obj }}</p>
                  </div>
                }
              </div>
            </div>

            <!-- Fuentes y Referencias Académicas -->
            <div class="pt-6 border-t border-slate-100">
              <h4 class="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                <mat-icon class="text-sm">menu_book</mat-icon>
                <span>Fuentes y Marco Académico de Referencia</span>
              </h4>
              <ul class="space-y-2">
                @for (source of state.currentCourse().sources; track source) {
                  <li class="text-xs text-slate-600 flex items-start gap-2">
                    <span class="text-cyan-600">•</span>
                    <span>{{ source }}</span>
                  </li>
                }
              </ul>
            </div>
          </div>
        } @else {
          <!-- VISTA PRINCIPAL DEL AULA: BARRA LATERAL + LECCIÓN -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <!-- Barra Lateral de Navegación por Unidades y Lecciones (LMS Sidebar) -->
            <div class="lg:col-span-4 space-y-4">
              <div class="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs sticky top-36">
                <div class="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                  <h3 class="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <mat-icon class="text-xs scale-90">format_list_bulleted</mat-icon>
                    <span>Estructura del Curso</span>
                  </h3>
                  <span class="text-[11px] font-semibold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded-md">
                    {{ state.currentCourse().units.length }} Unidades
                  </span>
                </div>

                <!-- Lista de Unidades -->
                <div class="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
                  @for (unit of state.currentCourse().units; track unit.id; let uIdx = $index) {
                    <div class="rounded-2xl border border-slate-200/80 overflow-hidden bg-slate-50/50">
                      <!-- Unit Title Header -->
                      <div class="px-4 py-3 bg-slate-100/80 border-b border-slate-200/60 flex items-center justify-between">
                        <span class="text-xs font-bold text-slate-800 line-clamp-1">
                          {{ unit.title }}
                        </span>
                        <span class="text-[10px] text-slate-500 font-semibold shrink-0">
                          U{{ uIdx + 1 }}
                        </span>
                      </div>

                      <!-- Lessons inside unit -->
                      <div class="p-2 space-y-1">
                        @for (lesson of unit.lessons; track lesson.id; let lIdx = $index) {
                          <button
                            type="button"
                            (click)="state.selectLesson(uIdx, lIdx)"
                            [class]="isCurrentLesson(uIdx, lIdx) ? activeLessonClass : inactiveLessonClass"
                          >
                            <div class="flex items-start gap-2.5 overflow-hidden">
                              <span class="mt-0.5 shrink-0">
                                @if (isLessonCompleted(uIdx, lIdx)) {
                                  <mat-icon class="text-emerald-500 text-sm scale-90">check_circle</mat-icon>
                                } @else {
                                  <mat-icon class="text-slate-400 text-sm scale-90">radio_button_unchecked</mat-icon>
                                }
                              </span>
                              <div class="text-left overflow-hidden">
                                <p class="text-xs font-semibold leading-tight line-clamp-2">
                                  {{ lesson.title }}
                                </p>
                                @if (lesson.duration) {
                                  <span class="text-[10px] opacity-75 mt-0.5 block">
                                    {{ lesson.duration }}
                                  </span>
                                }
                              </div>
                            </div>
                          </button>
                        }
                      </div>
                    </div>
                  }
                </div>

                <!-- Direct Action: Proyectos Integradores -->
                <div class="mt-4 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    (click)="activeTab.set('projects')"
                    class="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-100 hover:bg-cyan-50 hover:text-cyan-700 text-slate-700 text-xs font-bold py-2.5 transition-colors cursor-pointer"
                  >
                    <mat-icon class="text-xs scale-90">assessment</mat-icon>
                    <span>Ver Proyectos y Evaluación Final</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Contenido Principal de la Lección (Bloques Microlearning) -->
            <div class="lg:col-span-8 space-y-6">
              @if (state.currentLesson(); as currentLesson) {
                <!-- Cabecera de la Lección Activa con Fotografía Escolar Panorámica -->
                <div class="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 text-white shadow-lg">
                  <img
                    [src]="getUnitImage(state.selectedUnitIndex())"
                    alt="Escenario Pedagógico en Aula"
                    referrerpolicy="no-referrer"
                    class="w-full h-48 sm:h-56 object-cover object-center opacity-40 filter saturate-125"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-transparent"></div>
                  <div class="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
                    <div class="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wide mb-2">
                      <span class="rounded-md bg-cyan-950/80 border border-cyan-800 px-2 py-0.5">{{ state.currentUnit()?.title }}</span>
                      @if (currentLesson.duration) {
                        <span>•</span>
                        <span class="text-slate-300 font-medium">{{ currentLesson.duration }}</span>
                      }
                    </div>
                    <h3 class="text-2xl sm:text-3xl font-bold font-serif text-white leading-tight drop-shadow-sm">
                      {{ currentLesson.title }}
                    </h3>
                    @if (currentLesson.summary) {
                      <p class="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                        {{ currentLesson.summary }}
                      </p>
                    }
                  </div>
                </div>

                <!-- Bloques Microlearning con diseño altamente diferenciado -->
                <div class="space-y-6">
                  @for (block of currentLesson.blocks; track $index; let bIdx = $index) {
                    @switch (block.type) {
                      <!-- 1. BLOQUE IDEA CLAVE -->
                      @case ('idea') {
                        <div class="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50/70 via-white to-white p-6 sm:p-8 shadow-xs relative overflow-hidden">
                          <div class="flex items-center gap-3 mb-4">
                            <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-600/20">
                              <mat-icon class="scale-110">lightbulb</mat-icon>
                            </div>
                            <div>
                              <span class="text-[11px] font-bold uppercase tracking-wider text-indigo-700">Bloque Microlearning</span>
                              <h4 class="text-lg font-bold text-slate-900">{{ block.title || 'Idea Clave & Fundamento' }}</h4>
                            </div>
                          </div>
                          <div class="rounded-2xl bg-white/80 border border-indigo-100 p-5 text-slate-800 text-base sm:text-lg font-medium leading-relaxed font-serif">
                            "{{ block.content }}"
                          </div>
                        </div>
                      }

                      <!-- 2. BLOQUE EJEMPLO PRÁCTICO -->
                      @case ('example') {
                        <div class="rounded-3xl border-2 border-teal-200 bg-gradient-to-br from-teal-50/70 via-white to-white p-6 sm:p-8 shadow-xs">
                          <div class="flex items-center gap-3 mb-4">
                            <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-600 text-white shadow-md shadow-teal-600/20">
                              <mat-icon class="scale-110">tablet_mac</mat-icon>
                            </div>
                            <div>
                              <span class="text-[11px] font-bold uppercase tracking-wider text-teal-700">Escenario Real en el Aula</span>
                              <h4 class="text-lg font-bold text-slate-900">{{ block.title || 'Ejemplo Práctico en Aula' }}</h4>
                            </div>
                          </div>
                          <p class="text-sm sm:text-base text-slate-700 leading-relaxed bg-white/90 p-5 rounded-2xl border border-teal-100">
                            {{ block.content }}
                          </p>
                          <div class="mt-4 flex items-center gap-2 text-xs font-medium text-teal-800">
                            <mat-icon class="text-xs scale-75">devices</mat-icon>
                            <span>Integración: Uso directo de tablets para análisis y contraste dialéctico con IA.</span>
                          </div>
                        </div>
                      }

                      <!-- 3. BLOQUE ACTIVIDAD SUGERIDA -->
                      @case ('activity') {
                        <div class="rounded-3xl border-2 border-amber-200 bg-gradient-to-br from-amber-50/70 via-white to-white p-6 sm:p-8 shadow-xs">
                          <div class="flex items-center gap-3 mb-4">
                            <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold">
                              <mat-icon class="scale-110">assignment</mat-icon>
                            </div>
                            <div>
                              <span class="text-[11px] font-bold uppercase tracking-wider text-amber-800">Desafío para el Docente / Estudiantes</span>
                              <h4 class="text-lg font-bold text-slate-900">{{ block.title || 'Actividad Sugerida Paso a Paso' }}</h4>
                            </div>
                          </div>
                          <div class="bg-white/90 p-5 rounded-2xl border border-amber-200/80 text-sm sm:text-base text-slate-800 leading-relaxed">
                            {{ block.content }}
                          </div>
                          <div class="mt-4 flex items-center justify-between text-xs text-amber-900 font-semibold bg-amber-100/60 px-4 py-2.5 rounded-xl">
                            <span class="flex items-center gap-1.5">
                              <mat-icon class="text-xs scale-75">timer</mat-icon>
                              <span>Bajo el Enfoque 60/40: 60% tiempo de producción estudiantil</span>
                            </span>
                            <span class="hidden sm:inline-block">Evidencia para Portafolio Digital</span>
                          </div>
                        </div>
                      }

                      <!-- 4. BLOQUE PREGUNTA DE AUTOEVALUACIÓN INTERACTIVA -->
                      @case ('test') {
                        <div class="rounded-3xl border-2 border-violet-200 bg-gradient-to-br from-violet-50/70 via-white to-white p-6 sm:p-8 shadow-xs">
                          <div class="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-violet-100">
                            <div class="flex items-center gap-3">
                              <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-md shadow-violet-600/20">
                                <mat-icon class="scale-110">quiz</mat-icon>
                              </div>
                              <div>
                                <span class="text-[11px] font-bold uppercase tracking-wider text-violet-700">Evaluación Formativa Interactiva</span>
                                <h4 class="text-lg font-bold text-slate-900">{{ block.title || 'Pregunta de Autoevaluación' }}</h4>
                              </div>
                            </div>
                            @if (hasUserAnswered(bIdx)) {
                              <span class="rounded-full bg-violet-100 text-violet-800 px-3 py-1 text-xs font-bold">
                                Respondida
                              </span>
                            }
                          </div>

                          <!-- Pregunta -->
                          <p class="text-base sm:text-lg font-bold text-slate-900 mb-5 leading-snug">
                            {{ getQuestionText(block.content) }}
                          </p>

                          <!-- Opciones de Respuesta Interactivas -->
                          <div class="space-y-3">
                            @for (opt of getBlockOptions(block); track $index; let optIdx = $index) {
                              <button
                                type="button"
                                (click)="selectAnswer(bIdx, optIdx)"
                                [class]="getOptionStyleClass(bIdx, optIdx, block)"
                                class="w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer group"
                              >
                                <div
                                  [class]="getOptionBadgeClass(bIdx, optIdx, block)"
                                  class="h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                                >
                                  {{ getOptionLetter(optIdx) }}
                                </div>
                                <span class="text-sm font-medium leading-relaxed">
                                  {{ opt }}
                                </span>
                              </button>
                            }
                          </div>

                          <!-- Feedback Inmediato & Explicación Reflexiva -->
                          @if (hasUserAnswered(bIdx)) {
                            <div
                              [class]="isUserAnswerCorrect(bIdx, block) ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-amber-50 border-amber-300 text-amber-900'"
                              class="mt-6 rounded-2xl border p-5 animate-in fade-in duration-200"
                            >
                              <div class="flex items-center gap-2 font-bold text-sm mb-1.5">
                                @if (isUserAnswerCorrect(bIdx, block)) {
                                  <mat-icon class="text-emerald-600">check_circle</mat-icon>
                                  <span>¡Excelente respuesta correcta!</span>
                                } @else {
                                  <mat-icon class="text-amber-600">info</mat-icon>
                                  <span>Respuesta incorrecta. Reflexionemos:</span>
                                }
                              </div>
                              <p class="text-xs sm:text-sm leading-relaxed">
                                {{ block.explanation || 'El modelo pedagógico de AIK fomenta la apropiación crítica del tiempo y de las herramientas tecnológicas para garantizar un impacto significativo en el aula y en los aprendizajes.' }}
                              </p>
                            </div>
                          }
                        </div>
                      }
                    }
                  }
                </div>

                <!-- Controles de Navegación de la Lección -->
                <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                  <!-- Botón Marcar como completada -->
                  <button
                    type="button"
                    (click)="markCompleted()"
                    [class]="isCurrentCompleted() ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 border-slate-200'"
                    class="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-3 text-xs sm:text-sm font-bold transition-all cursor-pointer"
                  >
                    <mat-icon class="text-sm scale-90">{{ isCurrentCompleted() ? 'check_circle' : 'task_alt' }}</mat-icon>
                    <span>{{ isCurrentCompleted() ? 'Lección Completada' : 'Marcar como Completada' }}</span>
                  </button>

                  <div class="flex items-center gap-3 w-full sm:w-auto">
                    <!-- Anterior -->
                    <button
                      type="button"
                      [disabled]="!hasPreviousLesson()"
                      (click)="goToPreviousLesson()"
                      class="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-3 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                      <mat-icon class="scale-90">arrow_back</mat-icon>
                      <span>Anterior</span>
                    </button>

                    <!-- Siguiente -->
                    <button
                      type="button"
                      [disabled]="!hasNextLesson()"
                      (click)="goToNextLesson()"
                      class="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-700 px-5 py-3 text-xs sm:text-sm font-bold text-white hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-blue-700/20 transition-all cursor-pointer"
                    >
                      <span>Siguiente</span>
                      <mat-icon class="scale-90">arrow_forward</mat-icon>
                    </button>
                  </div>
                </div>
              }
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
export class Aula {
  readonly state = inject(CourseState);
  readonly activeTab = signal<'content' | 'projects'>('content');

  readonly activeLessonClass =
    'w-full block p-3 rounded-xl bg-cyan-50 border border-cyan-300/80 text-cyan-950 font-bold shadow-2xs transition-all';
  readonly inactiveLessonClass =
    'w-full block p-3 rounded-xl hover:bg-white text-slate-700 hover:text-slate-900 border border-transparent transition-all';

  onCourseSelect(e: Event): void {
    const select = e.target as HTMLSelectElement;
    const course = this.state.courses().find((c) => c.id === select.value);
    if (course) {
      this.state.selectCourse(course);
    }
  }

  isCurrentLesson(uIdx: number, lIdx: number): boolean {
    return (
      this.state.selectedUnitIndex() === uIdx &&
      this.state.selectedLessonIndex() === lIdx
    );
  }

  isLessonCompleted(uIdx: number, lIdx: number): boolean {
    const courseId = this.state.currentCourse().id;
    return !!this.state.completedLessons()[`${courseId}_${uIdx}_${lIdx}`];
  }

  isCurrentCompleted(): boolean {
    return this.isLessonCompleted(
      this.state.selectedUnitIndex(),
      this.state.selectedLessonIndex()
    );
  }

  markCompleted(): void {
    this.state.markLessonCompleted(
      this.state.selectedUnitIndex(),
      this.state.selectedLessonIndex()
    );
  }

  hasPreviousLesson(): boolean {
    const uIdx = this.state.selectedUnitIndex();
    const lIdx = this.state.selectedLessonIndex();
    return uIdx > 0 || lIdx > 0;
  }

  hasNextLesson(): boolean {
    const uIdx = this.state.selectedUnitIndex();
    const lIdx = this.state.selectedLessonIndex();
    const course = this.state.currentCourse();
    const currentUnit = course.units[uIdx];
    if (!currentUnit) return false;

    if (lIdx < currentUnit.lessons.length - 1) return true;
    return uIdx < course.units.length - 1;
  }

  goToPreviousLesson(): void {
    const uIdx = this.state.selectedUnitIndex();
    const lIdx = this.state.selectedLessonIndex();
    if (lIdx > 0) {
      this.state.selectLesson(uIdx, lIdx - 1);
    } else if (uIdx > 0) {
      const prevUnit = this.state.currentCourse().units[uIdx - 1];
      this.state.selectLesson(uIdx - 1, prevUnit.lessons.length - 1);
    }
  }

  goToNextLesson(): void {
    const uIdx = this.state.selectedUnitIndex();
    const lIdx = this.state.selectedLessonIndex();
    const course = this.state.currentCourse();
    const currentUnit = course.units[uIdx];

    if (lIdx < currentUnit.lessons.length - 1) {
      this.state.selectLesson(uIdx, lIdx + 1);
    } else if (uIdx < course.units.length - 1) {
      this.state.selectLesson(uIdx + 1, 0);
    }
  }

  // Test block parsing and interactivity
  getQuestionText(content: string): string {
    // If the content has options embedded like "? A) ...", extract the question part
    const optMatch = content.indexOf(' A)');
    if (optMatch !== -1) {
      return content.substring(0, optMatch).trim();
    }
    return content;
  }

  getBlockOptions(block: LessonBlock): string[] {
    if (block.options && block.options.length > 0) {
      return block.options;
    }

    // Try parsing from content if embedded as A) ... B) ... C) ...
    const raw = block.content;
    const aIdx = raw.indexOf('A)');
    const bIdx = raw.indexOf('B)');
    const cIdx = raw.indexOf('C)');

    if (aIdx !== -1 && bIdx !== -1) {
      const optA = raw.substring(aIdx, bIdx).trim();
      const optB = cIdx !== -1 ? raw.substring(bIdx, cIdx).trim() : raw.substring(bIdx).trim();
      const optC = cIdx !== -1 ? raw.substring(cIdx).trim() : '';
      const list = [optA, optB];
      if (optC) list.push(optC);
      return list;
    }

    return [
      'A) 80% cátedra expositiva del docente.',
      'B) 40% guiado docente y 60% producción activa estudiantil.',
      'C) 100% navegación autónoma sin intervención docente.'
    ];
  }

  getOptionLetter(idx: number): string {
    return ['A', 'B', 'C', 'D'][idx] || `${idx + 1}`;
  }

  selectAnswer(blockIdx: number, answerIndex: number): void {
    const uIdx = this.state.selectedUnitIndex();
    const lIdx = this.state.selectedLessonIndex();
    this.state.submitQuizAnswer(uIdx, lIdx, blockIdx, answerIndex);
  }

  hasUserAnswered(blockIdx: number): boolean {
    const uIdx = this.state.selectedUnitIndex();
    const lIdx = this.state.selectedLessonIndex();
    return this.state.getQuizAnswer(uIdx, lIdx, blockIdx) !== undefined;
  }

  isUserAnswerCorrect(blockIdx: number, block: LessonBlock): boolean {
    const uIdx = this.state.selectedUnitIndex();
    const lIdx = this.state.selectedLessonIndex();
    const selected = this.state.getQuizAnswer(uIdx, lIdx, blockIdx);
    const correct = block.correctAnswer ?? 1; // Default index 1 (B)
    return selected === correct;
  }

  getOptionStyleClass(blockIdx: number, optIdx: number, block: LessonBlock): string {
    const uIdx = this.state.selectedUnitIndex();
    const lIdx = this.state.selectedLessonIndex();
    const selected = this.state.getQuizAnswer(uIdx, lIdx, blockIdx);

    if (selected === undefined) {
      return 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 hover:border-violet-300';
    }

    const correct = block.correctAnswer ?? 1;

    if (optIdx === correct) {
      return 'bg-emerald-50/90 border-emerald-400 text-emerald-950 font-semibold ring-2 ring-emerald-500/20';
    }

    if (selected === optIdx && optIdx !== correct) {
      return 'bg-rose-50 border-rose-300 text-rose-900 line-through opacity-85';
    }

    return 'bg-white border-slate-200 text-slate-500 opacity-60';
  }

  getOptionBadgeClass(blockIdx: number, optIdx: number, block: LessonBlock): string {
    const uIdx = this.state.selectedUnitIndex();
    const lIdx = this.state.selectedLessonIndex();
    const selected = this.state.getQuizAnswer(uIdx, lIdx, blockIdx);

    if (selected === undefined) {
      return 'bg-slate-100 text-slate-700 group-hover:bg-violet-100 group-hover:text-violet-800';
    }

    const correct = block.correctAnswer ?? 1;

    if (optIdx === correct) {
      return 'bg-emerald-600 text-white';
    }

    if (selected === optIdx) {
      return 'bg-rose-500 text-white';
    }

    return 'bg-slate-100 text-slate-400';
  }

  getUnitImage(uIdx: number): string {
    const images = [
      '/aula_tablets_venezuela.jpg',
      '/taller_docente_pantalla.jpg',
      '/laboratorio_liceo_pantalla.jpg',
      '/estudiantes_pantalla_interactiva.jpg'
    ];
    return images[uIdx % images.length];
  }
}
