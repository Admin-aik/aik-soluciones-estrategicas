import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CourseState } from '../../services/course-state';

@Component({
  selector: 'app-contacto',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatIconModule],
  template: `
    <section class="py-12 lg:py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Title and intro -->
        <div class="text-center max-w-3xl mx-auto mb-14">
          <div class="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-xs font-semibold text-blue-700 shadow-xs mb-4">
            <mat-icon class="scale-75">support_agent</mat-icon>
            <span>Consultoría Institucional & Capacitación Docente</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif tracking-tight">
            Conecta con AIK Soluciones Estratégicas
          </h2>
          <p class="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Acompañamos a directivos, coordinadores pedagógicos y docentes en el diseño de ecosistemas de aprendizaje activo, tablets e IA.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto">
          <!-- Columna Izquierda: Datos Directos y Canales Oficiales -->
          <div class="lg:col-span-5 flex flex-col justify-between rounded-3xl bg-slate-900 text-white p-8 sm:p-10 shadow-xl relative overflow-hidden">
            <div class="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-2xl"></div>

            <div>
              <div class="flex items-center gap-3 mb-6">
                <div class="bg-white p-1 rounded-xl shadow-xs">
                  <img
                    src="/aik-brand-logo.jpg"
                    alt="AIK Soluciones"
                    class="h-12 w-auto object-contain rounded-lg"
                  />
                </div>
                <div class="border-l border-slate-700 pl-3">
                  <h3 class="font-bold text-white text-base leading-tight">AiK Soluciones Estratégicas</h3>
                  <p class="text-[11px] text-purple-300 font-extrabold uppercase tracking-wider">Convergencia Humano-Tecnológica</p>
                  <p class="text-[11px] text-slate-300 font-bold tracking-wider">RIF: J-50807601-0</p>
                </div>
              </div>

              <p class="text-sm text-slate-300 leading-relaxed mb-6">
                Diseñamos planes a la medida de tu colegio o cuerpo docente: desde talleres prácticos intensivos en IA hasta consultorías institucionales y servicios técnicos en tablets.
              </p>

              <!-- Clarification badge -->
              <div class="mb-6 rounded-2xl bg-white/5 border border-cyan-400/20 p-4 text-xs text-slate-300 leading-relaxed">
                <span class="text-cyan-300 font-bold block mb-1">Nota sobre infraestructura:</span>
                Los talleres docentes no requieren tablets para realizarse. La integración de tablets es un servicio aparte para colegios interesados.
              </div>

              <!-- Tarjetas de Canales Directos -->
              <div class="space-y-3 sm:space-y-4">
                <!-- Email Institucional Principal -->
                <a
                  href="mailto:aiksolucionesca@gmail.com?subject=Solicitud%20de%20Consultor%C3%ADa%20Pedag%C3%B3gica%20-%20AIK"
                  class="flex items-center gap-4 rounded-2xl bg-white/5 border border-white/10 p-4 hover:bg-white/10 hover:border-cyan-400/40 transition-all group cursor-pointer"
                >
                  <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-300 group-hover:scale-105 transition-transform">
                    <mat-icon>mail</mat-icon>
                  </div>
                  <div class="overflow-hidden">
                    <p class="text-xs uppercase tracking-wider text-slate-400 font-bold">Correo Institucional</p>
                    <p class="text-sm sm:text-base font-semibold text-white truncate group-hover:text-cyan-300 transition-colors">
                      aiksolucionesca&#64;gmail.com
                    </p>
                  </div>
                </a>

                <!-- Email Corporativo / Directivo -->
                <a
                  href="mailto:ircar.rojas@aiksoluciones.com?subject=Contacto%20Institucional%20-%20AIK%20Soluciones"
                  class="flex items-center gap-4 rounded-2xl bg-white/5 border border-white/10 p-4 hover:bg-white/10 hover:border-indigo-400/40 transition-all group cursor-pointer"
                >
                  <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300 group-hover:scale-105 transition-transform">
                    <mat-icon>alternate_email</mat-icon>
                  </div>
                  <div class="overflow-hidden">
                    <p class="text-xs uppercase tracking-wider text-slate-400 font-bold">Contacto Corporativo</p>
                    <p class="text-sm sm:text-base font-semibold text-white truncate group-hover:text-indigo-300 transition-colors">
                      ircar.rojas&#64;aiksoluciones.com
                    </p>
                  </div>
                </a>

                <!-- Teléfono / WhatsApp -->
                <a
                  href="https://wa.me/584242135276?text=Hola%20AIK%20Soluciones%20Estrat%C3%A9gicas,%20deseo%20informaci%C3%B3n%20sobre%20la%20formaci%C3%B3n%20docente%20e%20innovaci%C3%B3n%20pedag%C3%B3gica."
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-4 rounded-2xl bg-white/5 border border-white/10 p-4 hover:bg-white/10 hover:border-emerald-400/40 transition-all group cursor-pointer"
                >
                  <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300 group-hover:scale-105 transition-transform">
                    <mat-icon>phone</mat-icon>
                  </div>
                  <div>
                    <p class="text-xs uppercase tracking-wider text-slate-400 font-bold">Teléfono / WhatsApp</p>
                    <p class="text-sm sm:text-base font-semibold text-white group-hover:text-emerald-300 transition-colors">
                      04242135276
                    </p>
                  </div>
                </a>
              </div>
            </div>

            <!-- Direct WhatsApp shortcut -->
            <div class="mt-8 pt-6 border-t border-white/10">
              <a
                href="https://wa.me/584242135276?text=Hola%20AIK%20Soluciones%20Estrat%C3%A9gicas,%20solicito%20contacto%20para%20capacitaci%C3%B3n%20en%20mi%20colegio."
                target="_blank"
                rel="noopener noreferrer"
                class="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm py-3 px-4 shadow-lg shadow-emerald-600/30 transition-all"
              >
                <mat-icon>chat</mat-icon>
                <span>Chatear por WhatsApp Directo</span>
              </a>
            </div>
          </div>

          <!-- Columna Derecha: Formulario Institucional -->
          <div class="lg:col-span-7 rounded-3xl border border-slate-200 bg-slate-50/50 p-8 sm:p-10 shadow-xs">
            @if (state.contactSuccess()) {
              <!-- Estado de Confirmación Exitoso -->
              <div class="h-full flex flex-col items-center justify-center text-center py-10 animate-in fade-in duration-300">
                <div class="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-6">
                  <mat-icon class="scale-150">check_circle</mat-icon>
                </div>
                <h3 class="text-2xl font-bold text-slate-900 font-serif">¡Solicitud Recibida con Éxito!</h3>
                <p class="mt-3 text-sm text-slate-600 max-w-md">
                  Gracias por tu interés en transformar el espacio digital de tu institución. Un consultor pedagógico de AIK Soluciones Estratégicas responderá a tu solicitud a la brevedad.
                </p>
                <div class="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    (click)="resetForm()"
                    class="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    <mat-icon class="scale-90">refresh</mat-icon>
                    <span>Enviar otro mensaje</span>
                  </button>
                  <a
                    href="https://wa.me/584242135276?text=Hola,%20acabo%20de%20enviar%20el%20formulario%20institucional%20en%20la%20plataforma%20de%20AIK."
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-2.5 text-xs font-semibold text-white hover:bg-blue-600"
                  >
                    <mat-icon class="scale-90">outgoing_mail</mat-icon>
                    <span>Confirmar por WhatsApp</span>
                  </a>
                </div>
              </div>
            } @else {
              <!-- Formulario de Contacto -->
              <div>
                <h3 class="text-xl font-bold text-slate-900">Formulario de Contacto Institucional</h3>
                <p class="text-xs text-slate-500 mt-1 mb-6">Para escuelas, directivos y docentes que desean implementar el modelo en su aula.</p>

                <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-5">
                  <!-- Nombre del Docente / Institución -->
                  <div>
                    <label for="contact-name" class="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                      Nombre del Docente o Institución Educativa *
                    </label>
                    <div class="relative">
                      <input
                        id="contact-name"
                        type="text"
                        formControlName="name"
                        placeholder="Ej. Prof. María Gómez / Colegio San Ignacio"
                        class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-2xs placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-hidden"
                      />
                    </div>
                    @if (contactForm.get('name')?.touched && contactForm.get('name')?.invalid) {
                      <p class="mt-1 text-xs text-rose-600">Por favor, ingresa el nombre de contacto o institución.</p>
                    }
                  </div>

                  <!-- Correo Electrónico -->
                  <div>
                    <label for="contact-email" class="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                      Correo Electrónico de Contacto *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      formControlName="email"
                      placeholder="nombre@colegio.edu.ve"
                      class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-2xs placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-hidden"
                    />
                    @if (contactForm.get('email')?.touched && contactForm.get('email')?.invalid) {
                      <p class="mt-1 text-xs text-rose-600">Ingresa un correo electrónico válido.</p>
                    }
                  </div>

                  <!-- Nivel Educativo a Atender -->
                  <div>
                    <label for="contact-grade" class="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                      Nivel o Etapa a Atender *
                    </label>
                    <select
                      id="contact-grade"
                      formControlName="gradeLevel"
                      class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-2xs focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-hidden"
                    >
                      <option value="Todos los Niveles Educativos">Todos los Niveles Educativos</option>
                      <option value="Ciclo Básico (1.º y 2.º año - Exploración)">Ciclo Básico (1.º y 2.º año - Exploración)</option>
                      <option value="3.º Año (Profundización & Ciencias)">3.º Año (Profundización & Ciencias)</option>
                      <option value="Ciclo Diversificado (4.º y 5.º año - Especialización)">Ciclo Diversificado (4.º y 5.º año - Especialización)</option>
                      <option value="Dirección y Coordinación Pedagógica">Dirección y Coordinación Pedagógica</option>
                    </select>
                  </div>

                  <!-- Mensaje o Requerimiento -->
                  <div>
                    <label for="contact-msg" class="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                      Mensaje o Necesidad Pedagógica *
                    </label>
                    <textarea
                      id="contact-msg"
                      rows="4"
                      formControlName="message"
                      placeholder="Cuéntanos sobre los objetivos de tu colegio: número de docentes, asignaturas prioritarias, disponibilidad de tablets o inquietudes sobre el uso ético de la IA..."
                      class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-2xs placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-hidden resize-none"
                    ></textarea>
                    @if (contactForm.get('message')?.touched && contactForm.get('message')?.invalid) {
                      <p class="mt-1 text-xs text-rose-600">Por favor, detalla brevemente tu requerimiento (mínimo 10 caracteres).</p>
                    }
                  </div>

                  <!-- Botón Enviar -->
                  <div class="pt-2">
                    <button
                      type="submit"
                      [disabled]="contactForm.invalid || state.isSubmittingContact()"
                      class="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-blue-700/20 hover:bg-blue-600 active:scale-98 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      @if (state.isSubmittingContact()) {
                        <mat-icon class="animate-spin">autorenew</mat-icon>
                        <span>Enviando información...</span>
                      } @else {
                        <mat-icon>send</mat-icon>
                        <span>Enviar Solicitud Institucional</span>
                      }
                    </button>
                  </div>
                </form>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class Contacto {
  readonly state = inject(CourseState);

  readonly contactForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    gradeLevel: new FormControl('Todos los Niveles Educativos', [Validators.required]),
    message: new FormControl('', [Validators.required, Validators.minLength(10)]),
  });

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    const val = this.contactForm.getRawValue();
    this.state.submitContactInquiry({
      name: val.name || '',
      email: val.email || '',
      gradeLevel: val.gradeLevel || '',
      message: val.message || '',
    }).subscribe();
  }

  resetForm(): void {
    this.contactForm.reset({
      gradeLevel: 'Todos los Niveles Educativos',
    });
    this.state.contactSuccess.set(false);
  }
}
