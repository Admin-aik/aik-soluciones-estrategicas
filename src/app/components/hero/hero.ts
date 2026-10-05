import { ChangeDetectionStrategy, Component, inject, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CourseState } from '../../services/course-state';
import { DEFAULT_AIK_COURSE } from '../../data/default-course';
import { Metodologia } from '../metodologia/metodologia';
import { Contacto } from '../contacto/contacto';
import { Disenador } from '../disenador/disenador';
import { Aula } from '../aula/aula';
import { Blog } from '../blog/blog';

interface ShowcaseImage {
  id: string;
  src: string;
  tag: string;
  tagColor: string;
  title: string;
  subtitle: string;
  serviceCategory: string;
  highlights: string[];
}

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, Metodologia, Contacto, Disenador, Aula, Blog],
  template: `
    <div id="portada-principal" class="relative overflow-hidden pt-4 pb-16 lg:pt-8 lg:pb-20">
      <!-- Fondo decorativo moderno con rejilla tecnológica y destellos luminosos -->
      <div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-30">
        <div class="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-cyan-400/30 to-blue-600/20 blur-3xl"></div>
        <div class="absolute top-1/2 -left-40 h-[450px] w-[450px] rounded-full bg-gradient-to-tr from-sky-400/25 to-violet-500/20 blur-3xl"></div>
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- 1. SLIDER A LO LARGO DE LA PANTALLA DE PORTADA (PANORÁMICO A TODO LO ANCHO) -->
        <div
          class="w-full select-none space-y-3"
          (mouseenter)="onMouseEnter()"
          (mouseleave)="onMouseLeave()"
        >
          <!-- Contenedor Panorámico a Todo lo Ancho con Bordes Curvos y Sombra -->
          <div class="relative w-full rounded-3xl overflow-hidden border-2 border-slate-200/90 shadow-2xl bg-slate-950 aspect-16/9 sm:aspect-16/8 min-h-[350px] max-h-[580px] group">
            <!-- Slides con Transición Suave y Fotografía en Alta Calidad Panorámica con encuadre centrado en rostros -->
            @for (item of showcaseList; track item.id; let idx = $index) {
              <div
                class="absolute inset-0 transition-opacity duration-700 ease-in-out"
                [class.opacity-100]="currentIndex() === idx"
                [class.opacity-0]="currentIndex() !== idx"
                [class.pointer-events-none]="currentIndex() !== idx"
              >
                <img
                  [src]="item.src"
                  [alt]="item.title"
                  referrerpolicy="no-referrer"
                  class="w-full h-full object-cover object-[center_28%] scale-100 group-hover:scale-102 transition-transform duration-7000 ease-out"
                />
              </div>
            }

            <!-- Controles Flotantes Superiores Sutiles: Indicador y Botón Play/Pause -->
            <div class="absolute top-4 right-4 z-20 flex items-center gap-2 rounded-full bg-slate-950/75 backdrop-blur-md border border-white/20 px-3.5 py-1.5 text-xs text-white shadow-lg">
              <button
                type="button"
                (click)="toggleAutoPlay()"
                class="p-1 rounded-full hover:bg-white/25 transition-colors cursor-pointer flex items-center justify-center"
                [title]="isAutoPlay() ? 'Pausar slider show' : 'Reanudar slider show'"
              >
                <mat-icon class="text-xs scale-90">{{ isAutoPlay() ? 'pause' : 'play_arrow' }}</mat-icon>
              </button>
              <span class="text-xs font-bold tracking-wider text-sky-300">
                Slide {{ currentIndex() + 1 }} / {{ showcaseList.length }}
              </span>
            </div>

            <!-- Botones Flotantes de Navegación Anterior / Siguiente -->
            <button
              type="button"
              (click)="prevSlide()"
              class="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-11 w-11 rounded-full bg-slate-950/70 hover:bg-slate-950/90 text-white backdrop-blur-md border border-white/20 flex items-center justify-center opacity-75 group-hover:opacity-100 transition-all active:scale-90 cursor-pointer shadow-xl"
              title="Slide anterior"
            >
              <mat-icon>chevron_left</mat-icon>
            </button>

            <button
              type="button"
              (click)="nextSlide()"
              class="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-11 w-11 rounded-full bg-slate-950/70 hover:bg-slate-950/90 text-white backdrop-blur-md border border-white/20 flex items-center justify-center opacity-75 group-hover:opacity-100 transition-all active:scale-90 cursor-pointer shadow-xl"
              title="Slide siguiente"
            >
              <mat-icon>chevron_right</mat-icon>
            </button>

            <!-- Barra de Progreso de Tiempo del Slide Activo -->
            @if (isAutoPlay()) {
              <div class="absolute bottom-0 left-0 right-0 h-1.5 bg-black/30 z-20">
                <div
                  class="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-75 ease-linear"
                  [style.width.%]="slideProgress()"
                ></div>
              </div>
            }
          </div>

          <!-- Selector de Miniaturas Panorámico (5 diapositivas) -->
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3 pt-1">
            @for (item of showcaseList; track item.id; let idx = $index) {
              <button
                type="button"
                (click)="selectSlide(idx)"
                [class]="currentIndex() === idx ? 'ring-2 ring-indigo-600 scale-101 border-indigo-600 shadow-md opacity-100' : 'opacity-70 hover:opacity-100 border-slate-200'"
                class="relative rounded-2xl overflow-hidden border aspect-16/8 transition-all cursor-pointer group"
              >
                <img
                  [src]="item.src"
                  [alt]="item.title"
                  referrerpolicy="no-referrer"
                  class="w-full h-full object-cover object-[center_25%] group-hover:scale-105 transition-transform duration-300"
                />
                <div class="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors"></div>

                @if (currentIndex() === idx && isAutoPlay()) {
                  <div class="absolute top-0 left-0 right-0 h-1 bg-indigo-600 z-10"></div>
                }

                <div class="absolute bottom-1.5 left-2 right-2 text-[10px] sm:text-xs font-bold text-white truncate text-left drop-shadow-md">
                  {{ item.tag }}
                </div>
              </button>
            }
          </div>
        </div>

        <!-- 2. TEXTO EN DOS BLOQUES DEBAJO DEL SLIDER -->
        <div class="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <!-- BLOQUE 1 (Izquierda): Información Institucional & Propuesta de Valor & Botones -->
          <div class="lg:col-span-7 space-y-6 text-left">
            <!-- Título Principal Impactante -->
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 font-serif leading-[1.15]">
              Transformamos la Educación <br />
              <span class="bg-gradient-to-r from-blue-900 via-indigo-700 to-purple-700 bg-clip-text text-transparent">
                Junto a los Docentes
              </span>
            </h1>

            <!-- Subtítulo -->
            <p class="text-base sm:text-lg text-slate-600 leading-relaxed">
              Programas de capacitación docente en Inteligencia Artificial, diseño curricular y metodologías activas para instituciones educativas.
            </p>

            <!-- Aclaratoria Clave: Talleres sin limitación de infraestructura -->
            <div class="rounded-2xl bg-gradient-to-r from-blue-50/80 via-indigo-50/40 to-purple-50/60 border border-indigo-200/80 p-4 shadow-2xs">
              <div class="flex items-start gap-3">
                <div class="h-8 w-8 rounded-xl bg-gradient-to-br from-blue-900 to-indigo-700 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <mat-icon class="text-sm scale-90">check</mat-icon>
                </div>
                <div class="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <strong class="text-indigo-950 block font-bold text-[13px] mb-0.5">
                    Talleres Docentes Adaptables (No se requieren tablets obligatorias):
                  </strong>
                  Impartimos talleres de IA y Metodología 60/40 en cualquier centro educativo con sus recursos actuales (laptops, PC o móviles). La <em>integración de tablets</em> se ofrece como un <strong>servicio complementario aparte</strong> para colegios que deseen equipamiento móvil.
                </div>
              </div>
            </div>

            <!-- Botones de Acción Directa para Desplegar Secciones -->
            <div class="flex flex-wrap items-center gap-2.5 pt-2">
              <!-- Botón: Nuestro Objetivo -->
              <button
                type="button"
                (click)="openSec('objetivo')"
                class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-900 via-indigo-700 to-purple-700 hover:from-blue-800 hover:to-purple-600 px-4 py-3 text-xs sm:text-sm font-bold text-white shadow-md active:scale-95 transition-all cursor-pointer"
              >
                <mat-icon class="scale-90 text-purple-300">flag</mat-icon>
                <span>Nuestro Objetivo</span>
              </button>

              <!-- Botón: Nuestros Servicios -->
              <button
                type="button"
                (click)="openSec('servicios')"
                class="inline-flex items-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 px-4 py-3 text-xs sm:text-sm font-bold text-white shadow-md active:scale-95 transition-all cursor-pointer"
              >
                <mat-icon class="scale-90 text-cyan-400">business_center</mat-icon>
                <span>Nuestros Servicios</span>
              </button>

              <!-- Botón: Cifraflow (Educación Financiera) -->
              <button
                type="button"
                (click)="openSec('cifraflow')"
                class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 px-4 py-3 text-xs sm:text-sm font-bold text-white shadow-md active:scale-95 transition-all cursor-pointer"
              >
                <mat-icon class="scale-90 text-cyan-200">savings</mat-icon>
                <span>Cifraflow</span>
              </button>

              <!-- Botón: Metodología 60/40 -->
              <button
                type="button"
                (click)="openSec('metodologia')"
                class="inline-flex items-center gap-2 rounded-xl bg-white border border-slate-300 hover:border-blue-400 hover:bg-slate-50 px-4 py-3 text-xs sm:text-sm font-semibold text-slate-700 shadow-xs active:scale-95 transition-all cursor-pointer"
              >
                <mat-icon class="scale-90 text-blue-600">schema</mat-icon>
                <span>Metodología 60/40</span>
              </button>

              <!-- Botón: Aula Virtual -->
              <button
                type="button"
                (click)="openSec('aula')"
                class="inline-flex items-center gap-2 rounded-xl bg-cyan-50 hover:bg-cyan-100 border border-cyan-200 px-4 py-3 text-xs sm:text-sm font-semibold text-cyan-800 transition-all cursor-pointer"
              >
                <mat-icon class="scale-90 text-cyan-600">local_library</mat-icon>
                <span>Aula Virtual</span>
              </button>

              <!-- Botón: Diseñador con IA -->
              <button
                type="button"
                (click)="openSec('disenador')"
                class="inline-flex items-center gap-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-4 py-3 text-xs sm:text-sm font-semibold text-indigo-800 transition-all cursor-pointer"
              >
                <mat-icon class="scale-90 text-indigo-600">smart_toy</mat-icon>
                <span>Generador con IA</span>
              </button>

              <!-- Botón: Blog Pedagógico -->
              <button
                type="button"
                (click)="openSec('blog')"
                class="inline-flex items-center gap-2 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 px-4 py-3 text-xs sm:text-sm font-semibold text-purple-900 transition-all cursor-pointer"
              >
                <mat-icon class="scale-90 text-purple-700">article</mat-icon>
                <span>Blog</span>
              </button>

              <!-- Botón: Contacto -->
              <button
                type="button"
                (click)="openSec('contacto')"
                class="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-3 text-xs sm:text-sm font-bold shadow-md active:scale-95 transition-all cursor-pointer"
              >
                <mat-icon class="scale-90">contact_phone</mat-icon>
                <span>Contacto</span>
              </button>
            </div>
          </div>

          <!-- BLOQUE 2 (Derecha): Ficha Pedagógica & Detalle Dinámico de la Escena del Slider -->
          <div class="lg:col-span-5 space-y-4">
            <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-md transition-all duration-300 relative overflow-hidden">
              <div class="flex items-center justify-between gap-2 mb-3">
                <div class="flex items-center gap-2">
                  <span class="rounded-full px-3 py-1 text-xs font-bold text-white shadow-xs" [class]="activeShowcase().tagColor">
                    {{ activeShowcase().tag }}
                  </span>
                  <span class="rounded-full bg-slate-100 border border-slate-200 px-2.5 py-0.5 text-xs font-bold text-slate-700">
                    {{ activeShowcase().serviceCategory }}
                  </span>
                </div>
                <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-xs font-black text-slate-600">
                  <mat-icon class="text-xs scale-75 text-indigo-600">visibility</mat-icon>
                  <span>Escena {{ currentIndex() + 1 }} de {{ showcaseList.length }}</span>
                </div>
              </div>

              <!-- Título de la imagen en grande -->
              <h3 class="text-xl sm:text-2xl font-black text-slate-900 font-serif leading-snug">
                {{ activeShowcase().title }}
              </h3>

              <!-- Subtítulo explicativo -->
              <p class="text-sm text-slate-600 mt-2.5 leading-relaxed">
                {{ activeShowcase().subtitle }}
              </p>

              <!-- Aspectos clave / Puntos metodológicos -->
              <div class="mt-4 pt-4 border-t border-slate-100 space-y-2">
                <p class="text-[11px] uppercase tracking-wider font-extrabold text-slate-400">
                  Puntos Clave del Enfoque Pedagógico:
                </p>
                <div class="flex flex-wrap gap-2">
                  @for (hl of activeShowcase().highlights; track hl) {
                    <span class="text-xs bg-slate-50 border border-slate-200/90 px-3 py-1 rounded-xl font-semibold text-slate-700 flex items-center gap-1.5 shadow-2xs">
                      <span class="text-emerald-600 font-bold">✓</span> {{ hl }}
                    </span>
                  }
                </div>
              </div>

              <!-- Botón contextual según el slide -->
              <div class="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span class="text-xs text-slate-500 font-medium">¿Desea implementar esta dinámica?</span>
                <button
                  type="button"
                  (click)="openSec('servicios')"
                  class="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
                >
                  <span>Ver propuesta</span>
                  <mat-icon class="scale-75">arrow_forward</mat-icon>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. CONTENEDOR DE SECCIONES DESPLEGADAS DINÁMICAMENTE -->
        <!-- Cuando state.deployedSection() es null, SOLAMENTE se ve la portada como página principal -->
        @if (state.deployedSection(); as currentSec) {
          <div id="seccion-contenedor" class="mt-14 pt-8 border-t border-slate-200 scroll-mt-24 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <!-- Barra Superior de Control de la Sección Desplegada con los Colores del Logo -->
            <div class="sticky top-24 z-30 flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-blue-950 via-blue-900 to-purple-950 text-white shadow-xl mb-10 border border-indigo-700/60 backdrop-blur-md">
              <div class="flex items-center gap-3">
                <span class="flex h-3 w-3 relative">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-3 w-3 bg-purple-400"></span>
                </span>
                <div>
                  <span class="text-[11px] uppercase tracking-wider text-purple-300 font-bold block">Sección Desplegada</span>
                  <span class="text-sm sm:text-base font-extrabold text-white">{{ getSectionTitle(currentSec) }}</span>
                </div>
              </div>

              <button
                type="button"
                (click)="closeSec()"
                class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold transition-all cursor-pointer border border-white/20"
                title="Cerrar sección y ver solamente la portada principal"
              >
                <mat-icon class="scale-75">close</mat-icon>
                <span>Cerrar (Solo Portada)</span>
              </button>
            </div>

            <!-- Contenido Específico Desplegado Según la Selección -->
            @switch (currentSec) {
              <!-- 2.1 Sección: Nuestro Objetivo -->
              @case ('objetivo') {
                <section id="seccion-objetivo" class="scroll-mt-32">
                  <div class="rounded-3xl border border-indigo-100 bg-white p-8 sm:p-12 shadow-xl relative overflow-hidden">
                    <div class="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/15 blur-3xl"></div>
                    <div class="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-gradient-to-tr from-indigo-500/10 to-blue-500/10 blur-3xl"></div>

                    <div class="relative z-10">
                      <div class="text-center max-w-3xl mx-auto mb-12">
                        <span class="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-900 via-indigo-700 to-purple-700 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 shadow-md">
                          <mat-icon class="text-sm scale-90 text-purple-300">flag</mat-icon>
                          <span>Misión y Visión Estratégica</span>
                        </span>
                        <h2 class="mt-4 text-3xl sm:text-5xl font-black text-slate-900 font-serif tracking-tight">
                          Nuestro Objetivo
                        </h2>
                        <p class="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
                          Pilares de transformación educativa y convergencia digital diseñados para potenciar el talento de estudiantes y docentes.
                        </p>
                      </div>

                      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <!-- Objetivo 1: Alfabetización Digital y en IA -->
                        <div class="rounded-2xl border border-sky-200 bg-white/95 p-6 shadow-sm hover:shadow-xl hover:border-sky-400 transition-all duration-300 flex flex-col justify-between group">
                          <div>
                            <div class="flex items-center justify-between mb-4">
                              <div class="h-12 w-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:bg-sky-600 group-hover:text-white transition-all">
                                <mat-icon>devices</mat-icon>
                              </div>
                              <span class="text-xs font-black text-sky-700 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-200">
                                01
                              </span>
                            </div>
                            <h3 class="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                              Alfabetización Digital y en IA
                            </h3>
                            <p class="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                              Capacitar a los estudiantes en el uso efectivo de tablets y familiarizarlos con conceptos básicos de Inteligencia Artificial y sus aplicaciones prácticas.
                            </p>
                          </div>
                          <div class="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-sky-700">
                            <mat-icon class="scale-75">check_circle</mat-icon>
                            <span>Uso responsable & competencias digitales</span>
                          </div>
                        </div>

                        <!-- Objetivo 2: Desarrollo de Competencias con IA -->
                        <div class="rounded-2xl border border-indigo-200 bg-white/95 p-6 shadow-sm hover:shadow-xl hover:border-indigo-400 transition-all duration-300 flex flex-col justify-between group">
                          <div>
                            <div class="flex items-center justify-between mb-4">
                              <div class="h-12 w-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                <mat-icon>psychology</mat-icon>
                              </div>
                              <span class="text-xs font-black text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">
                                02
                              </span>
                            </div>
                            <h3 class="text-lg font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                              Desarrollo de Competencias con IA
                            </h3>
                            <p class="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                              Impulsar el uso de herramientas de IA para la investigación, creación de contenido, análisis de datos y personalización del aprendizaje.
                            </p>
                          </div>
                          <div class="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-indigo-700">
                            <mat-icon class="scale-75">check_circle</mat-icon>
                            <span>Investigación crítica & análisis de datos</span>
                          </div>
                        </div>

                        <!-- Objetivo 3: Fomento de Competencias Blandas -->
                        <div class="rounded-2xl border border-teal-200 bg-white/95 p-6 shadow-sm hover:shadow-xl hover:border-teal-400 transition-all duration-300 flex flex-col justify-between group">
                          <div>
                            <div class="flex items-center justify-between mb-4">
                              <div class="h-12 w-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:bg-teal-600 group-hover:text-white transition-all">
                                <mat-icon>groups</mat-icon>
                              </div>
                              <span class="text-xs font-black text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">
                                03
                              </span>
                            </div>
                            <h3 class="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                              Fomento de Competencias Blandas
                            </h3>
                            <p class="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                              Promover el trabajo en equipo, la comunicación efectiva, el liderazgo, la adaptabilidad y la resiliencia a través de proyectos colaborativos y desafíos.
                            </p>
                          </div>
                          <div class="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-teal-700">
                            <mat-icon class="scale-75">check_circle</mat-icon>
                            <span>Liderazgo, adaptabilidad & resiliencia</span>
                          </div>
                        </div>

                        <!-- Objetivo 4: Acceso Equitativo a la Tecnología -->
                        <div class="rounded-2xl border border-blue-200 bg-white/95 p-6 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col justify-between group md:col-span-1 lg:col-span-1">
                          <div>
                            <div class="flex items-center justify-between mb-4">
                              <div class="h-12 w-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                <mat-icon>balance</mat-icon>
                              </div>
                              <span class="text-xs font-black text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                                04
                              </span>
                            </div>
                            <h3 class="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                              Acceso Equitativo a la Tecnología
                            </h3>
                            <p class="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                              Proporcionar a todos los estudiantes la oportunidad de acceder a una herramienta tecnológica de vanguardia.
                            </p>
                          </div>
                          <div class="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-blue-700">
                            <mat-icon class="scale-75">check_circle</mat-icon>
                            <span>Igualdad de oportunidades & inclusión digital</span>
                          </div>
                        </div>

                        <!-- Objetivo 5: Innovación Pedagógica -->
                        <div class="rounded-2xl border border-violet-200 bg-white/95 p-6 shadow-sm hover:shadow-xl hover:border-violet-400 transition-all duration-300 flex flex-col justify-between group md:col-span-2 lg:col-span-2">
                          <div>
                            <div class="flex items-center justify-between mb-4">
                              <div class="h-12 w-12 rounded-2xl bg-violet-100 text-violet-700 flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:bg-violet-600 group-hover:text-white transition-all">
                                <mat-icon>auto_awesome</mat-icon>
                              </div>
                              <span class="text-xs font-black text-violet-700 bg-violet-50 px-2.5 py-1 rounded-lg border border-violet-200">
                                05
                              </span>
                            </div>
                            <h3 class="text-lg font-bold text-slate-900 group-hover:text-violet-700 transition-colors">
                              Innovación Pedagógica
                            </h3>
                            <p class="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                              Transformar las metodologías de enseñanza y aprendizaje, haciendo el proceso más interactivo, dinámico y relevante para los intereses de los estudiantes.
                            </p>
                          </div>
                          <div class="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-violet-700">
                            <mat-icon class="scale-75">check_circle</mat-icon>
                            <span>Aprendizaje activo 60/40 & dinamismo curricular</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              }

              <!-- 2.2 Sección: Nuestros Servicios en Acción -->
              @case ('servicios') {
                <section id="seccion-servicios" class="scroll-mt-32 space-y-12">
                  <!-- COMPONENTES DEL PORTAFOLIO PEDAGÓGICO (ARRIBA - PROTAGONISTAS Y DE GRAN TAMAÑO) -->
                  <div>
                    <div class="mb-8 text-center sm:text-left">
                      <div class="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200/80 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-blue-700 shadow-xs mb-3">
                        <mat-icon class="scale-75 text-blue-600">stars</mat-icon>
                        <span>Servicios Esenciales AIK</span>
                      </div>
                      <h3 class="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-serif">
                        Componentes del Portafolio Pedagógico
                      </h3>
                      <p class="text-sm sm:text-base text-slate-600 mt-2 max-w-3xl">
                        Formación integral para centros educativos, docentes y estudiantes. Estrategias de innovación probadas en aulas venezolanas para la convergencia humano-tecnológica.
                      </p>
                    </div>

                    <!-- Cuadrícula de Servicios Ampliada (2 Columnas de Gran Presencia Visual) -->
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
                      <!-- Servicio 1: Capacitación Docente en IA y Metodologías Activas -->
                      <div class="rounded-3xl border-2 border-slate-200/90 bg-white overflow-hidden shadow-md hover:shadow-2xl hover:border-blue-500 transition-all duration-300 flex flex-col group">
                        <div class="relative h-64 sm:h-72 overflow-hidden bg-slate-950">
                          <img
                            src="/taller_docente_pantalla.jpg"
                            alt="Capacitación Docente en Inteligencia Artificial"
                            referrerpolicy="no-referrer"
                            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                          <span class="absolute top-4 left-4 bg-blue-600 text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                            <mat-icon class="scale-75">school</mat-icon>
                            <span>Servicio Principal • Formación Docente</span>
                          </span>
                          <div class="absolute bottom-3 left-4 right-4 text-white">
                            <span class="text-xs uppercase font-extrabold text-blue-300 tracking-wider">Acompañamiento en Aula</span>
                            <p class="text-lg font-bold leading-tight">Talleres Prácticos para el Claustro de Profesores</p>
                          </div>
                        </div>
                        <div class="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-5">
                          <div class="space-y-3">
                            <h4 class="font-black text-slate-900 text-xl sm:text-2xl font-serif group-hover:text-blue-700 transition-colors">
                              Capacitación Docente en Inteligencia Artificial
                            </h4>
                            <p class="text-sm text-slate-600 leading-relaxed">
                              Programa formativo integral para educadores en diseño instruccional con IA, formulación de prompts curriculares, evaluación formativa por portafolios y metodologías activas centradas en el estudiante.
                            </p>
                            <div class="rounded-2xl bg-blue-50/90 border border-blue-100 p-4 space-y-1.5 text-xs text-blue-950 font-medium">
                              <div class="flex items-center gap-2 font-bold text-blue-900">
                                <mat-icon class="scale-75 text-blue-600">verified</mat-icon>
                                <span>Aspectos Destacados del Programa:</span>
                              </div>
                              <ul class="space-y-1 text-slate-700 pl-6 list-disc">
                                <li>Enfoque práctico con la Regla 60/40 (producción activa del estudiante).</li>
                                <li>No requiere tablets obligatorias; adaptable al mobiliario y recursos del colegio.</li>
                                <li>Modalidades: talleres intensivos presenciales, semi-presenciales y acompañamiento virtual.</li>
                              </ul>
                            </div>
                          </div>
                          <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
                            <button
                              type="button"
                              (click)="openSec('contacto')"
                              class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer"
                            >
                              <span>Solicitar Taller para Docentes</span>
                              <mat-icon class="scale-75">arrow_forward</mat-icon>
                            </button>
                            <button
                              type="button"
                              (click)="openSec('metodologia')"
                              class="text-xs font-bold text-slate-600 hover:text-blue-700 inline-flex items-center gap-1 cursor-pointer"
                            >
                              <span>Ver Metodología</span>
                              <mat-icon class="scale-75">chevron_right</mat-icon>
                            </button>
                          </div>
                        </div>
                      </div>

                      <!-- Servicio 2: Despliegue Técnico y Asesoría en Tablets -->
                      <div class="rounded-3xl border-2 border-slate-200/90 bg-white overflow-hidden shadow-md hover:shadow-2xl hover:border-cyan-500 transition-all duration-300 flex flex-col group">
                        <div class="relative h-64 sm:h-72 overflow-hidden bg-slate-950">
                          <img
                            src="/aula_tablets_venezuela.jpg"
                            alt="Despliegue Técnico y Asesoría de Tablets Educativas"
                            referrerpolicy="no-referrer"
                            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                          <span class="absolute top-4 left-4 bg-cyan-600 text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                            <mat-icon class="scale-75">tablet_mac</mat-icon>
                            <span>Servicio Especializado • Mediación Curricular</span>
                          </span>
                          <div class="absolute bottom-3 left-4 right-4 text-white">
                            <span class="text-xs uppercase font-extrabold text-cyan-300 tracking-wider">Infraestructura Digital Segura</span>
                            <p class="text-lg font-bold leading-tight">Configuración y Protocolos de Aula con Tablets</p>
                          </div>
                        </div>
                        <div class="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-5">
                          <div class="space-y-3">
                            <h4 class="font-black text-slate-900 text-xl sm:text-2xl font-serif group-hover:text-cyan-700 transition-colors">
                              Despliegue Técnico y Asesoría de Tablets
                            </h4>
                            <p class="text-sm text-slate-600 leading-relaxed">
                              Consultoría especializada para instituciones que cuentan con dotación de tablets o planean incorporarlas: arquitectura de red escolar, control parental, bloqueo de distracciones y selección de software curricular activo.
                            </p>
                            <div class="rounded-2xl bg-cyan-50/90 border border-cyan-100 p-4 space-y-1.5 text-xs text-cyan-950 font-medium">
                              <div class="flex items-center gap-2 font-bold text-cyan-900">
                                <mat-icon class="scale-75 text-cyan-600">verified</mat-icon>
                                <span>Garantías de la Consultoría Técnica:</span>
                              </div>
                              <ul class="space-y-1 text-slate-700 pl-6 list-disc">
                                <li>Configuración de perfiles escolares seguros para evitar navegación no autorizada.</li>
                                <li>Protocolos de gestión de aula para que el dispositivo sea herramienta de indagación.</li>
                                <li>Servicio opcional e independiente según la disponibilidad técnica del plantel.</li>
                              </ul>
                            </div>
                          </div>
                          <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
                            <button
                              type="button"
                              (click)="openSec('contacto')"
                              class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer"
                            >
                              <span>Cotizar Despliegue de Tablets</span>
                              <mat-icon class="scale-75">arrow_forward</mat-icon>
                            </button>
                            <button
                              type="button"
                              (click)="openSec('blog')"
                              class="text-xs font-bold text-slate-600 hover:text-cyan-700 inline-flex items-center gap-1 cursor-pointer"
                            >
                              <span>Leer Guía en Blog</span>
                              <mat-icon class="scale-75">chevron_right</mat-icon>
                            </button>
                          </div>
                        </div>
                      </div>

                      <!-- Servicio 3: Laboratorios de Computación & Simuladores STEM -->
                      <div class="rounded-3xl border-2 border-slate-200/90 bg-white overflow-hidden shadow-md hover:shadow-2xl hover:border-teal-500 transition-all duration-300 flex flex-col group">
                        <div class="relative h-64 sm:h-72 overflow-hidden bg-slate-950">
                          <img
                            src="/laboratorio_liceo_pantalla.jpg"
                            alt="Laboratorios de Computación y Simuladores STEM"
                            referrerpolicy="no-referrer"
                            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                          <span class="absolute top-4 left-4 bg-teal-600 text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                            <mat-icon class="scale-75">biotech</mat-icon>
                            <span>Infraestructura Existente • Práctica Activa</span>
                          </span>
                          <div class="absolute bottom-3 left-4 right-4 text-white">
                            <span class="text-xs uppercase font-extrabold text-teal-300 tracking-wider">Aprovechamiento Integral</span>
                            <p class="text-lg font-bold leading-tight">Simulación Científica y Trabajo por Estaciones</p>
                          </div>
                        </div>
                        <div class="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-5">
                          <div class="space-y-3">
                            <h4 class="font-black text-slate-900 text-xl sm:text-2xl font-serif group-hover:text-teal-700 transition-colors">
                              Laboratorios & Simuladores Interactivos
                            </h4>
                            <p class="text-sm text-slate-600 leading-relaxed">
                              Transformación de las salas de computación tradicionales y pantallas interactivas en auténticos centros de indagación científica con simuladores PhET, GeoGebra y retos experimentales guiados.
                            </p>
                            <div class="rounded-2xl bg-teal-50/90 border border-teal-100 p-4 space-y-1.5 text-xs text-teal-950 font-medium">
                              <div class="flex items-center gap-2 font-bold text-teal-900">
                                <mat-icon class="scale-75 text-teal-600">verified</mat-icon>
                                <span>Ventajas Estratégicas:</span>
                              </div>
                              <ul class="space-y-1 text-slate-700 pl-6 list-disc">
                                <li>Revaloriza los equipos de computación existentes en el colegio sin costos adicionales.</li>
                                <li>Guías de laboratorio paso a paso para física, química, matemáticas y biología.</li>
                                <li>Fomenta la colaboración en parejas y la resolución reflexiva de problemas reales.</li>
                              </ul>
                            </div>
                          </div>
                          <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
                            <button
                              type="button"
                              (click)="openSec('metodologia')"
                              class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer"
                            >
                              <span>Ver Metodología de Laboratorio</span>
                              <mat-icon class="scale-75">arrow_forward</mat-icon>
                            </button>
                            <button
                              type="button"
                              (click)="openSec('contacto')"
                              class="text-xs font-bold text-slate-600 hover:text-teal-700 inline-flex items-center gap-1 cursor-pointer"
                            >
                              <span>Solicitar Demostración</span>
                              <mat-icon class="scale-75">chevron_right</mat-icon>
                            </button>
                          </div>
                        </div>
                      </div>

                      <!-- Servicio 4: Diseñador con IA & Aula Virtual LMS -->
                      <div class="rounded-3xl border-2 border-slate-200/90 bg-white overflow-hidden shadow-md hover:shadow-2xl hover:border-amber-500 transition-all duration-300 flex flex-col group">
                        <div class="relative h-64 sm:h-72 overflow-hidden bg-slate-950">
                          <img
                            src="/estudiantes_pantalla_interactiva.jpg"
                            alt="Diseñador con IA y Aula Virtual LMS"
                            referrerpolicy="no-referrer"
                            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                          <span class="absolute top-4 left-4 bg-amber-600 text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                            <mat-icon class="scale-75">smart_toy</mat-icon>
                            <span>Plataforma Digital • Microlearning AIK</span>
                          </span>
                          <div class="absolute bottom-3 left-4 right-4 text-white">
                            <span class="text-xs uppercase font-extrabold text-amber-300 tracking-wider">Potencia de Google Gemini</span>
                            <p class="text-lg font-bold leading-tight">Secuencias Didácticas Inteligentes en Minutos</p>
                          </div>
                        </div>
                        <div class="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-5">
                          <div class="space-y-3">
                            <h4 class="font-black text-slate-900 text-xl sm:text-2xl font-serif group-hover:text-amber-700 transition-colors">
                              Diseñador con IA & Aula Virtual LMS
                            </h4>
                            <p class="text-sm text-slate-600 leading-relaxed">
                              Herramienta tecnológica integrada en la plataforma AIK que permite a los docentes generar automáticamente unidades didácticas modulares (Idea, Ejemplo, Actividad y Quiz) y desplegarlas en el Aula Virtual.
                            </p>
                            <div class="rounded-2xl bg-amber-50/90 border border-amber-100 p-4 space-y-1.5 text-xs text-amber-950 font-medium">
                              <div class="flex items-center gap-2 font-bold text-amber-900">
                                <mat-icon class="scale-75 text-amber-600">verified</mat-icon>
                                <span>Capacidades de la Plataforma:</span>
                              </div>
                              <ul class="space-y-1 text-slate-700 pl-6 list-disc">
                                <li>Generador asistido con prompts pedagógicos alineados al currículo venezolano.</li>
                                <li>Aula virtual con lecciones interactivas, autoevaluación y feedback instantáneo.</li>
                                <li>Ahorro de hasta un 70% en el tiempo docente de preparación de clases.</li>
                              </ul>
                            </div>
                          </div>
                          <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
                            <button
                              type="button"
                              (click)="openSec('disenador')"
                              class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer"
                            >
                              <span>Probar Generador con IA Gratis</span>
                              <mat-icon class="scale-75">arrow_forward</mat-icon>
                            </button>
                            <button
                              type="button"
                              (click)="openSec('aula')"
                              class="text-xs font-bold text-slate-600 hover:text-amber-700 inline-flex items-center gap-1 cursor-pointer"
                            >
                              <span>Ver Aula Virtual</span>
                              <mat-icon class="scale-75">chevron_right</mat-icon>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- CIFRAFLOW MÁS GRANDE CON FONDO BLANCO Y LETRAS NEGRAS -->
                  <div class="pt-6">
                    <div id="cifraflow-modulo" class="max-w-6xl mx-auto rounded-3xl bg-white border-2 border-slate-200 p-8 sm:p-12 lg:p-14 text-slate-900 shadow-2xl relative overflow-hidden">
                      <div class="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-cyan-100/50 blur-3xl"></div>
                      <div class="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-indigo-100/50 blur-3xl"></div>

                      <div class="relative z-10 flex flex-col md:flex-row items-center gap-8 sm:gap-12">
                        <!-- Imagen de Cifraflow: Formato grande y destacado -->
                        <div class="relative w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-3xl sm:rounded-full overflow-hidden border-4 border-cyan-400 shadow-xl shrink-0 bg-slate-50 group">
                          <img
                            src="/cifraflow_educacion_financiera.jpg"
                            alt="Cifraflow - Educación Financiera Gamificada"
                            referrerpolicy="no-referrer"
                            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        <!-- Información Descriptiva de Cifraflow con tipografía negra sobre fondo blanco -->
                        <div class="flex-1 text-center md:text-left space-y-4">
                          <div class="inline-flex items-center gap-2 rounded-full bg-cyan-50 border border-cyan-300 px-4 py-1 text-xs font-black text-cyan-900">
                            <span class="h-2 w-2 rounded-full bg-cyan-600 animate-pulse"></span>
                            <span>Iniciativa Pedagógica Complementaria • AIK Soluciones</span>
                          </div>

                          <h4 class="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 font-serif leading-snug">
                            Cifraflow: Educación Financiera Gamificada y Ciberseguridad
                          </h4>

                          <p class="text-sm sm:text-base lg:text-lg text-slate-900 leading-relaxed font-normal">
                            Programa lúdico de microlearning diseñado para capacitar a la nueva generación en finanzas personales, ahorro inteligente, comprensión del entorno bimonetario (Bolsa BVC y tasa BCV) y prevención rigurosa de fraudes y phishing digital.
                          </p>

                          <div class="flex flex-wrap items-center justify-center md:justify-start gap-2.5 pt-2 text-xs sm:text-sm">
                            <span class="px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold flex items-center gap-1.5 shadow-xs">
                              <mat-icon class="scale-90 text-emerald-700">security</mat-icon>
                              <span>Ciberseguridad (Zero Phishing)</span>
                            </span>
                            <span class="px-3.5 py-1.5 rounded-xl bg-sky-50 border border-sky-300 text-sky-950 font-bold flex items-center gap-1.5 shadow-xs">
                              <mat-icon class="scale-90 text-sky-700">trending_up</mat-icon>
                              <span>Contexto Bimonetario (BVC & BCV)</span>
                            </span>
                            <span class="px-3.5 py-1.5 rounded-xl bg-purple-50 border border-purple-300 text-purple-950 font-bold flex items-center gap-1.5 shadow-xs">
                              <mat-icon class="scale-90 text-purple-700">bolt</mat-icon>
                              <span>Microlearning 3–5 min</span>
                            </span>
                          </div>

                          <div class="pt-4 text-xs sm:text-sm text-slate-800 border-t border-slate-200 flex items-center justify-center md:justify-start gap-2">
                            <mat-icon class="scale-90 text-cyan-600">mail</mat-icon>
                            <span>Contacto institucional del programa: <strong class="text-black font-extrabold">cifraflow2026&#64;gmail.com</strong></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              }

              <!-- 2.2.B Sección: Cifraflow (Direct Access) -->
              @case ('cifraflow') {
                <section id="seccion-cifraflow" class="scroll-mt-32 space-y-6">
                  <div class="text-center max-w-3xl mx-auto mb-4">
                    <span class="text-xs font-black uppercase tracking-wider text-cyan-800 bg-cyan-100 px-4 py-1.5 rounded-full border border-cyan-300">
                      Servicio Especializado de AIK
                    </span>
                  </div>

                  <!-- REPRODUCCIÓN DEL BANNER COMPLETO DE CIFRAFLOW: GRANDE CON FONDO BLANCO Y LETRAS NEGRAS -->
                  <div class="max-w-6xl mx-auto relative rounded-3xl overflow-hidden bg-white border-2 border-slate-200 p-8 sm:p-12 lg:p-14 text-slate-900 shadow-2xl">
                    <div class="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-cyan-100/60 blur-3xl"></div>
                    <div class="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-purple-100/60 blur-3xl"></div>

                    <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                      <!-- Columna Izquierda: Esfera Holográfica Cyber 3D en Tamaño Grande -->
                      <div class="lg:col-span-5 flex flex-col items-center justify-center text-center">
                        <div class="relative group">
                          <div class="absolute -inset-2 rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-pink-500 opacity-60 blur-lg group-hover:opacity-90 transition-opacity"></div>
                          
                          <div class="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[400px] lg:h-[400px] rounded-full overflow-hidden border-4 border-cyan-400 shadow-2xl bg-white flex items-center justify-center">
                            <img
                              src="/cifraflow_educacion_financiera.jpg"
                              alt="Cifraflow - Educación Financiera Gamificada y Ciberseguridad"
                              referrerpolicy="no-referrer"
                              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                          </div>
                        </div>
                      </div>

                      <!-- Columna Derecha con Letras Negras sobre Fondo Blanco -->
                      <div class="lg:col-span-7 space-y-6 text-left">
                        <div class="inline-flex items-center gap-2 rounded-full bg-cyan-50 border border-cyan-300 px-4 py-1 text-xs font-black text-cyan-900">
                          <span class="h-2 w-2 rounded-full bg-cyan-500 animate-pulse"></span>
                          <span>Educación Financiera Gamificada • AIK Soluciones</span>
                        </div>

                        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 font-serif leading-tight">
                          Educación Financiera Gamificada<br class="hidden sm:inline" />
                          <span class="text-black">y Ciberseguridad Integral</span>
                        </h2>

                        <p class="text-sm sm:text-base lg:text-lg text-slate-900 leading-relaxed font-normal">
                          Diseñada bajo metodología <strong class="text-cyan-800 font-bold">Microlearning Espiral</strong> (sesiones dinámicas de 3 a 5 min) para empoderar a la nueva generación a proteger su patrimonio, prevenir fraudes y prosperar en el ecosistema financiero moderno y bimonetario.
                        </p>

                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
                          <div class="rounded-2xl bg-slate-50 border border-slate-200 p-4 flex items-center gap-3 shadow-xs">
                            <div class="h-11 w-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                              <mat-icon>security</mat-icon>
                            </div>
                            <div>
                              <p class="text-xs sm:text-sm font-black text-black leading-tight">Ciberseguridad 100%</p>
                              <p class="text-[11px] text-emerald-700 font-semibold">Zero Phishing</p>
                            </div>
                          </div>

                          <div class="rounded-2xl bg-slate-50 border border-slate-200 p-4 flex items-center gap-3 shadow-xs">
                            <div class="h-11 w-11 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                              <mat-icon>trending_up</mat-icon>
                            </div>
                            <div>
                              <p class="text-xs sm:text-sm font-black text-black leading-tight">Contexto Bimonetario</p>
                              <p class="text-[11px] text-sky-700 font-semibold">Bolsa BVC & BCV</p>
                            </div>
                          </div>

                          <div class="rounded-2xl bg-slate-50 border border-slate-200 p-4 flex items-center gap-3 shadow-xs">
                            <div class="h-11 w-11 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                              <mat-icon>bolt</mat-icon>
                            </div>
                            <div>
                              <p class="text-xs sm:text-sm font-black text-black leading-tight">Microlearning 3–5m</p>
                              <p class="text-[11px] text-purple-700 font-semibold">Pedagogía LXD</p>
                            </div>
                          </div>
                        </div>

                        <div class="flex flex-wrap items-center gap-3 pt-2">
                          <button
                            type="button"
                            (click)="openCifraflowDemo()"
                            class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-xl active:scale-95 transition-all cursor-pointer"
                          >
                            <mat-icon class="scale-90 text-white">auto_awesome</mat-icon>
                            <span>Explorar la Ruta Demo</span>
                            <mat-icon class="scale-75">arrow_forward</mat-icon>
                          </button>

                          <button
                            type="button"
                            (click)="openSec('contacto')"
                            class="inline-flex items-center gap-2 rounded-xl bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-300 hover:border-slate-400 px-5 py-3 text-xs sm:text-sm font-bold shadow-md active:scale-95 transition-all cursor-pointer"
                          >
                            <mat-icon class="scale-90 text-purple-700">account_balance</mat-icon>
                            <span>Alianzas Institucionales / RSE</span>
                            <mat-icon class="scale-75 text-slate-500">chevron_right</mat-icon>
                          </button>
                        </div>

                        <div class="mt-4 flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                          <div class="flex items-center gap-2.5">
                            <span class="h-2.5 w-2.5 rounded-full bg-cyan-600 animate-ping"></span>
                            <span class="text-xs sm:text-sm font-extrabold text-black">Demos en vivo:</span>
                            <div class="hidden sm:flex items-center gap-2">
                              <span class="text-[11px] bg-cyan-100 border border-cyan-300 text-cyan-900 px-2.5 py-0.5 rounded-md font-semibold">Bolsa BVC & Tasa BCV</span>
                              <span class="text-[11px] bg-purple-100 border border-purple-300 text-purple-900 px-2.5 py-0.5 rounded-md font-semibold">Hunter Phishing</span>
                            </div>
                          </div>

                          <button
                            type="button"
                            (click)="openCifraflowDemo()"
                            class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-xs font-bold text-white shadow-xs cursor-pointer active:scale-95 transition-all"
                          >
                            <span>Ver todas</span>
                            <mat-icon class="scale-75">arrow_forward</mat-icon>
                          </button>
                        </div>

                        <div class="pt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs sm:text-sm text-slate-800 border-t border-slate-200">
                          <span class="font-extrabold text-purple-900">Material Oficial:</span>
                          <button
                            type="button"
                            (click)="openCifraflowVideo()"
                            class="text-blue-700 hover:text-blue-900 font-bold underline underline-offset-2 inline-flex items-center gap-1 cursor-pointer"
                          >
                            <span>Banner de Presentación</span>
                            <mat-icon class="scale-75">open_in_new</mat-icon>
                          </button>
                          <span>•</span>
                          <button
                            type="button"
                            (click)="openCifraflowDemo()"
                            class="text-blue-700 hover:text-blue-900 font-bold underline underline-offset-2 inline-flex items-center gap-1 cursor-pointer"
                          >
                            <span>Infografía: 3 Niveles de Participación</span>
                            <mat-icon class="scale-75">open_in_new</mat-icon>
                          </button>
                          <span>•</span>
                          <a
                            href="mailto:cifraflow2026@gmail.com"
                            class="text-slate-800 hover:text-black font-semibold inline-flex items-center gap-1 text-xs"
                          >
                            <mat-icon class="scale-75 text-cyan-600">mail</mat-icon>
                            <span>cifraflow2026&#64;gmail.com</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              }

              <!-- 2.3 Sección: Metodología 60/40 -->
              @case ('metodologia') {
                <div id="seccion-metodologia" class="scroll-mt-32">
                  <app-metodologia></app-metodologia>
                </div>
              }

              <!-- 2.4 Sección: Aula Virtual LMS -->
              @case ('aula') {
                <div id="seccion-aula" class="scroll-mt-32">
                  <app-aula></app-aula>
                </div>
              }

              <!-- 2.5 Sección: Generador con IA -->
              @case ('disenador') {
                <div id="seccion-disenador" class="scroll-mt-32">
                  <app-disenador></app-disenador>
                </div>
              }

              <!-- 2.6 Sección: Contacto Institucional -->
              @case ('contacto') {
                <div id="seccion-contacto" class="scroll-mt-32">
                  <app-contacto></app-contacto>
                </div>
              }

              <!-- 2.7 Sección: Blog Pedagógico -->
              @case ('blog') {
                <div id="seccion-blog" class="scroll-mt-32">
                  <app-blog></app-blog>
                </div>
              }
            }

            <!-- Botón Inferior para Cerrar Sección y Regresar a Solo Portada -->
            <div class="mt-12 text-center pt-8 border-t border-slate-200">
              <button
                type="button"
                (click)="closeSec()"
                class="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-950 via-indigo-900 to-purple-950 hover:from-blue-900 hover:to-purple-900 text-white font-bold text-sm shadow-xl active:scale-95 transition-all cursor-pointer border border-indigo-700/50"
              >
                <mat-icon>arrow_upward</mat-icon>
                <span>Cerrar Sección (Volver a Solo Portada)</span>
              </button>
            </div>
          </div>
        }
      </div>

      <!-- MODAL DE HISTORIA OFICIAL Y VIDEO DE CIFRAFLOW (1:40 MIN) -->
      @if (showCifraflowVideoModal()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div class="relative w-full max-w-3xl rounded-3xl bg-slate-900 border-2 border-cyan-500/50 shadow-2xl p-6 sm:p-8 text-white overflow-hidden">
            <div class="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl"></div>
            
            <!-- Barra Superior del Modal -->
            <div class="flex items-center justify-between pb-4 border-b border-white/10 relative z-10">
              <div class="flex items-center gap-3">
                <div class="h-10 w-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
                  <mat-icon class="scale-90">movie</mat-icon>
                </div>
                <div>
                  <h3 class="text-base sm:text-lg font-black text-white">Historia Oficial Cifraflow</h3>
                  <p class="text-xs text-cyan-300 font-medium">Educación Financiera Gamificada • 1:40 min</p>
                </div>
              </div>

              <button
                type="button"
                (click)="closeCifraflowVideo()"
                class="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Cerrar reproductor"
              >
                <mat-icon>close</mat-icon>
              </button>
            </div>

            <!-- Contenedor Visual de Reproducción Simulada -->
            <div class="my-6 relative rounded-2xl overflow-hidden bg-slate-950 border border-cyan-400/30 aspect-16/9 flex items-center justify-center group">
              <img
                src="/cifraflow_educacion_financiera.jpg"
                alt="Escena Cifraflow"
                class="w-full h-full object-cover opacity-60"
              />

              <!-- Overlay del Reproductor -->
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/40 flex flex-col justify-between p-6">
                <!-- Estado de Reproducción Superior -->
                <div class="flex items-center justify-between">
                  <span class="px-3 py-1 rounded-full bg-cyan-500/30 border border-cyan-400/40 text-xs font-bold text-cyan-200">
                    Capítulo Activo: Microlearning Espiral en Acción
                  </span>
                  <button
                    type="button"
                    (click)="toggleCifraflowAudio()"
                    class="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white border border-white/20 text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <mat-icon class="text-xs scale-90 text-cyan-400">{{ cifraflowAudioPlaying() ? 'volume_up' : 'volume_off' }}</mat-icon>
                    <span>{{ cifraflowAudioPlaying() ? 'Audio Activo' : 'Silencio' }}</span>
                  </button>
                </div>

                <!-- Centro: Contenido de la Historia -->
                <div class="text-center max-w-lg mx-auto space-y-2">
                  <h4 class="text-lg sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-pink-300">
                    «Protegiendo el Patrimonio de la Nueva Generación»
                  </h4>
                  <p class="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    Aprende cómo los estudiantes de secundaria identifican trampas digitales, gestionan compras y ahorros en contexto bimonetario y descubren cómo invertir responsablemente.
                  </p>
                </div>

                <!-- Barra de Progreso Simulada de 1:40 min -->
                <div class="space-y-1.5">
                  <div class="flex items-center justify-between text-[11px] text-cyan-300 font-bold">
                    <span>0:45</span>
                    <span>1:40 min</span>
                  </div>
                  <div class="w-full h-2 rounded-full bg-white/20 overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full w-[45%]"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Acciones del Modal -->
            <div class="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-white/10">
              <a
                href="mailto:cifraflow2026@gmail.com?subject=Solicitud%20de%20Presentación%20Institucional%20Cifraflow"
                class="inline-flex items-center gap-2 text-xs font-bold text-cyan-300 hover:text-white"
              >
                <mat-icon class="scale-75">mail</mat-icon>
                <span>Solicitar video en alta definición a cifraflow2026&#64;gmail.com</span>
              </a>

              <button
                type="button"
                (click)="closeCifraflowVideo(); openCifraflowDemo()"
                class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg cursor-pointer"
              >
                <span>Ir al Simulador Demo</span>
                <mat-icon class="scale-75">arrow_forward</mat-icon>
              </button>
            </div>
          </div>
        </div>
      }

      <!-- MODAL DE LA RUTA DEMO INTERACTIVA CIFRAFLOW -->
      @if (showCifraflowDemoModal()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div class="relative w-full max-w-2xl rounded-3xl bg-slate-900 border-2 border-cyan-500/50 shadow-2xl p-6 sm:p-8 text-white overflow-hidden">
            <div class="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl"></div>

            <!-- Encabezado del Simulador -->
            <div class="flex items-center justify-between pb-4 border-b border-white/10 relative z-10">
              <div class="flex items-center gap-3">
                <div class="h-10 w-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                  <mat-icon class="scale-90">sports_esports</mat-icon>
                </div>
                <div>
                  <h3 class="text-base sm:text-lg font-black text-white">Ruta Demo Gamificada • Cifraflow</h3>
                  <p class="text-xs text-cyan-300 font-medium">Reto {{ cifraflowDemoStep() }} de 3: Microlearning en Acción</p>
                </div>
              </div>

              <button
                type="button"
                (click)="closeCifraflowDemo()"
                class="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Cerrar demo"
              >
                <mat-icon>close</mat-icon>
              </button>
            </div>

            <!-- Contenido según el paso activo -->
            <div class="my-6 relative z-10 space-y-4">
              <!-- PASO 1: Ciberseguridad Zero Phishing -->
              @if (cifraflowDemoStep() === 1) {
                <div class="space-y-4">
                  <div class="rounded-2xl bg-cyan-950/50 border border-cyan-400/30 p-4">
                    <span class="text-xs font-bold text-cyan-300 uppercase tracking-wider block mb-1">Módulo 1: Ciberseguridad Integral</span>
                    <h4 class="text-base sm:text-lg font-black text-white">Detecta el intento de Phishing</h4>
                    <p class="text-xs text-slate-300 mt-1">
                      Un estudiante recibe un mensaje SMS diciendo: <em>«Tu cuenta ha sido bloqueada temporalmente. Ingresa de inmediato a www.banc0-venezueIa-seguro.xyz para verificar tu clave»</em>. ¿Cuál es la acción correcta?
                    </p>
                  </div>

                  <div class="space-y-2">
                    <button
                      type="button"
                      (click)="answerCifraflowQuiz(0, false, '¡Cuidado! Nunca debes hacer clic en enlaces sospechosos ni con dominios no oficiales.')"
                      [class]="cifraflowSelectedQuiz() === 0 ? 'border-red-500 bg-red-950/40 text-red-200' : 'border-white/10 bg-slate-800/80 hover:bg-slate-800'"
                      class="w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-between"
                    >
                      <span>A) Hacer clic rápido para desbloquear la clave antes de que se venza.</span>
                      @if (cifraflowSelectedQuiz() === 0) { <mat-icon class="text-red-400 scale-90">cancel</mat-icon> }
                    </button>

                    <button
                      type="button"
                      (click)="answerCifraflowQuiz(1, true, '¡Excelente! En Cifraflow enseñamos la regla de oro: verificar siempre la URL oficial y reportar intentos de suplantación.')"
                      [class]="cifraflowSelectedQuiz() === 1 ? 'border-emerald-500 bg-emerald-950/40 text-emerald-200' : 'border-white/10 bg-slate-800/80 hover:bg-slate-800'"
                      class="w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-between"
                    >
                      <span>B) Desconfiar de la URL engañosa, no hacer clic y entrar únicamente por la app o portal oficial.</span>
                      @if (cifraflowSelectedQuiz() === 1) { <mat-icon class="text-emerald-400 scale-90">check_circle</mat-icon> }
                    </button>
                  </div>
                </div>
              }

              <!-- PASO 2: Contexto Bimonetario -->
              @if (cifraflowDemoStep() === 2) {
                <div class="space-y-4">
                  <div class="rounded-2xl bg-indigo-950/50 border border-indigo-400/30 p-4">
                    <span class="text-xs font-bold text-indigo-300 uppercase tracking-wider block mb-1">Módulo 2: Contexto Bimonetario & BCV</span>
                    <h4 class="text-base sm:text-lg font-black text-white">Presupuesto Consciente en Bolívares y Divisas</h4>
                    <p class="text-xs text-slate-300 mt-1">
                      Si un producto escolar cuesta 10 USD y la tasa oficial publicada por el BCV es de 45 Bs/USD, pero el comerciante exige calcular a una tasa no autorizada de 60 Bs/USD: ¿Qué criterio financiero protege tus derechos?
                    </p>
                  </div>

                  <div class="space-y-2">
                    <button
                      type="button"
                      (click)="answerCifraflowQuiz(0, true, '¡Correcto! En Cifraflow los estudiantes aprenden el marco normativo de la tasa oficial BCV y la defensa de su presupuesto.')"
                      [class]="cifraflowSelectedQuiz() === 0 ? 'border-emerald-500 bg-emerald-950/40 text-emerald-200' : 'border-white/10 bg-slate-800/80 hover:bg-slate-800'"
                      class="w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-between"
                    >
                      <span>A) La tasa legal y obligatoria de referencia comercial es exclusivamente la tasa oficial del BCV.</span>
                      @if (cifraflowSelectedQuiz() === 0) { <mat-icon class="text-emerald-400 scale-90">check_circle</mat-icon> }
                    </button>

                    <button
                      type="button"
                      (click)="answerCifraflowQuiz(1, false, 'Incorrecto. Ningún comercio puede imponer tasas arbitrarias fuera del marco legal establecido.')"
                      [class]="cifraflowSelectedQuiz() === 1 ? 'border-red-500 bg-red-950/40 text-red-200' : 'border-white/10 bg-slate-800/80 hover:bg-slate-800'"
                      class="w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-between"
                    >
                      <span>B) Aceptar cualquier tasa sin verificar porque el comercio tiene libertad de fijar su propio valor.</span>
                      @if (cifraflowSelectedQuiz() === 1) { <mat-icon class="text-red-400 scale-90">cancel</mat-icon> }
                    </button>
                  </div>
                </div>
              }

              <!-- PASO 3: Ahorro e Inversión Joven -->
              @if (cifraflowDemoStep() === 3) {
                <div class="space-y-4">
                  <div class="rounded-2xl bg-purple-950/50 border border-purple-400/30 p-4">
                    <span class="text-xs font-bold text-purple-300 uppercase tracking-wider block mb-1">Módulo 3: Microlearning LXD & Bolsa BVC</span>
                    <h4 class="text-base sm:text-lg font-black text-white">Inversión y Multiplicación del Ahorro</h4>
                    <p class="text-xs text-slate-300 mt-1">
                      ¿Cuál es el beneficio de destinar una fracción constante de los ingresos al ahorro programado e inversión productiva frente al gasto impulsivo?
                    </p>
                  </div>

                  <div class="space-y-2">
                    <button
                      type="button"
                      (click)="answerCifraflowQuiz(0, true, '¡Extraordinario! Has completado la ruta demo. Cifraflow forma ciudadanos financieramente libres y conscientes.')"
                      [class]="cifraflowSelectedQuiz() === 0 ? 'border-emerald-500 bg-emerald-950/40 text-emerald-200' : 'border-white/10 bg-slate-800/80 hover:bg-slate-800'"
                      class="w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-between"
                    >
                      <span>A) Construye un fondo de emergencia, protege contra la inflación y crea patrimonio a largo plazo mediante interés compuesto.</span>
                      @if (cifraflowSelectedQuiz() === 0) { <mat-icon class="text-emerald-400 scale-90">check_circle</mat-icon> }
                    </button>
                  </div>
                </div>
              }

              <!-- Retroalimentación Dinámica -->
              @if (cifraflowQuizResult()) {
                <div
                  [class]="cifraflowQuizIsCorrect() ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-200' : 'bg-red-950/50 border-red-500/40 text-red-200'"
                  class="p-4 rounded-xl border text-xs leading-relaxed flex items-start gap-2.5 animate-in fade-in duration-200"
                >
                  <mat-icon class="scale-90 shrink-0 mt-0.5">{{ cifraflowQuizIsCorrect() ? 'verified' : 'info' }}</mat-icon>
                  <div>
                    <strong class="block font-bold mb-0.5">{{ cifraflowQuizIsCorrect() ? '¡Respuesta Acertada!' : 'Atención Pedagógica:' }}</strong>
                    <span>{{ cifraflowQuizResult() }}</span>
                  </div>
                </div>
              }
            </div>

            <!-- Pie del Modal con Botón de Avance -->
            <div class="flex items-center justify-between pt-4 border-t border-white/10">
              <span class="text-xs text-slate-400">Paso {{ cifraflowDemoStep() }} de 3</span>

              <button
                type="button"
                [disabled]="cifraflowSelectedQuiz() === null"
                (click)="nextCifraflowStep()"
                class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs shadow-lg cursor-pointer transition-all"
              >
                <span>{{ cifraflowDemoStep() < 3 ? 'Siguiente Reto' : 'Finalizar y Contactar' }}</span>
                <mat-icon class="scale-75">arrow_forward</mat-icon>
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  `,
})
export class Hero implements OnInit, OnDestroy {
  readonly state = inject(CourseState);
  readonly defaultCourse = DEFAULT_AIK_COURSE;

  readonly currentIndex = signal<number>(0);
  readonly isAutoPlay = signal<boolean>(true);
  readonly slideProgress = signal<number>(0);

  private progressTimer: ReturnType<typeof setInterval> | null = null;
  private isHovered = false;

  readonly showcaseList: ShowcaseImage[] = [
    {
      id: 'clase-online-historia',
      src: '/slider_clase_online_historia.jpg',
      tag: 'Lección Digital en Vivo',
      tagColor: 'bg-blue-600',
      serviceCategory: 'Educación Activa • Doble Pantalla & Tablets',
      title: 'Lección Digital Interactiva y Aprendizaje Activo en el Aula',
      subtitle: 'Docentes en vivo guiando lecciones multimedia con pantallas interactivas 3D, mapas históricos digitales y tablets para cada estudiante venezolano.',
      highlights: ['Pantalla Táctil 3D', 'Doble Pantalla & Tablets', 'Docentes en Vivo', 'Participación Proactiva'],
    },
    {
      id: 'seminario-edutech',
      src: '/slider_seminario_edutech.jpg',
      tag: 'Seminario Edutech',
      tagColor: 'bg-indigo-600',
      serviceCategory: 'Herramientas Digitales & IA',
      title: 'Innovación Docente en Vivo con Recursos y Herramientas Digitales',
      subtitle: 'Demostración práctica de herramientas digitales, simuladores interactivos, prototipos de física y tecnologías aplicadas al aula escolar.',
      highlights: ['Pantallas Interactivas', 'Edutech Connect', 'Prototipos STEAM', 'Simuladores y VR'],
    },
    {
      id: 'capacitacion-docente-circulo',
      src: '/slider_capacitacion_circulo.jpg',
      tag: 'Capacitación Docente',
      tagColor: 'bg-emerald-600',
      serviceCategory: 'Servicio Principal AiK',
      title: 'Círculos Pedagógicos de Formación Docente en Innovación Educativa',
      subtitle: 'Mesas de trabajo colaborativo y diálogo formativo con educadores venezolanos bajo la Metodología Activa 60/40.',
      highlights: ['Metodología 60/40', 'Diálogo Pedagógico', 'Docentes Venezolanos', 'Sin Requisito de Tablets'],
    },
    {
      id: 'taller-docentes-venezuela',
      src: '/slider_taller_docentes_venezuela.jpg',
      tag: 'Talleres Prácticos',
      tagColor: 'bg-purple-600',
      serviceCategory: 'Formación y Actualización',
      title: 'Conferencias y Talleres Interactivos para el Magisterio',
      subtitle: 'Facilitación presencial con retroalimentación continua, debate pedagógico y diseño curricular adaptado a la realidad de cada centro.',
      highlights: ['Facilitadores Especializados', 'Interacción Directa', 'Evaluación por Evidencias', 'Adaptabilidad Curricular'],
    },
    {
      id: 'mesa-interactiva-estudiantes',
      src: '/slider_mesa_interactiva_estudiantes.jpg',
      tag: 'Estudiantes Activos',
      tagColor: 'bg-amber-600',
      serviceCategory: 'Ciencias & Colaboración',
      title: 'Aprendizaje Activo en Ciencias con Pantallas Táctiles e Interactivas',
      subtitle: 'Jóvenes de liceo explorando modelos biológicos tridimensionales y resolviendo retos científicos guiados por sus docentes.',
      highlights: ['Mesas Táctiles Interactivas', 'Modelos 3D en Ciencias', 'Investigación en Equipo', 'Guía Docente Acompañada'],
    },
  ];

  readonly activeShowcase = computed(() => {
    const list = this.showcaseList;
    const idx = this.currentIndex();
    return list[idx % list.length];
  });

  ngOnInit(): void {
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  startAutoPlay(): void {
    if (typeof window === 'undefined') return;
    this.stopAutoPlay();
    this.slideProgress.set(0);

    const stepMs = 50;
    const totalMs = 4500;
    let elapsed = 0;

    this.progressTimer = setInterval(() => {
      if (!this.isAutoPlay() || this.isHovered) return;
      elapsed += stepMs;
      this.slideProgress.set(Math.min(100, Math.round((elapsed / totalMs) * 100)));
      if (elapsed >= totalMs) {
        elapsed = 0;
        this.nextSlide();
      }
    }, stepMs);
  }

  stopAutoPlay(): void {
    if (this.progressTimer) {
      clearInterval(this.progressTimer);
      this.progressTimer = null;
    }
  }

  toggleAutoPlay(): void {
    this.isAutoPlay.update((v) => !v);
  }

  onMouseEnter(): void {
    this.isHovered = true;
  }

  onMouseLeave(): void {
    this.isHovered = false;
  }

  selectSlide(index: number): void {
    this.currentIndex.set(index);
    this.slideProgress.set(0);
    this.startAutoPlay();
  }

  nextSlide(): void {
    const next = (this.currentIndex() + 1) % this.showcaseList.length;
    this.currentIndex.set(next);
    this.slideProgress.set(0);
  }

  prevSlide(): void {
    const prev = (this.currentIndex() - 1 + this.showcaseList.length) % this.showcaseList.length;
    this.currentIndex.set(prev);
    this.slideProgress.set(0);
  }

  openSec(sec: string): void {
    this.state.openSection(sec);
  }

  closeSec(): void {
    this.state.closeSection();
  }

  readonly showCifraflowVideoModal = signal<boolean>(false);
  readonly showCifraflowDemoModal = signal<boolean>(false);
  readonly cifraflowAudioPlaying = signal<boolean>(false);
  readonly cifraflowDemoStep = signal<number>(1);
  readonly cifraflowSelectedQuiz = signal<number | null>(null);
  readonly cifraflowQuizResult = signal<string | null>(null);
  readonly cifraflowQuizIsCorrect = signal<boolean | null>(null);

  openCifraflowVideo(): void {
    this.showCifraflowVideoModal.set(true);
    this.cifraflowAudioPlaying.set(true);
  }

  closeCifraflowVideo(): void {
    this.showCifraflowVideoModal.set(false);
    this.cifraflowAudioPlaying.set(false);
  }

  toggleCifraflowAudio(): void {
    this.cifraflowAudioPlaying.update((v) => !v);
  }

  openCifraflowDemo(): void {
    this.showCifraflowDemoModal.set(true);
    this.cifraflowDemoStep.set(1);
    this.cifraflowSelectedQuiz.set(null);
    this.cifraflowQuizResult.set(null);
    this.cifraflowQuizIsCorrect.set(null);
  }

  closeCifraflowDemo(): void {
    this.showCifraflowDemoModal.set(false);
  }

  answerCifraflowQuiz(idx: number, isCorrect: boolean, feedback: string): void {
    this.cifraflowSelectedQuiz.set(idx);
    this.cifraflowQuizIsCorrect.set(isCorrect);
    this.cifraflowQuizResult.set(feedback);
  }

  nextCifraflowStep(): void {
    if (this.cifraflowDemoStep() < 3) {
      this.cifraflowDemoStep.update((s) => s + 1);
      this.cifraflowSelectedQuiz.set(null);
      this.cifraflowQuizResult.set(null);
      this.cifraflowQuizIsCorrect.set(null);
    } else {
      this.closeCifraflowDemo();
      this.openSec('contacto');
    }
  }

  getSectionTitle(sec: string): string {
    switch (sec) {
      case 'objetivo': return 'Nuestro Objetivo (5 Pilares Estratégicos)';
      case 'servicios': return 'Nuestros Servicios Pedagógicos en Escenarios Reales';
      case 'cifraflow': return 'Cifraflow: Educación Financiera Gamificada y Ciberseguridad Integral';
      case 'metodologia': return 'Metodología Activa 60/40 y Progresión Formativa';
      case 'aula': return 'Aula Virtual LMS (Curso Modelo)';
      case 'disenador': return 'Generador de Cursos con IA (Google Gemini)';
      case 'contacto': return 'Contacto Institucional y Solicitud';
      case 'blog': return 'Blog Pedagógico: Tendencias Educativas y Uso de Tablets en el Aula';
      default: return 'Sección Educativa';
    }
  }
}
