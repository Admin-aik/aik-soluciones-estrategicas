import { Course } from '../models/course.model';

export const DEFAULT_AIK_COURSE: Course = {
  id: 'aik-curso-maestro-2026',
  title: 'Diseñando el Espacio Digital del Mañana: Innovación Pedagógica y Transformación Digital',
  description: 'Programa integral de formación docente diseñado para transformar el aula educativa. Aprenderás a integrar tecnologías digitales e Inteligencia Artificial no como sustitutos, sino como catalizadores del pensamiento crítico, la creatividad y el aprendizaje activo en los estudiantes.',
  level: 'Intermedio',
  duration: '20 horas distribuidas en 4 semanas',
  learningObjectives: [
    'Comprender el rol de la escuela y del docente en la era de la inteligencia artificial bajo el modelo 60/40 de aprendizaje activo.',
    'Diseñar secuencias didácticas apoyadas en tablets e IA para promover el pensamiento computacional, científico y crítico.',
    'Formular consignas efectivas (ingeniería de prompts) y evaluar el uso ético de las herramientas digitales en el aula.',
    'Implementar la evaluación por portafolios digitales para medir el desarrollo de competencias tangibles en el aula.'
  ],
  units: [
    {
      id: 'unit-1',
      title: 'Unidad 1: El Aula en la Era Digital y Nuevas Metodologías',
      description: 'Evolución pedagógica hacia el hub de aprendizaje activo y rediseño de dinámicas en el aula.',
      lessons: [
        {
          id: 'u1-l1',
          title: 'Del Dictado de Contenidos al Hub de Innovación',
          duration: '45 min',
          summary: 'Descubre cómo transformar el aula expositiva tradicional en un espacio donde los estudiantes construyen activamente el conocimiento.',
          blocks: [
            {
              type: 'idea',
              title: 'Idea Clave',
              content: 'En la era de la abundancia informativa, la función principal de la escuela no es transmitir datos, sino enseñar a procesarlos, cuestionarlos y transformarlos en conocimiento útil.'
            },
            {
              type: 'example',
              title: 'Ejemplo Práctico en Aula',
              content: 'Imagina que tu aula deja de ser una sala de conferencias para convertirse en un laboratorio de diseño: en lugar de copiar una biografía del libro de texto, los alumnos usan su tablet para analizar con IA distintas perspectivas históricas sobre un mismo hecho.'
            },
            {
              type: 'activity',
              title: 'Actividad Sugerida para el Docente',
              content: 'Revisa tu planificación de la próxima semana e identifica qué contenidos puedes delegar en la búsqueda digital para dedicar más tiempo presencial al debate y la creación.'
            },
            {
              type: 'test',
              title: 'Autoevaluación Formativa',
              content: '¿Cuál es la distribución recomendada del tiempo de clase en el modelo de aprendizaje activo propuesta para este programa?',
              options: [
                'A) 80% explicación teórica y 20% ejercicios.',
                'B) 40% entrega y guiado docente, y 60% producción y creación estudiantil.',
                'C) 100% trabajo autónomo con tablet.'
              ],
              correctAnswer: 1,
              explanation: 'El modelo 60/40 propuesto por AIK asigna el 40% del tiempo a la provocación y guía docente, reservando el 60% para que los estudiantes creen, debatan y produzcan con sus tablets.'
            }
          ]
        }
      ]
    },
    {
      id: 'unit-2',
      title: 'Unidad 2: Pensamiento Crítico y Fluidez en IA',
      description: 'Ingeniería de prompts, curaduría reflexiva y combate ético al corta y pega superficial.',
      lessons: [
        {
          id: 'u2-l1',
          title: 'Ingeniería de Prompts y Curaduría Ética de la Información',
          duration: '50 min',
          summary: 'Aprende a formular consignas de alto impacto y orientar a tus estudiantes a cuestionar críticamente las salidas de la IA.',
          blocks: [
            {
              type: 'idea',
              title: 'Idea Clave',
              content: 'Una IA es como un espejo del pensamiento: la calidad de sus respuestas depende de la claridad y precisión con la que sepamos formular nuestras preguntas.'
            },
            {
              type: 'example',
              title: 'Ejemplo Práctico en Aula',
              content: 'En lugar de pedir a la IA "hazme un resumen sobre la fotosíntesis", enseñamos al estudiante a pedir: "Actúa como un biólogo y explícame la fotosíntesis mediante una analogía sencilla para un grupo de estudiantes, incluyendo tres preguntas de verificación".'
            },
            {
              type: 'activity',
              title: 'Actividad Sugerida para el Docente',
              content: 'Diseña una plantilla de formulación de preguntas (prompts) adaptada a tu asignatura que tus estudiantes puedan usar durante sus investigaciones.'
            },
            {
              type: 'test',
              title: 'Autoevaluación Formativa',
              content: '¿Qué estrategia pedagógica previene de forma más directa el "copiar y pegar" acrítico cuando los estudiantes investigan con IA?',
              options: [
                'A) Prohibir el uso de IA en toda actividad escolar.',
                'B) Solicitar que analicen, contrasten fuentes y justifiquen la validez de los resultados generados.',
                'C) Reducir la extensión de los trabajos escritos a un solo párrafo.'
              ],
              correctAnswer: 1,
              explanation: 'Exigir contraste de fuentes y justificación analítica convierte a la IA en un objeto de estudio crítico en lugar de un atajo para el plagio pasivo.'
            }
          ]
        }
      ]
    },
    {
      id: 'unit-3',
      title: 'Unidad 3: Evaluación Tangible mediante Portafolios Digitales',
      description: 'Reemplazo del examen memorístico por evidencias de aprendizaje, autorreflexión y competencias prácticas.',
      lessons: [
        {
          id: 'u3-l1',
          title: 'Sustituyendo el Examen Memorístico por Evidencias de Competencia',
          duration: '55 min',
          summary: 'Estructuración de rúbricas y portafolios digitales interactivos almacenados y creados con tablets.',
          blocks: [
            {
              type: 'idea',
              title: 'Idea Clave',
              content: 'El portafolio digital refleja el recorrido de aprendizaje del estudiante, mostrando no solo el resultado final, sino sus reflexiones, correcciones y desarrollo personal.'
            },
            {
              type: 'example',
              title: 'Ejemplo Práctico en Aula',
              content: 'Un alumno de 4.º año presenta en su portafolio un podcast analítico, una simulación virtual de física con sus conclusiones y una reflexión en vídeo sobre sus errores en el proceso.'
            },
            {
              type: 'activity',
              title: 'Actividad Sugerida para el Docente',
              content: 'Define tres criterios clave de una rúbrica de evaluación para valorar un portafolio digital en tu área académica.'
            },
            {
              type: 'test',
              title: 'Autoevaluación Formativa',
              content: '¿Cuál es la ventaja principal del portafolio digital frente al examen memorístico tradicional?',
              options: [
                'A) Es más rápido y automático de calificar sin intervención.',
                'B) Permite evaluar competencias complejas, creatividad y la evolución del estudiante en proyectos reales.',
                'C) Elimina la necesidad de retroalimentación docente continua.'
              ],
              correctAnswer: 1,
              explanation: 'Los portafolios digitales capturan el proceso iterativo, la metacognición y productos reales que demuestran dominio competencial más allá de la memoria a corto plazo.'
            }
          ]
        }
      ]
    }
  ],
  finalEvaluation: 'Diseño de una unidad didáctica innovadora que incorpore metodologías activas, herramientas de IA, enfoque 60/40 y un esquema de evaluación por portafolio digital.',
  projectProposals: [
    'Diseño de un laboratorio virtual interactivo para ciencias usando simuladores y asistencia de IA.',
    'Creación de una revista digital escolar sobre historia y ciudadanía ética generada colaborativamente con tablets.',
    'Desarrollo de una campaña de concientización sobre huella digital y sesgos informativos dirigida a la comunidad educativa.'
  ],
  sources: [
    'UNESCO (2023). Orientaciones para el uso de la IA generativa en la educación e investigación.',
    'Resnick, M. (2018). Cultivando la creatividad a través de proyectos, pasión, pares y juego.',
    'AIK Soluciones Estratégicas (2026). Marco de Transformación Pedagógica: Diseñando el Espacio Digital del Mañana.'
  ],
  createdAt: '2026-10-01',
  isAiGenerated: false,
  metadata: {
    subject: 'Transformación Pedagógica & Tecnología Educativa',
    gradeLevel: 'Educación Integral y Áreas Formativas',
    targetAudience: 'Docentes, Coordinadores y Directivos',
    pedagogicalGoal: 'Transición hacia el modelo activo 60/40 con tablets e IA generativa reflexiva'
  }
};
