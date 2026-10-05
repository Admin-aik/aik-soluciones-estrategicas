import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CourseState } from '../../services/course-state';

@Component({
  selector: 'app-splash',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    @if (state.showSplash()) {
      <div class="fixed inset-0 z-50 flex flex-col items-center justify-between overflow-y-auto bg-slate-950 text-white p-6 sm:p-10 select-none animate-in fade-in duration-300">
        <!-- Imagen de Fondo: Aula Digital con Estudiantes y Docente -->
        <div class="absolute inset-0 pointer-events-none overflow-hidden">
          <img
            src="/intro_smart_classroom.jpg"
            alt="Estudiantes y Docentes en el Aula Digital AIK"
            referrerpolicy="no-referrer"
            class="h-full w-full object-cover object-center scale-105 filter brightness-75 contrast-105"
          />
          <!-- Degradados Oficiales para Legibilidad y Profundidad Cinemática -->
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-950/80"></div>
          <div class="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-indigo-950/40 to-purple-950/60 mix-blend-multiply"></div>
          
          <!-- Brillos ambientales azul cobalto y violeta púrpura -->
          <div class="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-blue-600/25 blur-3xl"></div>
          <div class="absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-purple-600/25 blur-3xl"></div>
        </div>

        <!-- Parte Superior: Indicador y Botón Omitir -->
        <div class="relative z-10 w-full max-w-5xl flex items-center justify-between pt-2">
          <div class="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 text-xs font-bold text-slate-200 shadow-md">
            <span class="h-2 w-2 rounded-full bg-purple-400 animate-pulse"></span>
            <span>Innovación Pedagógica & Transformación Digital</span>
          </div>

          <button
            type="button"
            (click)="state.skipSplash()"
            class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 transition-all cursor-pointer shadow-xs"
            title="Omitir introducción y entrar directamente"
          >
            <span>Omitir</span>
            <mat-icon class="scale-75 text-cyan-300">fast_forward</mat-icon>
          </button>
        </div>

        <!-- Centro: Presentación Institucional Oficial sin logotipo -->
        <div class="relative z-10 my-auto flex flex-col items-center justify-center text-center max-w-4xl w-full py-6">
          <!-- Nombre Institucional Oficial -->
          <h1 class="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white font-serif leading-tight drop-shadow-md">
            AiK Soluciones Estratégicas
          </h1>

          <!-- RIF Oficial Destacado con Vidrio Esmerilado -->
          <div class="mt-4 inline-flex items-center gap-2 rounded-xl bg-white/15 backdrop-blur-md border border-white/25 px-5 py-2 shadow-lg">
            <span class="text-sm sm:text-base font-black text-white tracking-wider">
              RIF: J-50807601-0
            </span>
          </div>

          <!-- Lema Oficial en Violeta Púrpura Brillante -->
          <p class="mt-4 text-base sm:text-lg md:text-xl font-extrabold uppercase tracking-widest text-purple-300 flex items-center justify-center gap-2 drop-shadow">
            <span class="h-2 w-2 rounded-full bg-purple-400"></span>
            <span>Convergencia Humano-Tecnológica</span>
            <span class="h-2 w-2 rounded-full bg-purple-400"></span>
          </p>

          <p class="mt-3 text-sm sm:text-base text-slate-200 font-medium max-w-2xl mx-auto drop-shadow-sm leading-relaxed">
            Diseñando el Espacio Digital del Mañana • Formación Docente en IA y Metodologías Activas
          </p>
        </div>

        <!-- Parte Inferior: Barra de Progreso y Acceso a la Plataforma -->
        <div class="relative z-10 w-full max-w-md pb-4 space-y-3 text-center">
          <!-- Barra de Carga Gradiente Azul a Púrpura -->
          <div class="w-full bg-white/15 backdrop-blur-xs h-2.5 rounded-full overflow-hidden p-0.5 border border-white/20">
            <div
              class="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full transition-all duration-1000 ease-linear shadow-sm"
              [style.width.%]="(state.splashSecondsLeft() / 5) * 100"
            ></div>
          </div>

          <div class="flex items-center justify-between gap-4 pt-1">
            <div class="flex items-center gap-2.5 text-left text-xs text-slate-300">
              <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 backdrop-blur-md border border-white/20 text-white font-black text-xs shadow-md">
                <span>{{ state.splashSecondsLeft() }}</span>
              </div>
              <div>
                <p class="font-bold text-white text-xs leading-none">Iniciando plataforma</p>
                <p class="text-[11px] text-slate-300">Entrando en {{ state.splashSecondsLeft() }}s...</p>
              </div>
            </div>

            <!-- Botón de Entrada Inmediata -->
            <button
              type="button"
              (click)="state.skipSplash()"
              class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 hover:from-blue-600 hover:to-purple-500 text-white px-5 py-2.5 text-xs sm:text-sm font-bold shadow-lg shadow-purple-900/40 active:scale-95 transition-all cursor-pointer border border-white/20"
            >
              <span>Entrar ahora</span>
              <mat-icon class="text-sm scale-90">arrow_forward</mat-icon>
            </button>
          </div>
        </div>
      </div>
    }
  `,
})
export class Splash {
  readonly state = inject(CourseState);
}
