import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CourseState } from '../../services/course-state';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <!-- Barra Principal de Navegación Fija en Todas las Páginas y Secciones -->
    <header class="fixed top-0 left-0 right-0 w-full z-50 bg-white/98 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between relative min-h-[96px] sm:min-h-[110px]">
        <!-- Logo Oficial AIK Soluciones Estratégicas 3D Ampliado + RIF -->
        <button
          type="button"
          (click)="selectSection(null)"
          class="flex items-center gap-3 sm:gap-5 text-left group cursor-pointer focus:outline-hidden py-1"
          title="Ir a la Portada Principal"
        >
          <div class="flex items-center bg-white p-1.5 sm:p-2 rounded-2xl shadow-xs border border-slate-200/90 group-hover:border-indigo-300 transition-all">
            <img
              src="/aik-brand-logo.jpg"
              alt="AiK Soluciones Estratégicas - Logotipo Oficial 3D"
              class="h-20 sm:h-24 md:h-28 w-auto object-contain transition-transform group-hover:scale-102 rounded-xl"
            />
          </div>
          <div class="border-l-2 border-slate-200 pl-3 sm:pl-4 space-y-0.5 sm:space-y-1">
            <span class="text-base sm:text-2xl font-black tracking-tight text-slate-900 leading-tight block group-hover:text-blue-800 transition-colors">
              AiK Soluciones Estratégicas
            </span>
            <p class="text-xs sm:text-sm text-purple-700 font-extrabold uppercase tracking-wider flex items-center gap-1.5">
              <span class="h-1.5 w-1.5 rounded-full bg-purple-600"></span>
              <span>Convergencia Humano-Tecnológica</span>
            </p>
            <p class="text-[11px] sm:text-xs font-black text-slate-700 tracking-wider">
              RIF: J-50807601-0
            </p>
          </div>
        </button>

        <!-- ESQUINA SUPERIOR DERECHA: BOTÓN DEL MENÚ DESPLEGABLE CON TODAS LAS SECCIONES -->
        <div class="relative">
          <button
            type="button"
            (click)="toggleMenu()"
            class="inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md shadow-slate-900/20 active:scale-95 transition-all cursor-pointer border border-slate-700/60"
            [class.ring-2]="menuOpen()"
            [class.ring-sky-500]="menuOpen()"
            aria-label="Abrir menú desplegable de secciones"
          >
            <mat-icon class="scale-90 text-sky-400">{{ menuOpen() ? 'close' : 'menu' }}</mat-icon>
            <span class="font-extrabold tracking-wide">Menú</span>
            <span class="hidden sm:inline font-normal text-slate-300">de Secciones</span>
            <mat-icon class="text-xs transition-transform duration-200" [class.rotate-180]="menuOpen()">expand_more</mat-icon>
          </button>

          <!-- DROPDOWN FLOTANTE ANCLADO A LA ESQUINA SUPERIOR DERECHA -->
          @if (menuOpen()) {
            <!-- Backdrop transparente para cerrar al hacer clic afuera -->
            <button
              type="button"
              aria-label="Cerrar menú desplegable"
              class="fixed inset-0 z-40 bg-slate-950/25 backdrop-blur-2xs w-full h-full border-0 cursor-default"
              (click)="menuOpen.set(false)"
            ></button>

            <!-- Panel Flotante Desplegable -->
            <div
              class="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl bg-white border border-slate-200 shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-3 duration-200 divide-y divide-slate-100 max-h-[85vh] overflow-y-auto"
            >
              <!-- Encabezado del Menú -->
              <div class="px-3 py-2 flex items-center justify-between text-xs text-slate-500 font-semibold">
                <span class="tracking-wider uppercase">Todas las Secciones</span>
                <span class="rounded-full bg-sky-100 text-sky-800 px-2 py-0.5 text-[10px] font-bold">Explorar</span>
              </div>

              <!-- Lista de Botones y Secciones -->
              <div class="py-2 space-y-1">
                <!-- 1. Portada Principal (Solo Portada) -->
                <button
                  type="button"
                  (click)="selectSection(null)"
                  class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left hover:bg-slate-100 transition-colors cursor-pointer group"
                >
                  <div class="h-9 w-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-colors shrink-0">
                    <mat-icon class="scale-90">home</mat-icon>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2">
                      <p class="text-xs sm:text-sm font-bold text-slate-900 leading-tight">Portada Principal</p>
                      <span class="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded font-semibold">Inicio</span>
                    </div>
                    <p class="text-[11px] text-slate-500 truncate">Página principal limpia (solo portada)</p>
                  </div>
                </button>

                <!-- 2. Nuestro Objetivo -->
                <button
                  type="button"
                  (click)="selectSection('objetivo')"
                  class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left hover:bg-sky-50 transition-colors cursor-pointer group"
                >
                  <div class="h-9 w-9 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center group-hover:bg-sky-600 group-hover:text-white transition-colors shrink-0">
                    <mat-icon class="scale-90">flag</mat-icon>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-xs sm:text-sm font-bold text-slate-900 leading-tight">Nuestro Objetivo</p>
                    <p class="text-[11px] text-slate-500 truncate">5 Pilares estratégicos y visión educativa</p>
                  </div>
                </button>

                <!-- 3. Nuestros Servicios -->
                <button
                  type="button"
                  (click)="selectSection('servicios')"
                  class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left hover:bg-blue-50 transition-colors cursor-pointer group"
                >
                  <div class="h-9 w-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                    <mat-icon class="scale-90">business_center</mat-icon>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-xs sm:text-sm font-bold text-slate-900 leading-tight">Nuestros Servicios</p>
                    <p class="text-[11px] text-slate-500 truncate">Capacitación docente, Cifraflow y laboratorios</p>
                  </div>
                </button>

                <!-- 3.1 Cifraflow: Educación Financiera -->
                <button
                  type="button"
                  (click)="selectSection('cifraflow')"
                  class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left bg-gradient-to-r from-cyan-50/90 via-sky-50/60 to-purple-50/70 hover:from-cyan-100 hover:to-purple-100 border border-cyan-200/80 transition-all cursor-pointer group"
                >
                  <div class="h-9 w-9 rounded-lg bg-gradient-to-tr from-cyan-600 to-indigo-600 text-white flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                    <mat-icon class="scale-90">savings</mat-icon>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2">
                      <p class="text-xs sm:text-sm font-black text-slate-900 leading-tight">Cifraflow</p>
                      <span class="rounded-full bg-cyan-600 text-white text-[9px] font-extrabold px-1.5 py-0.2">Gamificado</span>
                    </div>
                    <p class="text-[11px] text-cyan-900 font-semibold truncate">Educación Financiera & Ciberseguridad</p>
                  </div>
                </button>

                <!-- 4. Metodología 60/40 -->
                <button
                  type="button"
                  (click)="selectSection('metodologia')"
                  class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left hover:bg-teal-50 transition-colors cursor-pointer group"
                >
                  <div class="h-9 w-9 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors shrink-0">
                    <mat-icon class="scale-90">schema</mat-icon>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-xs sm:text-sm font-bold text-slate-900 leading-tight">Metodología 60/40</p>
                    <p class="text-[11px] text-slate-500 truncate">Cimientos pedagógicos y progresión formativa</p>
                  </div>
                </button>

                <!-- 5. Aula Virtual LMS -->
                <button
                  type="button"
                  (click)="selectSection('aula')"
                  class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left hover:bg-cyan-50 transition-colors cursor-pointer group"
                >
                  <div class="h-9 w-9 rounded-lg bg-cyan-100 text-cyan-700 flex items-center justify-center group-hover:bg-cyan-600 group-hover:text-white transition-colors shrink-0">
                    <mat-icon class="scale-90">local_library</mat-icon>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-xs sm:text-sm font-bold text-slate-900 leading-tight">Aula Virtual</p>
                    <p class="text-[11px] text-slate-500 truncate">Curso Modelo interactivo y microlearning</p>
                  </div>
                </button>

                <!-- 6. Generador de Cursos con IA -->
                <button
                  type="button"
                  (click)="selectSection('disenador')"
                  class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border border-blue-200/60 transition-colors cursor-pointer group"
                >
                  <div class="h-9 w-9 rounded-lg bg-gradient-to-r from-blue-700 to-indigo-600 text-white flex items-center justify-center shadow-xs shrink-0">
                    <mat-icon class="scale-90">smart_toy</mat-icon>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2">
                      <p class="text-xs sm:text-sm font-bold text-blue-900 leading-tight">Generador con IA</p>
                      <span class="rounded bg-blue-700 text-white text-[9px] font-black px-1.5 py-0.2">PRO</span>
                    </div>
                    <p class="text-[11px] text-blue-700/80 truncate">Diseño de secuencias didácticas con Gemini</p>
                  </div>
                </button>

                <!-- 7. Blog Pedagógico -->
                <button
                  type="button"
                  (click)="selectSection('blog')"
                  class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left hover:bg-indigo-50 transition-colors cursor-pointer group"
                >
                  <div class="h-9 w-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors shrink-0">
                    <mat-icon class="scale-90">article</mat-icon>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2">
                      <p class="text-xs sm:text-sm font-bold text-slate-900 leading-tight">Blog Pedagógico</p>
                      <span class="rounded bg-indigo-600 text-white text-[9px] font-bold px-1.5 py-0.2">Nuevo</span>
                    </div>
                    <p class="text-[11px] text-slate-500 truncate">Tendencias y uso de tablets en el aula</p>
                  </div>
                </button>

                <!-- 8. Contacto Institucional -->
                <button
                  type="button"
                  (click)="selectSection('contacto')"
                  class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left hover:bg-violet-50 transition-colors cursor-pointer group"
                >
                  <div class="h-9 w-9 rounded-lg bg-violet-100 text-violet-700 flex items-center justify-center group-hover:bg-violet-600 group-hover:text-white transition-colors shrink-0">
                    <mat-icon class="scale-90">contact_support</mat-icon>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-xs sm:text-sm font-bold text-slate-900 leading-tight">Contacto Institucional</p>
                    <p class="text-[11px] text-slate-500 truncate">Solicitud de consultoría y WhatsApp</p>
                  </div>
                </button>
              </div>

              <!-- Pie del Menú -->
              <div class="pt-2 px-1 flex items-center justify-between">
                <button
                  type="button"
                  (click)="reopenIntro()"
                  class="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 transition-colors cursor-pointer py-1 px-2 rounded-lg hover:bg-slate-100"
                >
                  <mat-icon class="text-xs scale-75">replay</mat-icon>
                  <span>Ver Intro (5s)</span>
                </button>

                <button
                  type="button"
                  (click)="selectSection(null)"
                  class="text-xs text-sky-700 font-bold hover:underline cursor-pointer"
                >
                  Solo Portada
                </button>
              </div>
            </div>
          }
        </div>
      </div>
    </header>
  `,
})
export class Header {
  readonly state = inject(CourseState);
  readonly menuOpen = signal<boolean>(false);

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  selectSection(sectionKey: string | null): void {
    this.menuOpen.set(false);
    this.state.openSection(sectionKey);
  }

  reopenIntro(): void {
    this.menuOpen.set(false);
    this.state.openSplash();
  }
}
