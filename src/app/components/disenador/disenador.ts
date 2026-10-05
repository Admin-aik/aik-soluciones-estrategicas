import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CourseState } from '../../services/course-state';
import { CourseGenerationRequest } from '../../models/course.model';

@Component({
  selector: 'app-disenador',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatIconModule],
  template: `
    <section class="py-12 lg:py-20 bg-slate-50 min-h-[85vh]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center max-w-3xl mx-auto mb-12">
          <div class="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-1 text-xs font-semibold text-teal-800 shadow-xs mb-4">
            <mat-icon class="scale-75">smart_toy</mat-icon>
            <span>Generador Curricular Asistido por Google Gemini</span>
          </div>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-serif tracking-tight">
            Diseñador de Cursos y Secuencias Didácticas
          </h2>
          <p class="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Estructura unidades didácticas personalizadas para tu asignatura y nivel educativo bajo la metodología 60/40 de AIK Soluciones Estratégicas.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <!-- Columna Izquierda: Formulario de Configuración Curricular -->
          <div class="lg:col-span-8 rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-lg">
            <div class="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
              <div class="flex items-center gap-3">
                <div class="h-10 w-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <mat-icon>edit_note</mat-icon>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-slate-900">Parámetros Pedagógicos de la Unidad</h3>
                  <p class="text-xs text-slate-500">Configura las variables de tu secuencia de aprendizaje</p>
                </div>
              </div>

              <!-- Botón Cargar Ejemplos Rápidos -->
              <div class="hidden sm:flex items-center gap-2">
                <button
                  type="button"
                  (click)="loadPreset('ciencias')"
                  class="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                >
                  Ciencias
                </button>
                <button
                  type="button"
                  (click)="loadPreset('historia')"
                  class="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                >
                  Historia
                </button>
                <button
                  type="button"
                  (click)="loadPreset('lengua')"
                  class="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                >
                  Lenguaje & IA
                </button>
              </div>
            </div>

            <form [formGroup]="form" (ngSubmit)="generate()" class="space-y-6">
              <!-- Asignatura o Tema -->
              <div>
                <label for="subject-input" class="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  Tema o Asignatura a Desarrollar *
                </label>
                <input
                  id="subject-input"
                  type="text"
                  formControlName="subject"
                  placeholder="Ej. Biodiversidad y Genética / Argumentación y Sesgos en Redes Sociales / Energías Renovables y Sostenibilidad"
                  class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-2xs placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-hidden"
                />
                @if (form.get('subject')?.touched && form.get('subject')?.invalid) {
                  <p class="mt-1 text-xs text-rose-600">Por favor, especifica el tema o área curricular.</p>
                }
              </div>

              <!-- Grid: Nivel y Tiempo Disponible -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <!-- Nivel Educativo -->
                <div>
                  <label for="grade-select" class="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                    Nivel Educativo *
                  </label>
                  <select
                    id="grade-select"
                    formControlName="gradeLevel"
                    class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-2xs focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-hidden"
                  >
                    <option value="1.º Año (Exploración & Creación)">1.º Año (Exploración & Creación)</option>
                    <option value="2.º Año (Fundamentos Pedagógicos)">2.º Año (Fundamentos Pedagógicos)</option>
                    <option value="3.º Año (Profundización & Ciencias)">3.º Año (Profundización & Ciencias)</option>
                    <option value="4.º Año (Especialización & Análisis)">4.º Año (Especialización & Análisis)</option>
                    <option value="5.º Año (Preuniversitario & Egresados)">5.º Año (Preuniversitario & Egresados)</option>
                  </select>
                </div>

                <!-- Tiempo Disponible -->
                <div>
                  <label for="hours-input" class="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                    Tiempo y Duración Disponible *
                  </label>
                  <input
                    id="hours-input"
                    type="text"
                    formControlName="availableHours"
                    placeholder="Ej. 16 horas en 4 semanas / Módulo intensivo de 3 sesiones"
                    class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-2xs placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-hidden"
                  />
                </div>
              </div>

              <!-- Perfiles Docente y Estudiante -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label for="teacher-profile" class="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                    Perfil del Docente
                  </label>
                  <input
                    id="teacher-profile"
                    type="text"
                    formControlName="teacherProfile"
                    placeholder="Ej. Docente con experiencia pero que recién integra tablets"
                    class="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs text-slate-900 shadow-2xs placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label for="student-profile" class="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                    Perfil de los Estudiantes
                  </label>
                  <input
                    id="student-profile"
                    type="text"
                    formControlName="studentProfile"
                    placeholder="Ej. Estudiantes nativos digitales pero con tendencia al copy-paste"
                    class="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs text-slate-900 shadow-2xs placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-hidden"
                  />
                </div>
              </div>

              <!-- Objetivo Pedagógico -->
              <div>
                <label for="goal-input" class="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  Objetivo Pedagógico Central *
                </label>
                <textarea
                  id="goal-input"
                  rows="3"
                  formControlName="pedagogicalGoal"
                  placeholder="Ej. Que los estudiantes aprendan a formular preguntas desafiantes a la IA, contrasten hipótesis con simuladores en tablet y evalúen mediante un portafolio de evidencias."
                  class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-2xs placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-hidden resize-none"
                ></textarea>
                @if (form.get('pedagogicalGoal')?.touched && form.get('pedagogicalGoal')?.invalid) {
                  <p class="mt-1 text-xs text-rose-600">Por favor, define el objetivo pedagógico formativo.</p>
                }
              </div>

              <!-- Botón de Generación -->
              <div class="pt-4">
                <button
                  type="submit"
                  [disabled]="form.invalid || state.isGenerating()"
                  class="w-full inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-blue-600/25 hover:from-blue-600 hover:to-cyan-500 hover:shadow-blue-600/35 active:scale-98 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  @if (state.isGenerating()) {
                    <mat-icon class="animate-spin">sync</mat-icon>
                    <span>Diseñando curso con Gemini 3.8 Flash...</span>
                  } @else {
                    <mat-icon>auto_awesome</mat-icon>
                    <span>Generar Curso Estructurado con IA</span>
                  }
                </button>
              </div>

              <!-- Error feedback if any -->
              @if (state.generationError()) {
                <div class="rounded-xl bg-rose-50 border border-rose-200 p-4 text-xs text-rose-700 flex items-center gap-2">
                  <mat-icon class="text-sm">error</mat-icon>
                  <span>{{ state.generationError() }}</span>
                </div>
              }
            </form>
          </div>

          <!-- Columna Derecha: Catálogo de Cursos Guardados & Consejos -->
          <div class="lg:col-span-4 space-y-6">
            <!-- Cursos Disponibles -->
            <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
              <div class="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <h4 class="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <mat-icon class="text-blue-600 text-sm">collections_bookmark</mat-icon>
                  <span>Cursos en Plataforma ({{ state.courses().length }})</span>
                </h4>
                <span class="text-[11px] text-slate-400">Selecciona para ver</span>
              </div>

              <div class="space-y-3">
                @for (c of state.courses(); track c.id) {
                  <button
                    type="button"
                    (click)="state.selectCourse(c)"
                    [class]="state.currentCourse().id === c.id ? 'border-cyan-500 bg-cyan-50/50 ring-1 ring-cyan-500/20' : 'border-slate-200 hover:border-blue-300 bg-slate-50/50'"
                    class="w-full text-left rounded-2xl border p-3.5 transition-all cursor-pointer group"
                  >
                    <div class="flex items-start justify-between gap-2">
                      <h5 class="text-xs font-bold text-slate-900 group-hover:text-blue-700 line-clamp-2">
                        {{ c.title }}
                      </h5>
                      @if (c.isAiGenerated) {
                        <span class="shrink-0 text-[10px] font-bold rounded-md bg-teal-100 text-teal-800 px-1.5 py-0.5">
                          IA
                        </span>
                      } @else {
                        <span class="shrink-0 text-[10px] font-bold rounded-md bg-blue-100 text-blue-800 px-1.5 py-0.5">
                          Oficial
                        </span>
                      }
                    </div>
                    <div class="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                      <span>{{ c.level }}</span>
                      <span class="font-medium text-cyan-700 group-hover:underline flex items-center gap-0.5">
                        <span>Abrir</span>
                        <mat-icon class="text-xs scale-75">chevron_right</mat-icon>
                      </span>
                    </div>
                  </button>
                }
              </div>

              <div class="mt-4 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  (click)="state.setView('aula')"
                  class="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 text-white text-xs font-bold py-2.5 hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <mat-icon class="text-xs scale-90">local_library</mat-icon>
                  <span>Ir al Aula Virtual Actual</span>
                </button>
              </div>
            </div>

            <!-- Card Informativa del Esquema AIK -->
            <div class="rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-900 to-slate-950 text-white p-6 shadow-md">
              <div class="flex items-center gap-2 text-cyan-300 text-xs font-bold uppercase mb-2">
                <mat-icon class="scale-75">auto_stories</mat-icon>
                <span>Arquitectura Microlearning AIK</span>
              </div>
              <h4 class="text-base font-bold text-white mb-2">Cada unidad generada incluye:</h4>
              <ul class="space-y-2 text-xs text-slate-300">
                <li class="flex items-center gap-2">
                  <span class="h-2 w-2 rounded-full bg-cyan-400"></span>
                  <span><strong>Idea Clave:</strong> Fundamento sintético</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="h-2 w-2 rounded-full bg-emerald-400"></span>
                  <span><strong>Ejemplo Práctico:</strong> Caso real con tablets</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="h-2 w-2 rounded-full bg-amber-400"></span>
                  <span><strong>Actividad Sugerida:</strong> Desafío paso a paso</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="h-2 w-2 rounded-full bg-violet-400"></span>
                  <span><strong>Autoevaluación:</strong> Quiz formativo con feedback</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class Disenador {
  readonly state = inject(CourseState);

  readonly form = new FormGroup({
    subject: new FormControl('Biodiversidad, Genética y Simuladores Virtuales', [Validators.required]),
    gradeLevel: new FormControl('3.º Año (Profundización & Ciencias)', [Validators.required]),
    teacherProfile: new FormControl('Docente de Ciencias Naturales en proceso de actualización metodológica'),
    studentProfile: new FormControl('Estudiantes que requieren mayor rigor en el contraste de fuentes y datos'),
    pedagogicalGoal: new FormControl(
      'Integrar simuladores de genética con asistencia de IA para que los estudiantes elaboren hipótesis contrastadas bajo el modelo 60/40 y las documenten en su portafolio digital.',
      [Validators.required]
    ),
    availableHours: new FormControl('16 horas distribuidas en 3 semanas', [Validators.required]),
  });

  loadPreset(preset: 'ciencias' | 'historia' | 'lengua'): void {
    if (preset === 'ciencias') {
      this.form.patchValue({
        subject: 'Energías Renovables y Simulaciones Científicas',
        gradeLevel: '3.º Año (Profundización & Ciencias)',
        teacherProfile: 'Docente de Ciencias Naturales',
        studentProfile: 'Estudiantes de ciencias interesados en simulaciones interactivas',
        pedagogicalGoal: 'Utilizar software interactivo para proyectar modelos y contrastar los resultados de IA frente a fuentes científicas verificadas.',
        availableHours: '12 horas en 3 semanas',
      });
    } else if (preset === 'historia') {
      this.form.patchValue({
        subject: 'Historia Contemporánea y Ciudadanía Ética frente a la Desinformación',
        gradeLevel: '4.º Año (Especialización & Análisis)',
        teacherProfile: 'Profesor de Ciencias Sociales y Filosofía',
        studentProfile: 'Estudiantes con necesidad de desarrollar curaduría crítica en fuentes digitales',
        pedagogicalGoal: 'Analizar cómo distintos modelos de IA interpretan un conflicto histórico y redactar un informe reflexivo.',
        availableHours: '20 horas en 4 semanas',
      });
    } else if (preset === 'lengua') {
      this.form.patchValue({
        subject: 'Ingeniería de Prompts y Ensayo Argumentativo en Lengua y Literatura',
        gradeLevel: '5.º Año (Preuniversitario & Egresados)',
        teacherProfile: 'Docente de Castellano y Literatura',
        studentProfile: 'Egresados próximos a ingresar a la universidad',
        pedagogicalGoal: 'Superar el plagio mediante la co-escritura transparente con IA, registrando cada prompt y su justificación analítica en el portafolio.',
        availableHours: '15 horas en 3 semanas',
      });
    }
  }

  generate(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: CourseGenerationRequest = {
      subject: this.form.value.subject || '',
      gradeLevel: this.form.value.gradeLevel || '',
      teacherProfile: this.form.value.teacherProfile || '',
      studentProfile: this.form.value.studentProfile || '',
      pedagogicalGoal: this.form.value.pedagogicalGoal || '',
      availableHours: this.form.value.availableHours || '',
    };

    this.state.generateCourseWithAi(payload).subscribe();
  }
}
