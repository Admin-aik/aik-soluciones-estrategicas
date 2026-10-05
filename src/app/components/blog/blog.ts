import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

export interface BlogPost {
  id: string;
  title: string;
  category: 'Tablets en el Aula' | 'Tendencias Educativas & IA' | 'Metodologías Activas' | 'Ciberseguridad Escolar';
  categoryColor: string;
  readTime: string;
  date: string;
  author: string;
  authorRole: string;
  image: string;
  summary: string;
  tags: string[];
  contentParagraphs: string[];
  takeaways: string[];
}

@Component({
  selector: 'app-blog',
  imports: [CommonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative py-6 sm:py-10 max-w-7xl mx-auto">
      <!-- Encabezado de la Sección de Blog -->
      <div class="text-center max-w-3xl mx-auto mb-10">
        <span class="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-indigo-700 shadow-xs">
          <mat-icon class="scale-75 text-indigo-600">article</mat-icon>
          <span>Publicaciones & Divulgación AIK</span>
        </span>
        <h2 class="mt-4 text-3xl sm:text-5xl font-black text-slate-900 font-serif tracking-tight">
          Blog Pedagógico
        </h2>
        <p class="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
          Tendencias educativas, orientaciones para el uso pedagógico de tablets en el aula y reflexiones sobre la convergencia humano-tecnológica.
        </p>
      </div>

      <!-- Filtros por Categoría -->
      <div class="flex flex-wrap items-center justify-center gap-2 mb-10">
        @for (cat of categories; track cat) {
          <button
            type="button"
            (click)="selectCategory(cat)"
            [class]="selectedCategory() === cat ? 'bg-indigo-600 text-white shadow-md scale-102 font-bold' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 font-semibold'"
            class="px-4 py-2 rounded-xl text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-1.5"
          >
            @if (cat === 'Todos') {
              <mat-icon class="scale-75">view_stream</mat-icon>
            } @else if (cat === 'Tablets en el Aula') {
              <mat-icon class="scale-75">tablet_mac</mat-icon>
            } @else if (cat === 'Tendencias Educativas & IA') {
              <mat-icon class="scale-75">psychology</mat-icon>
            } @else if (cat === 'Metodologías Activas') {
              <mat-icon class="scale-75">schema</mat-icon>
            } @else {
              <mat-icon class="scale-75">security</mat-icon>
            }
            <span>{{ cat }}</span>
          </button>
        }
      </div>

      <!-- Cuadrícula de Artículos del Blog -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        @for (post of filteredPosts(); track post.id) {
          <article class="rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-xs hover:shadow-xl hover:border-indigo-400 transition-all duration-300 flex flex-col group">
            <!-- Imagen del Artículo -->
            <div class="relative h-56 overflow-hidden bg-slate-950">
              <img
                [src]="post.image"
                [alt]="post.title"
                referrerpolicy="no-referrer"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

              <!-- Categoría Flotante -->
              <span class="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-extrabold text-white shadow-md" [class]="post.categoryColor">
                {{ post.category }}
              </span>

              <!-- Tiempo de Lectura -->
              <div class="absolute bottom-3 right-4 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[11px] font-bold text-slate-200 flex items-center gap-1">
                <mat-icon class="scale-75 text-amber-400">schedule</mat-icon>
                <span>{{ post.readTime }}</span>
              </div>
            </div>

            <!-- Cuerpo del Artículo -->
            <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div class="flex items-center gap-2 text-xs text-slate-500 mb-2">
                  <span>{{ post.date }}</span>
                  <span>•</span>
                  <span>{{ post.author }}</span>
                </div>

                <h3 class="text-lg sm:text-xl font-black text-slate-900 font-serif leading-snug group-hover:text-indigo-600 transition-colors">
                  {{ post.title }}
                </h3>

                <p class="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {{ post.summary }}
                </p>

                <!-- Tags -->
                <div class="mt-4 flex flex-wrap gap-1.5">
                  @for (tag of post.tags; track tag) {
                    <span class="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-semibold text-slate-600">
                      #{{ tag }}
                    </span>
                  }
                </div>
              </div>

              <!-- Botón para Leer Artículo Completo -->
              <div class="pt-4 border-t border-slate-100">
                <button
                  type="button"
                  (click)="openArticle(post)"
                  class="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-50 group-hover:bg-indigo-50 border border-slate-200 group-hover:border-indigo-200 text-xs sm:text-sm font-bold text-slate-800 group-hover:text-indigo-700 transition-all cursor-pointer"
                >
                  <span>Leer Artículo Completo</span>
                  <mat-icon class="scale-75 group-hover:translate-x-1 transition-transform">arrow_forward</mat-icon>
                </button>
              </div>
            </div>
          </article>
        }
      </div>

      <!-- MODAL DE LECTURA DE ARTÍCULO COMPLETO -->
      @if (activePost(); as post) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
          <div class="relative w-full max-w-3xl max-h-[90vh] rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-10 text-slate-900 overflow-y-auto my-8">
            <!-- Barra Superior del Modal -->
            <div class="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div class="flex items-center gap-2">
                <span class="px-3 py-1 rounded-full text-xs font-bold text-white shadow-xs" [class]="post.categoryColor">
                  {{ post.category }}
                </span>
                <span class="text-xs text-slate-500 font-semibold">{{ post.readTime }} de lectura</span>
              </div>

              <button
                type="button"
                (click)="closeArticle()"
                class="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                title="Cerrar artículo"
              >
                <mat-icon>close</mat-icon>
              </button>
            </div>

            <!-- Cabecera del Artículo -->
            <h1 class="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 font-serif leading-tight">
              {{ post.title }}
            </h1>

            <div class="flex items-center gap-3 my-4 text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <div class="h-9 w-9 rounded-full bg-indigo-600 text-white font-black flex items-center justify-center text-sm shadow-xs">
                AIK
              </div>
              <div>
                <p class="font-bold text-slate-900">{{ post.author }}</p>
                <p class="text-[11px] text-slate-500">{{ post.authorRole }} • Publicado el {{ post.date }}</p>
              </div>
            </div>

            <!-- Imagen Destacada -->
            <div class="relative rounded-2xl overflow-hidden aspect-16/9 my-6 border border-slate-200">
              <img
                [src]="post.image"
                [alt]="post.title"
                class="w-full h-full object-cover"
              />
            </div>

            <!-- Puntos Clave / Takeaways -->
            <div class="my-6 rounded-2xl bg-indigo-50/70 border border-indigo-200 p-5">
              <div class="flex items-center gap-2 text-indigo-900 font-bold text-sm mb-2">
                <mat-icon class="scale-75 text-indigo-600">lightbulb</mat-icon>
                <span>Claves del Artículo para la Práctica Docente</span>
              </div>
              <ul class="space-y-1.5 text-xs sm:text-sm text-indigo-950">
                @for (takeaway of post.takeaways; track takeaway) {
                  <li class="flex items-start gap-2">
                    <mat-icon class="scale-75 text-indigo-600 mt-0.5">check_circle</mat-icon>
                    <span>{{ takeaway }}</span>
                  </li>
                }
              </ul>
            </div>

            <!-- Párrafos del Contenido -->
            <div class="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
              @for (para of post.contentParagraphs; track para) {
                <p>{{ para }}</p>
              }
            </div>

            <!-- Pie del Modal y Consulta -->
            <div class="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div class="text-xs text-slate-500">
                ¿Deseas implementar este enfoque en tu institución educativa?
              </div>

              <div class="flex items-center gap-2">
                <button
                  type="button"
                  (click)="closeArticle()"
                  class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 cursor-pointer"
                >
                  Cerrar Lectura
                </button>
                <a
                  href="mailto:aiksolucionesca@gmail.com?subject=Consulta%20sobre%20artículo:%20{{ post.title }}"
                  class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white shadow-md"
                >
                  <mat-icon class="scale-75">send</mat-icon>
                  <span>Consultar con AIK</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `,
})
export class Blog {
  readonly categories: ('Todos' | 'Tablets en el Aula' | 'Tendencias Educativas & IA' | 'Metodologías Activas' | 'Ciberseguridad Escolar')[] = [
    'Todos',
    'Tablets en el Aula',
    'Tendencias Educativas & IA',
    'Metodologías Activas',
    'Ciberseguridad Escolar',
  ];

  readonly selectedCategory = signal<string>('Todos');
  readonly activePost = signal<BlogPost | null>(null);

  readonly posts: BlogPost[] = [
    {
      id: 'tablets-en-el-aula',
      title: 'El Uso Efectivo de Tablets en el Aula: Claves para una Mediación Curricular Activa',
      category: 'Tablets en el Aula',
      categoryColor: 'bg-cyan-600',
      readTime: '4 min',
      date: '03 de Octubre, 2026',
      author: 'Equipo Pedagógico AIK',
      authorRole: 'Consultoría en Tecnología Educativa',
      image: '/blog_tablets_en_el_aula.jpg',
      summary: 'Cómo pasar del dispositivo como mero visualizador de documentos a una auténtica estación de investigación, diseño colaborativo y experimentación científica.',
      tags: ['Tablets', 'MetodologíaActiva', 'GestiónDeAula', 'Innovación'],
      takeaways: [
        'La tablet no reemplaza al docente; multiplica su capacidad de guía personalizada.',
        'El control de navegación escolar y la selección de apps curriculares evitan la dispersión.',
        'El trabajo en parejas con un solo dispositivo promueve el debate y la argumentación mutua.',
      ],
      contentParagraphs: [
        'La incorporación de tablets en los colegios venezolanos representa una oportunidad sin precedentes cuando está sustentada en una intención pedagógica clara. Con frecuencia se comete el error de adquirir tecnología sin transformar las dinámicas de clase, limitando el dispositivo a un sustituto digital de la fotocopia o el libro de texto tradicional.',
        'En AIK Soluciones Estratégicas promovemos la integración de las tablets bajo el principio de mediación curricular activa: cada minuto frente a la pantalla debe responder a un desafío cognitivo. Esto implica utilizar aplicaciones de simulación científica (como laboratorios PhET), software de cartografía interactiva, procesadores de mapas conceptuales y herramientas de respuesta instantánea.',
        'La gestión técnica del aula es igualmente crítica. Recomendamos la habilitación de perfiles escolares supervisados con aplicaciones educativas preinstaladas y bloqueo de distractores. De esta forma, el docente no se desgasta vigilando pantallas, sino facilitando dinámicas de indagación guiada donde los estudiantes contrastan fuentes de información, validan datos y construyen respuestas fundamentadas.',
        'Como resultado, la tablet se convierte en un catalizador de la curiosidad y la autonomía del estudiante, sentando las bases de una ciudadanía digital responsable desde la educación media.',
      ],
    },
    {
      id: 'tendencias-ia-2026',
      title: 'Tendencias Educativas 2026: Inteligencia Artificial en el Diseño Didáctico Docente',
      category: 'Tendencias Educativas & IA',
      categoryColor: 'bg-indigo-600',
      readTime: '5 min',
      date: '28 de Septiembre, 2026',
      author: 'Prof. Asesor de AIK Soluciones',
      authorRole: 'Especialista en IA Curricular',
      image: '/blog_docente_ia_innovacion.jpg',
      summary: 'De la automatización a la personalización: cómo los educadores venezolanos están integrando prompts pedagógicos y simuladores en sus planificaciones semanales.',
      tags: ['InteligenciaArtificial', 'DocentesDelFuturo', 'Prompts', 'Microlearning'],
      takeaways: [
        'La IA es un co-piloto del docente para generar secuencias didácticas diferenciadas en minutos.',
        'El valor pedagógico no está en la respuesta de la IA, sino en el criterio del profesor para validarla.',
        'La evaluación tradicional memorística debe dar paso a rúbricas de desempeño y evidencias.',
      ],
      contentParagraphs: [
        'El año 2026 marca un punto de inflexión en la adopción de Inteligencia Artificial en las aulas. Ya no se trata de discutir si la IA debe o no entrar a las instituciones educativas, sino de cómo los docentes se apropian de ella para potenciar su labor creadora y reducir la carga administrativa repetitiva.',
        'En nuestros talleres de formación docente demostramos que la ingeniería de prompts orientada a la educación permite estructurar secuencias didácticas completas en minutos: desde disparadores de curiosidad hasta estudios de casos locales venezolanos adaptados a la realidad de cada liceo.',
        'Lejos de deshumanizar la enseñanza, la IA bien orientada libera tiempo valioso para lo insustituible: el contacto humano, la escucha empática, la retroalimentación personalizada y el estímulo al pensamiento crítico de los estudiantes.',
      ],
    },
    {
      id: 'metodologia-60-40',
      title: 'La Regla 60/40: Rompiendo la Brecha entre la Explicación Teórica y la Producción del Alumno',
      category: 'Metodologías Activas',
      categoryColor: 'bg-teal-600',
      readTime: '3 min',
      date: '20 de Septiembre, 2026',
      author: 'Coordinación Académica AIK',
      authorRole: 'Diseño Curricular y Metodologías Activas',
      image: '/estudiantes_latinos_venezuela.jpg',
      summary: 'Por qué 27 minutos de práctica activa por cada 18 minutos de conceptualización transforman radicalmente la retención y el entusiasmo escolar.',
      tags: ['Modelo6040', 'PedagogíaActiva', 'LiceosVenezolanos', 'Compromiso'],
      takeaways: [
        'Las clases magistrales extensas sufren una caída abrupta de atención a partir de los 15 minutos.',
        'El 60% de producción práctica obliga al estudiante a verbalizar, defender y crear con lo aprendido.',
        'La evaluación formativa se produce durante la acción, no al final de una prueba escrita aislada.',
      ],
      contentParagraphs: [
        'Durante décadas, el modelo pedagógico predominante destinó el 90% del tiempo escolar a la exposición unidireccional del profesor, dejando unos pocos minutos finales para ejercicios mecánicos. Diversos estudios de neuroeducación demuestran que este esquema genera fatiga cognitiva y baja retención a largo plazo.',
        'El Modelo 60/40 propuesto por AIK Soluciones invierte esta relación de forma intencional: en una sesión tipo de 45 minutos, los primeros 18 minutos se consagran al anclaje conceptual riguroso y la demostración; los siguientes 27 minutos pertenecen por completo a los estudiantes, quienes resuelven retos en equipo, analizan casos o programan simulaciones.',
        'Este equilibrio garantiza que el aprendizaje sea transferible y memorable, preparando a los jóvenes para los desafíos reales del entorno académico superior y laboral.',
      ],
    },
    {
      id: 'ciberseguridad-jovenes',
      title: 'Ciberseguridad y Hábitos Digitales Seguros para Estudiantes de Secundaria',
      category: 'Ciberseguridad Escolar',
      categoryColor: 'bg-emerald-600',
      readTime: '4 min',
      date: '15 de Septiembre, 2026',
      author: 'Consultor Cifraflow & AIK',
      authorRole: 'Ciberseguridad y Finanzas Educativas',
      image: '/cifraflow_educacion_financiera.jpg',
      summary: 'La importancia de educar en prevención de phishing, custodia de credenciales y pensamiento crítico frente a desinformación digital.',
      tags: ['Ciberseguridad', 'Cifraflow', 'PrevenciónPhishing', 'IdentidadDigital'],
      takeaways: [
        'El eslabón más vulnerable de la seguridad digital no es el software, sino el desconocimiento humano.',
        'Los jóvenes deben aprender a verificar remitentes, enlaces y autenticación multifactor.',
        'La educación financiera y la ciberseguridad van de la mano en el ecosistema digital moderno.',
      ],
      contentParagraphs: [
        'A medida que los jóvenes venezolanos interactúan tempranamente con redes sociales, billeteras digitales y plataformas de comercio electrónico, los riesgos de suplantación de identidad (phishing) e ingeniería social se multiplican de forma alarmante.',
        'En los módulos de Cifraflow y las jornadas de AIK, enseñamos a los estudiantes a reconocer patrones de estafa digital: mensajes de urgencia artificial, enlaces con dominios manipulados y solicitudes indebidas de claves o códigos de verificación SMS.',
        'La formación en ciberseguridad integral no consiste en infundir temor a la tecnología, sino en construir criterios sólidos de autoprotección que acompañen al estudiante durante toda su vida adulta.',
      ],
    },
  ];

  readonly filteredPosts = computed(() => {
    const selected = this.selectedCategory();
    if (selected === 'Todos') return this.posts;
    return this.posts.filter((p) => p.category === selected);
  });

  selectCategory(cat: string): void {
    this.selectedCategory.set(cat);
  }

  openArticle(post: BlogPost): void {
    this.activePost.set(post);
  }

  closeArticle(): void {
    this.activePost.set(null);
  }
}
