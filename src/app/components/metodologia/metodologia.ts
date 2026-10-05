import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CourseState } from '../../services/course-state';

interface ProgressionLevel {
  id: string;
  badge: string;
  title: string;
  focus: string;
  stage: string;
  description: string;
  competencies: string[];
  tabletUsage: string;
  aiApplication: string;
  classroomExample: string;
}

@Component({
  selector: 'app-metodologia',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <section class="py-12 lg:py-20 bg-slate-50 border-t border-slate-200/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center max-w-3xl mx-auto mb-16">
          <div class="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-xs font-semibold text-blue-700 shadow-xs mb-4">
            <mat-icon class="scale-75">model_training</mat-icon>
            <span>Marco Pedagógico AIK</span>
          </div>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-serif tracking-tight">
            Metodología Activa y Convergencia Digital
          </h2>
          <p class="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Una arquitectura educativa estructurada para educar mentes analíticas en un ecosistema donde las tablets potencian la producción y la IA cataliza la investigación reflexiva.
          </p>
        </div>

        <!-- 1. Los 6 Cimientos Pedagógicos -->
        <div class="mb-20">
          <div class="flex items-center justify-between mb-8 pb-3 border-b border-slate-200">
            <div>
              <h3 class="text-xl font-bold text-slate-900">Los 6 Cimientos Pedagógicos</h3>
              <p class="text-sm text-slate-500">Fundamentos transversales de progresión formativa</p>
            </div>
            <span class="hidden sm:inline-block text-xs font-semibold uppercase tracking-wider text-cyan-700 bg-cyan-50 px-3 py-1.5 rounded-full border border-cyan-200">
              Marco 2026
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (pillar of pillars; track pillar.title) {
              <div class="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs hover:shadow-md hover:border-blue-300 transition-all">
                <div class="flex items-center gap-3.5 mb-4">
                  <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700 border border-blue-100">
                    <mat-icon>{{ pillar.icon }}</mat-icon>
                  </div>
                  <div>
                    <h4 class="text-base font-bold text-slate-900 leading-tight">{{ pillar.title }}</h4>
                    <p class="text-xs text-cyan-700 font-medium">{{ pillar.category }}</p>
                  </div>
                </div>
                <p class="text-sm text-slate-600 leading-relaxed">
                  {{ pillar.description }}
                </p>
                <div class="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-500">
                  <mat-icon class="text-blue-600 text-xs scale-75">check_circle</mat-icon>
                  <span>{{ pillar.impact }}</span>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- 2. Detalle del Modelo 60/40 con Simulador Interactivo de Tiempo de Clase -->
        <div class="mb-20 rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-900 via-slate-900 to-slate-950 text-white p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div class="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl"></div>
          
          <div class="relative z-10">
            <div class="max-w-3xl mb-8">
              <span class="inline-flex items-center gap-1.5 rounded-full bg-cyan-400/20 border border-cyan-400/30 px-3.5 py-1 text-xs font-semibold text-cyan-300 mb-3">
                <mat-icon class="scale-75">hourglass_empty</mat-icon>
                <span>Distribución Temporal de Alta Eficacia</span>
              </span>
              <h3 class="text-2xl sm:text-3xl font-extrabold font-serif text-white tracking-tight">
                El Modelo 60/40 en Acción
              </h3>
              <p class="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                Superamos la clase magistral donde el docente habla el 85% del tiempo. El modelo 60/40 divide estratégicamente cada sesión pedagógica para garantizar protagonismo activo de los estudiantes.
              </p>
            </div>

            <!-- Visual Breakdown Cards with Photographs -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <!-- 40% Docente -->
              <div class="rounded-2xl border border-blue-400/20 bg-white/5 p-6 backdrop-blur-xs flex flex-col justify-between">
                <div>
                  <div class="relative h-44 rounded-xl overflow-hidden mb-4 border border-white/10">
                    <img
                      src="/taller_docente_pantalla.jpg"
                      alt="Docente Guiando y Modelando"
                      referrerpolicy="no-referrer"
                      class="w-full h-full object-cover object-center"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                    <span class="absolute bottom-2 left-2 rounded-md bg-amber-500/90 text-slate-950 text-[10px] font-extrabold uppercase px-2 py-0.5">
                      Fase Docente: 40%
                    </span>
                  </div>

                  <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center gap-2">
                      <span class="h-3 w-3 rounded-full bg-amber-400"></span>
                      <h4 class="text-lg font-bold text-white">40% Entrega y Guiado Docente</h4>
                    </div>
                    <span class="text-2xl font-black text-amber-400">{{ teacherMinutes() }} min</span>
                  </div>
                  <p class="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    El docente actúa como arquitecto cognitivo: plantea preguntas socráticas, modela el uso riguroso de prompts, introduce el desafío y retroalimenta en tiempo real.
                  </p>
                </div>
                <ul class="space-y-2 text-xs text-slate-300 border-t border-white/10 pt-3">
                  <li class="flex items-start gap-2">
                    <mat-icon class="text-amber-400 text-xs scale-75 mt-0.5">arrow_right</mat-icon>
                    <span>Provocación inicial y conexión con saberes previos (10%)</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <mat-icon class="text-amber-400 text-xs scale-75 mt-0.5">arrow_right</mat-icon>
                    <span>Modelado del prompt y criterios de contrastación (15%)</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <mat-icon class="text-amber-400 text-xs scale-75 mt-0.5">arrow_right</mat-icon>
                    <span>Consigna del desafío y tutoría personalizada en mesas (15%)</span>
                  </li>
                </ul>
              </div>

              <!-- 60% Estudiantes -->
              <div class="rounded-2xl border border-cyan-400/30 bg-cyan-950/30 p-6 backdrop-blur-xs flex flex-col justify-between">
                <div>
                  <div class="relative h-44 rounded-xl overflow-hidden mb-4 border border-white/10">
                    <img
                      src="/aula_tablets_venezuela.jpg"
                      alt="Estudiantes Produciendo con Tablets"
                      referrerpolicy="no-referrer"
                      class="w-full h-full object-cover object-center"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                    <span class="absolute bottom-2 left-2 rounded-md bg-cyan-400/90 text-slate-950 text-[10px] font-extrabold uppercase px-2 py-0.5">
                      Fase Estudiantil: 60%
                    </span>
                  </div>

                  <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center gap-2">
                      <span class="h-3 w-3 rounded-full bg-cyan-400"></span>
                      <h4 class="text-lg font-bold text-white">60% Producción y Creación Estudiantil</h4>
                    </div>
                    <span class="text-2xl font-black text-cyan-400">{{ studentMinutes() }} min</span>
                  </div>
                  <p class="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    Los estudiantes toman protagonismo: investigan, interactúan con simuladores, co-crean con IA, debaten alternativas y compilan evidencias para su portafolio.
                  </p>
                </div>
                <ul class="space-y-2 text-xs text-slate-300 border-t border-white/10 pt-3">
                  <li class="flex items-start gap-2">
                    <mat-icon class="text-cyan-400 text-xs scale-75 mt-0.5">arrow_right</mat-icon>
                    <span>Laboratorio de indagación y contraste en equipos (30%)</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <mat-icon class="text-cyan-400 text-xs scale-75 mt-0.5">arrow_right</mat-icon>
                    <span>Prototipado, redacción o resolución de problemas (20%)</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <mat-icon class="text-cyan-400 text-xs scale-75 mt-0.5">arrow_right</mat-icon>
                    <span>Autoevaluación formativa y registro en portafolio (10%)</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Simulador de Tiempo de Clase -->
            <div class="rounded-2xl bg-white/10 border border-white/15 p-6">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <h5 class="text-base font-bold text-white flex items-center gap-2">
                    <mat-icon class="text-cyan-400">calculate</mat-icon>
                    Simulador Interactivo de Sesión Pedagógica
                  </h5>
                  <p class="text-xs text-slate-300">Elige la duración de tu bloque de clase para calcular tu distribución 60/40 exacta</p>
                </div>
                <!-- Quick Preset Buttons -->
                <div class="flex items-center gap-2">
                  <button
                    type="button"
                    (click)="selectedTotalMinutes.set(45)"
                    [class]="selectedTotalMinutes() === 45 ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-white/10 text-white hover:bg-white/20'"
                    class="px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer"
                  >
                    45 min
                  </button>
                  <button
                    type="button"
                    (click)="selectedTotalMinutes.set(60)"
                    [class]="selectedTotalMinutes() === 60 ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-white/10 text-white hover:bg-white/20'"
                    class="px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer"
                  >
                    60 min
                  </button>
                  <button
                    type="button"
                    (click)="selectedTotalMinutes.set(90)"
                    [class]="selectedTotalMinutes() === 90 ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-white/10 text-white hover:bg-white/20'"
                    class="px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer"
                  >
                    90 min
                  </button>
                </div>
              </div>

              <!-- Bar visual comparison -->
              <div class="space-y-2">
                <div class="h-6 w-full rounded-full bg-slate-800 p-1 flex overflow-hidden">
                  <div
                    [style.width.%]="40"
                    class="h-full bg-amber-400 rounded-l-full transition-all duration-300 flex items-center justify-center text-[10px] font-bold text-slate-900"
                  >
                    40% Docente ({{ teacherMinutes() }}m)
                  </div>
                  <div
                    [style.width.%]="60"
                    class="h-full bg-cyan-400 rounded-r-full transition-all duration-300 flex items-center justify-center text-[10px] font-bold text-slate-900"
                  >
                    60% Estudiantes Activos ({{ studentMinutes() }}m)
                  </div>
                </div>
                <div class="flex justify-between text-[11px] text-slate-400">
                  <span>Inicio de sesión (0 min)</span>
                  <span class="text-cyan-300 font-semibold">Total sesión: {{ selectedTotalMinutes() }} minutos</span>
                  <span>Cierre de sesión</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. Progresión Curricular Interactiva por Niveles -->
        <div>
          <div class="text-center max-w-2xl mx-auto mb-10">
            <h3 class="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">
              Progresión Curricular por Niveles
            </h3>
            <p class="mt-2 text-sm text-slate-600">
              Un itinerario de maduración digital y cognitiva ajustado al desarrollo de competencias y pensamiento crítico.
            </p>
          </div>

          <!-- Selector de Niveles (Tabs) -->
          <div class="flex flex-wrap items-center justify-center gap-3 mb-8">
            @for (level of progressionLevels; track level.id) {
              <button
                type="button"
                (click)="activeLevelId.set(level.id)"
                [class]="activeLevelId() === level.id ? activeTabClass : inactiveTabClass"
              >
                <span>{{ level.badge }}</span>
                <span class="font-normal opacity-80">({{ level.focus }})</span>
              </button>
            }
          </div>

          <!-- Detalle del Nivel Activo -->
          @if (activeLevel(); as lvl) {
            <div class="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-lg animate-in fade-in duration-200">
              <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                <div>
                  <div class="flex items-center gap-3 mb-2">
                    <span class="rounded-lg bg-blue-100 text-blue-800 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                      {{ lvl.badge }}
                    </span>
                    <span class="text-xs font-semibold text-slate-500">
                      {{ lvl.stage }}
                    </span>
                  </div>
                  <h4 class="text-2xl font-bold text-slate-900 font-serif">
                    {{ lvl.title }}
                  </h4>
                  <p class="mt-2 text-sm text-slate-600 max-w-3xl">
                    {{ lvl.description }}
                  </p>
                </div>

                <div class="shrink-0 flex items-center gap-3">
                  <button
                    type="button"
                    (click)="goToDisenador()"
                    class="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-blue-600 transition-all cursor-pointer"
                  >
                    <mat-icon class="scale-90">auto_fix_high</mat-icon>
                    <span>Diseñar para este nivel</span>
                  </button>
                </div>
              </div>

              <!-- Columnas de Detalle -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <!-- Columna 1: Competencias Clave -->
                <div class="rounded-2xl bg-slate-50 p-6 border border-slate-200/70">
                  <div class="flex items-center gap-2.5 text-blue-700 font-bold text-sm mb-4">
                    <mat-icon>stars</mat-icon>
                    <span>Competencias a Desarrollar</span>
                  </div>
                  <ul class="space-y-3">
                    @for (comp of lvl.competencies; track comp) {
                      <li class="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                        <mat-icon class="text-cyan-600 text-xs scale-75 mt-0.5 shrink-0">check</mat-icon>
                        <span>{{ comp }}</span>
                      </li>
                    }
                  </ul>
                </div>

                <!-- Columna 2: Uso Pedagógico de Tablets & IA -->
                <div class="rounded-2xl bg-slate-50 p-6 border border-slate-200/70">
                  <div class="flex items-center gap-2.5 text-teal-700 font-bold text-sm mb-4">
                    <mat-icon>tablet_mac</mat-icon>
                    <span>Tablets & Asistencia de IA</span>
                  </div>
                  <div class="space-y-4 text-xs sm:text-sm">
                    <div>
                      <p class="font-bold text-slate-800 text-xs uppercase tracking-wide">Uso en Tablet</p>
                      <p class="text-slate-600 mt-1">{{ lvl.tabletUsage }}</p>
                    </div>
                    <div>
                      <p class="font-bold text-slate-800 text-xs uppercase tracking-wide">Rol de la IA</p>
                      <p class="text-slate-600 mt-1">{{ lvl.aiApplication }}</p>
                    </div>
                  </div>
                </div>

                <!-- Columna 3: Ejemplo de Secuencia de Aula -->
                <div class="rounded-2xl bg-blue-50/60 p-6 border border-blue-200/60">
                  <div class="flex items-center gap-2.5 text-blue-900 font-bold text-sm mb-4">
                    <mat-icon>lightbulb</mat-icon>
                    <span>Ejemplo Concreto de Aula</span>
                  </div>
                  <p class="text-xs sm:text-sm text-slate-700 leading-relaxed italic bg-white p-4 rounded-xl border border-blue-100 shadow-2xs">
                    "{{ lvl.classroomExample }}"
                  </p>
                  <p class="mt-4 text-[11px] text-blue-700 font-medium">
                    Evidencia para Portafolio: Informe interactivo o artefacto digital con co-evaluación docente.
                  </p>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class Metodologia {
  readonly state = inject(CourseState);

  // Simulador de tiempo
  readonly selectedTotalMinutes = signal<number>(60);
  readonly teacherMinutes = computed(() => Math.round(this.selectedTotalMinutes() * 0.4));
  readonly studentMinutes = computed(() => Math.round(this.selectedTotalMinutes() * 0.6));

  // Tab activo de nivel
  readonly activeLevelId = signal<string>('exploracion');

  readonly activeTabClass =
    'inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-blue-700 shadow-md shadow-blue-500/20 cursor-pointer transition-all';
  readonly inactiveTabClass =
    'inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-100 cursor-pointer transition-all';

  readonly pillars = [
    {
      icon: 'psychology_alt',
      title: 'Pensamiento Crítico',
      category: 'Epistemología Digital',
      description: 'Capacidad de examinar fuentes, detectar sesgos ideológicos o algoritmos alucinados, y validar afirmaciones mediante el método científico.',
      impact: 'Estudiantes autónomos que no aceptan respuestas sin contrastar.',
    },
    {
      icon: 'terminal',
      title: 'Ingeniería de Prompts',
      category: 'Fluidez Dialéctica',
      description: 'Enseñar a interrogar sistemas de IA mediante roles, delimitación de contexto, variables y consignas con restricciones cognitivas rigurosas.',
      impact: 'Formulación profunda de preguntas en lugar de consultas banales.',
    },
    {
      icon: 'account_tree',
      title: 'Pensamiento Computacional',
      category: 'Resolución de Problemas',
      description: 'Descomposición analítica de problemas complejos, reconocimiento de patrones repetitivos, abstracción lógica y diseño de secuencias algorítmicas.',
      impact: 'Estructuración metódica de soluciones en cualquier disciplina.',
    },
    {
      icon: 'verified_user',
      title: 'Ciudadanía Digital Ética',
      category: 'Valores & Convivencia',
      description: 'Compromiso con la privacidad, huella digital responsable, atribución transparente de co-creación con IA y prevención del ciberacoso escolar.',
      impact: 'Uso ético y honesto de la tecnología en comunidad.',
    },
    {
      icon: 'folder_special',
      title: 'Evaluación por Portafolio Digital',
      category: 'Evidencias Tangibles',
      description: 'Sustitución de pruebas memorísticas por colecciones dinámicas de evidencias: audios, vídeos analíticos, simuladores y reflexiones metacognitivas.',
      impact: 'Visualización del crecimiento y aprendizaje derivado del error.',
    },
    {
      icon: 'groups',
      title: 'Trabajo Colaborativo',
      category: 'Inteligencia Colectiva',
      description: 'Dinámicas en equipos de 2 a 4 estudiantes donde cada integrante asume roles (investigador, prompt engineer, sintetizador y evaluador de calidad).',
      impact: 'Habilidades socioemocionales e interpersonales del futuro.',
    },
  ];

  readonly progressionLevels: ProgressionLevel[] = [
    {
      id: 'exploracion',
      badge: '1.º y 2.º Año',
      title: 'Fase de Exploración: De Consumidores a Creadores',
      focus: 'Exploración & Fundamentos',
      stage: 'Ciclo Inicial Formativo',
      description: 'En esta etapa inicial los estudiantes transicionan de ser consumidores pasivos de pantallas lúdicas a constructores activos. Aprenden la anatomía de una tablet escolar, navegación segura y primeros pasos con asistentes conversacionales guiados.',
      competencies: [
        'Transición de consumo lúdico a producción académica estructurada',
        'Búsqueda asistida por IA con palabras clave y operadores booleanos',
        'Iniciación al pensamiento algorítmico y bloques de programación visual',
        'Identificación elemental de fuentes confiables vs noticias falsas',
      ],
      tabletUsage: 'Creación de mapas mentales visuales, anotaciones sobre lecturas con lápiz óptico y grabación de audionotas reflexivas breves.',
      aiApplication: 'Uso de la IA como "tutor paciente" para aclarar términos difíciles mediante metáforas cotidianas aprobadas por el docente.',
      classroomExample: 'En Biología de 1.º año, los estudiantes usan dispositivos para consultar a la IA cómo explicaría la membrana celular a un estudiante que recién inicia la materia, y luego dibujan y graban un micro-vídeo explicando la analogía con sus propias palabras.',
    },
    {
      id: 'profundizacion',
      badge: '3.º Año',
      title: 'Fase de Profundización: Análisis de Datos y Simuladores',
      focus: 'Profundización Científica',
      stage: 'Ciclo Intermedio de Profundización',
      description: 'Los alumnos de 3.º año desarrollan pensamiento experimental y rigor analítico. Se integran simuladores virtuales de laboratorio y se profundiza en la identificación de sesgos informativos y contradicciones en respuestas automatizadas.',
      competencies: [
        'Modelado de hipótesis científicas y contraste con simuladores interactivos',
        'Detección sistemática de alucinaciones y sesgos en modelos de lenguaje',
        'Estructuración de prompts complejos con roles, contexto y restricciones',
        'Organización de carpetas de portafolio con trazabilidad de versiones',
      ],
      tabletUsage: 'Ejecución de simuladores interactivos, captura de datos en tablas compartidas y redacción de informes con evidencias gráficas.',
      aiApplication: 'La IA asume el rol de "abogado del diablo", contradiciendo las hipótesis del estudiante para obligarlo a buscar evidencia empírica en su tablet.',
      classroomExample: 'En Química de 3.º año, los alumnos contrastan los resultados de una simulación de pH en tablet con las respuestas dadas por dos motores de IA distintos, redactando un breve ensayo sobre discrepancias observadas.',
    },
    {
      id: 'especializacion',
      badge: '4.º y 5.º Año',
      title: 'Fase de Especialización: Impacto Comunitario y Madurez Preuniversitaria',
      focus: 'Especialización & Egresados',
      stage: 'Ciclo Diversificado & Preuniversitario',
      description: 'Cierre del ciclo educativo con proyectos multidisciplinarios de alto nivel de autonomía. Los estudiantes diseñan soluciones a problemas de su comunidad, utilizan herramientas de modelado 3D, podcasts y preparan su portafolio preuniversitario.',
      competencies: [
        'Desarrollo de proyectos con impacto social o ambiental tangible',
        'Curaduría ética avanzada y defensa oral del portafolio digital',
        'Uso de IA generativa para co-redacción de ensayos académicos rigurosos',
        'Prototipado en 3D, código de análisis de datos y preparación vocacional',
      ],
      tabletUsage: 'Estación de trabajo multimedia: edición de podcasts escolares, compilación del portafolio web personal y defensa mediante proyección digital.',
      aiApplication: 'Asistente de revisión de estilo, contra-argumentación en debates éticos de ciudadanía y acelerador de código para proyectos STEM.',
      classroomExample: 'En 5.º año, los estudiantes investigan la gestión de desechos sólidos en su municipio: usan tablets para tabular encuestas vecinales, interrogan a la IA sobre casos internacionales exitosos y diseñan una propuesta integral presentada ante la directiva escolar.',
    },
  ];

  readonly activeLevel = computed(() =>
    this.progressionLevels.find((lvl) => lvl.id === this.activeLevelId()) || this.progressionLevels[0]
  );

  goToDisenador(): void {
    this.state.setView('disenador');
  }
}
