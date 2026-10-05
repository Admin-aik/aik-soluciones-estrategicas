import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CourseState, AppView } from '../../services/course-state';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <!-- Cintillo Inferior y Pie de Página con Fondo Blanco Limpio -->
    <footer class="bg-white text-slate-600 border-t border-slate-200 text-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <!-- Columna 1: Marca y Misión -->
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <div class="bg-white p-1 rounded-xl shadow-xs border border-slate-200">
                <img
                  src="/aik-brand-logo.jpg"
                  alt="AIK Soluciones"
                  class="h-10 w-auto object-contain rounded-lg"
                />
              </div>
              <div class="border-l border-slate-300 pl-3">
                <span class="font-black text-slate-900 text-sm tracking-tight block">
                  AiK Soluciones Estratégicas
                </span>
                <span class="text-[10px] uppercase font-bold text-purple-700 tracking-wider block">
                  Convergencia Humano-Tecnológica
                </span>
                <span class="text-[11px] font-bold text-slate-700 tracking-wide block">
                  RIF: J-50807601-0
                </span>
              </div>
            </div>
            <p class="text-xs text-slate-600 leading-relaxed">
              Empresa de consultoría y formación pedagógica especializada. Rediseñamos el aula para la era de la inteligencia artificial bajo el modelo activo 60/40.
            </p>
            <div class="pt-2">
              <button
                type="button"
                (click)="state.openSplash()"
                class="inline-flex items-center gap-1.5 text-xs text-purple-700 hover:text-purple-900 font-bold transition-colors cursor-pointer"
              >
                <mat-icon class="text-xs scale-75">replay</mat-icon>
                <span>Ver Pantalla de Bienvenida (Intro 5s)</span>
              </button>
            </div>
          </div>

          <!-- Columna 2: Navegación de la Plataforma -->
          <div>
            <h4 class="text-slate-900 text-xs font-bold uppercase tracking-wider mb-4">
              Navegación
            </h4>
            <ul class="space-y-2.5 text-xs">
              <li>
                <button
                  type="button"
                  (click)="goTo('inicio')"
                  class="text-slate-600 hover:text-blue-800 transition-colors cursor-pointer"
                >
                  Inicio & Portada
                </button>
              </li>
              <li>
                <button
                  type="button"
                  (click)="goTo('metodologia')"
                  class="text-slate-600 hover:text-blue-800 transition-colors cursor-pointer"
                >
                  Metodología Activa (Modelo 60/40)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  (click)="goTo('aula')"
                  class="text-slate-600 hover:text-blue-800 transition-colors cursor-pointer"
                >
                  Aula Virtual (LMS Microlearning)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  (click)="goTo('disenador')"
                  class="text-slate-600 hover:text-blue-800 transition-colors cursor-pointer"
                >
                  Generador de Cursos con IA
                </button>
              </li>
              <li>
                <button
                  type="button"
                  (click)="goTo('contacto')"
                  class="text-slate-600 hover:text-blue-800 transition-colors cursor-pointer"
                >
                  Contacto Institucional
                </button>
              </li>
            </ul>
          </div>

          <!-- Columna 3: Niveles Formativos -->
          <div>
            <h4 class="text-slate-900 text-xs font-bold uppercase tracking-wider mb-4">
              Itinerario de Formación
            </h4>
            <ul class="space-y-2 text-xs">
              <li class="flex items-center gap-1.5 text-slate-700">
                <span class="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
                <span>Ciclo Inicial (Exploración & Creadores)</span>
              </li>
              <li class="flex items-center gap-1.5 text-slate-700">
                <span class="h-1.5 w-1.5 rounded-full bg-indigo-600"></span>
                <span>Ciclo Intermedio (Profundización & Simuladores)</span>
              </li>
              <li class="flex items-center gap-1.5 text-slate-700">
                <span class="h-1.5 w-1.5 rounded-full bg-purple-600"></span>
                <span>Ciclo Avanzado (Especialización & Egresados)</span>
              </li>
              <li class="mt-3 text-[11px] text-slate-500">
                Acreditación: 20 horas de formación docente con portafolios digitales de evidencia.
              </li>
            </ul>
          </div>

          <!-- Columna 4: Contacto Directo -->
          <div>
            <h4 class="text-slate-900 text-xs font-bold uppercase tracking-wider mb-4">
              Contacto Oficial
            </h4>
            <div class="space-y-3 text-xs">
              <a
                href="mailto:aiksolucionesca@gmail.com"
                class="flex items-center gap-2 text-slate-600 hover:text-blue-700 transition-colors"
              >
                <mat-icon class="text-xs scale-75 text-blue-600">email</mat-icon>
                <span>aiksolucionesca&#64;gmail.com</span>
              </a>
              <a
                href="https://wa.me/584242135276"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 text-slate-600 hover:text-emerald-600 transition-colors"
              >
                <mat-icon class="text-xs scale-75 text-emerald-600">phone</mat-icon>
                <span>04242135276 (WhatsApp)</span>
              </a>
              <p class="text-[11px] text-slate-500 pt-2">
                Atención a colegios públicos, privados y directivas educativas a nivel nacional e internacional.
              </p>
            </div>
          </div>
        </div>

        <!-- Cintillo Inferior Final / Copyright con Fondo Blanco -->
        <div class="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 bg-white">
          <p>© 2026 AIK Soluciones Estratégicas • RIF: J-50807601-0. Todos los derechos reservados.</p>
          <p class="flex items-center gap-2">
            <span>Diseñando el Espacio Digital del Mañana</span>
            <span class="text-slate-300">•</span>
            <span class="text-purple-700 font-bold">Innovación Pedagógica y Transformación Digital</span>
          </p>
        </div>
      </div>
    </footer>
  `,
})
export class Footer {
  readonly state = inject(CourseState);

  goTo(view: AppView): void {
    this.state.setView(view);
  }
}
