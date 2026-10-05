import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import {join} from 'node:path';
import {GoogleGenAI, Type} from '@google/genai';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

// Parse JSON bodies for API routes
app.use(express.json());

const apiKey = process.env['GEMINI_API_KEY'];
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

/**
 * Endpoint to generate a structured pedagogical course using Google Gemini
 */
app.post('/api/generate-course', async (req, res) => {
  const {
    subject,
    gradeLevel,
    teacherProfile,
    studentProfile,
    pedagogicalGoal,
    availableHours,
  } = req.body || {};

  const cleanSubject = (subject || 'Pensamiento Crítico y Ciudadanía Digital en el Aula').trim();
  const cleanGrade = (gradeLevel || '1.° a 5.° año').trim();
  const cleanGoal = (pedagogicalGoal || 'Desarrollar pensamiento crítico y producción activa con tablets e IA bajo el modelo 60/40').trim();
  const cleanHours = (availableHours || '20 horas distribuidas en 4 semanas').trim();
  const cleanTeacher = (teacherProfile || 'Docentes en proceso de actualización tecnológica').trim();
  const cleanStudent = (studentProfile || 'Estudiantes de distintas etapas formativas').trim();

  // If Gemini API is available, call it
  if (ai) {
    try {
      const systemInstruction = `Eres un diseñador curricular y pedagogo experto de "AIK Soluciones Estratégicas", una consultora de transformación digital pedagógica centrada en la "Convergencia Humano-Tecnológica".
Tu misión es diseñar programas de formación docente y secuencias didácticas de alto impacto pedagógico.
Debes respetar estrictamente el enfoque pedagógico de AIK:
1. Formación docente de alto impacto en Inteligencia Artificial y metodologías activas (Modelo 60/40), aplicable a cualquier centro educativo.
2. Modelo 60/40 de Aprendizaje Activo: 40% de tiempo en entrega y guiado docente (provocación, modelado, consigna socrática) y 60% de tiempo en producción y creación estudiantil (laboratorio, debate, prototipado).
3. La integración de tablets es un servicio complementario e independiente para colegios, NO un requisito limitante para la contratación de talleres de formación docente.
3. Pensamiento Computacional, Ciudadanía Digital Ética e Ingeniería de Prompts.
4. Evaluación formativa y sumativa tangible mediante Portafolios Digitales (sustituyendo el examen memorístico tradicional por evidencias reales de competencia).

Genera un curso completo en español con 3 Unidades. Cada unidad debe tener 1 lección estructurada con 4 bloques microlearning diferenciados:
- 'idea': Idea clave y fundamento conceptual.
- 'example': Ejemplo práctico y realista aplicable en el aula con tablets e IA.
- 'activity': Actividad sugerida paso a paso para el docente o estudiantes.
- 'test': Pregunta interactiva de autoevaluación formativa de selección múltiple con 3 opciones (A, B, C), indicando el índice de la respuesta correcta (0, 1 o 2) y una explicación reflexiva.`;

      const prompt = `Diseña un curso curricular completo con la siguiente configuración:
- Asignatura o Tema: "${cleanSubject}"
- Nivel Educativo: "${cleanGrade}"
- Perfil del Docente: "${cleanTeacher}"
- Perfil de los Estudiantes: "${cleanStudent}"
- Objetivo Pedagógico: "${cleanGoal}"
- Duración / Tiempo Disponible: "${cleanHours}"

Responde únicamente con un objeto JSON válido según la estructura requerida.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: {type: Type.STRING},
              description: {type: Type.STRING},
              level: {type: Type.STRING},
              duration: {type: Type.STRING},
              learningObjectives: {
                type: Type.ARRAY,
                items: {type: Type.STRING},
              },
              units: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: {type: Type.STRING},
                    description: {type: Type.STRING},
                    lessons: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          title: {type: Type.STRING},
                          duration: {type: Type.STRING},
                          summary: {type: Type.STRING},
                          blocks: {
                            type: Type.ARRAY,
                            items: {
                              type: Type.OBJECT,
                              properties: {
                                type: {type: Type.STRING},
                                title: {type: Type.STRING},
                                content: {type: Type.STRING},
                                options: {
                                  type: Type.ARRAY,
                                  items: {type: Type.STRING},
                                },
                                correctAnswer: {type: Type.INTEGER},
                                explanation: {type: Type.STRING},
                              },
                              required: ['type', 'content'],
                            },
                          },
                        },
                        required: ['title', 'blocks'],
                      },
                    },
                  },
                  required: ['title', 'lessons'],
                },
              },
              finalEvaluation: {type: Type.STRING},
              projectProposals: {
                type: Type.ARRAY,
                items: {type: Type.STRING},
              },
              sources: {
                type: Type.ARRAY,
                items: {type: Type.STRING},
              },
            },
            required: [
              'title',
              'description',
              'level',
              'duration',
              'learningObjectives',
              'units',
              'finalEvaluation',
              'projectProposals',
              'sources',
            ],
          },
        },
      });

      const text = response.text;
      if (text) {
        const parsed = JSON.parse(text);
        // Normalize IDs and properties
        interface RawBlock {
          type?: string;
          title?: string;
          content: string;
          options?: string[];
          correctAnswer?: number;
          explanation?: string;
        }
        interface RawLesson {
          title: string;
          duration?: string;
          summary?: string;
          blocks?: RawBlock[];
        }
        interface RawUnit {
          title: string;
          description?: string;
          lessons?: RawLesson[];
        }

        const rawUnits = (parsed.units || []) as RawUnit[];
        const normalized = {
          ...parsed,
          id: `aik-course-${Date.now()}`,
          isAiGenerated: true,
          createdAt: new Date().toISOString().split('T')[0],
          metadata: {
            subject: cleanSubject,
            gradeLevel: cleanGrade,
            targetAudience: cleanTeacher,
            pedagogicalGoal: cleanGoal,
          },
          units: rawUnits.map((u: RawUnit, uIdx: number) => ({
            ...u,
            id: `unit-${uIdx + 1}`,
            lessons: (u.lessons || []).map((l: RawLesson, lIdx: number) => ({
              ...l,
              id: `u${uIdx + 1}-l${lIdx + 1}`,
              blocks: (l.blocks || []).map((b: RawBlock) => ({
                ...b,
                type: ['idea', 'example', 'activity', 'test'].includes(b.type || '')
                  ? (b.type as 'idea' | 'example' | 'activity' | 'test')
                  : 'idea',
              })),
            })),
          })),
        };
        return res.json(normalized);
      }
    } catch (err) {
      console.error('Gemini course generation error:', err);
      // Fallback below
    }
  }

  // Pedagogical fallback generator when Gemini API key is absent or in case of error
  const fallbackCourse = {
    id: `aik-course-${Date.now()}`,
    title: `${cleanSubject}: Innovación Pedagógica e IA (${cleanGrade})`,
    description: `Programa pedagógico adaptado por AIK Soluciones Estratégicas para ${cleanGrade}. Diseñado para que docentes y estudiantes pasen del consumo pasivo a la creación activa bajo el modelo 60/40 en el área de ${cleanSubject}.`,
    level: cleanGrade.includes('1.') || cleanGrade.includes('2.') ? 'Inicial / Exploratorio' : 'Intermedio / Avanzado',
    duration: cleanHours,
    learningObjectives: [
      `Articular secuencias didácticas de ${cleanSubject} combinando el uso de tablets y asistentes de IA.`,
      `Implementar la metodología activa 60/40 garantizando mayor tiempo de experimentación y producción estudiantil.`,
      `Enseñar formulación estructurada de preguntas (prompt engineering) y validación crítica de respuestas digitales.`,
      `Construir un portafolio digital de evidencias tangibles de aprendizaje en lugar de pruebas memorísticas.`,
    ],
    units: [
      {
        id: 'unit-1',
        title: `Unidad 1: Fundamentos y Rediseño del Aula en ${cleanSubject}`,
        description: 'Transición hacia el modelo activo 60/40 y adopción guiada de tablets.',
        lessons: [
          {
            id: 'u1-l1',
            title: `Redefiniendo el Aprendizaje en ${cleanSubject} con Tecnología`,
            duration: '45 min',
            summary: `Cómo convertir el aula de ${cleanGrade} en un laboratorio interactivo de aprendizaje guiado.`,
            blocks: [
              {
                type: 'idea',
                title: 'Idea Clave',
                content: `La tecnología en el aula de ${cleanSubject} no busca reemplazar la guía del docente, sino liberar tiempo pedagógico para el debate y la resolución de problemas reales.`,
              },
              {
                type: 'example',
                title: 'Ejemplo Práctico en Aula',
                content: `En vez de una cátedra magistral de 50 minutos sobre ${cleanSubject}, el docente presenta un desafío provocador durante 15 minutos (40%) y los estudiantes usan sus tablets para investigar y prototipar hipótesis durante 30 minutos (60%).`,
              },
              {
                type: 'activity',
                title: 'Actividad Sugerida',
                content: `Identifica un contenido complejo de ${cleanSubject} y diseña un reto inicial que tus alumnos puedan explorar colaborativamente con sus tablets en equipos de tres.`,
              },
              {
                type: 'test',
                title: 'Autoevaluación Formativa',
                content: `En una sesión de 50 minutos bajo el enfoque 60/40 en ${cleanGrade}, ¿cuántos minutos aproximadamente deben destinarse a la producción autónoma o colaborativa de los alumnos?`,
                options: [
                  'A) 10 minutos al final de la clase.',
                  'B) Aproximadamente 30 minutos (60% del tiempo lectivo).',
                  'C) Ninguno, el docente debe explicar todo el período.',
                ],
                correctAnswer: 1,
                explanation: 'El 60% de una hora pedagógica corresponde a 30 minutos dedicados a la experimentación, creación y resolución activa por parte de los alumnos.',
              },
            ],
          },
        ],
      },
      {
        id: 'unit-2',
        title: `Unidad 2: Pensamiento Crítico e IA en ${cleanSubject}`,
        description: 'Ingeniería de prompts, contraste de fuentes y erradicación del corta y pega.',
        lessons: [
          {
            id: 'u2-l1',
            title: `Ingeniería de Prompts y Verificación Crítica de Fuentes`,
            duration: '50 min',
            summary: `Estrategias para que los estudiantes de ${cleanGrade} utilicen la IA como un interlocutor dialéctico.`,
            blocks: [
              {
                type: 'idea',
                title: 'Idea Clave',
                content: `El valor pedagógico de la IA no reside en la respuesta inmediata, sino en la capacidad del estudiante de refinar su consulta y detectar posibles alucinaciones o imprecisiones.`,
              },
              {
                type: 'example',
                title: 'Ejemplo Práctico en Aula',
                content: `Los alumnos solicitan a la IA dos explicaciones contradictorias sobre un problema de ${cleanSubject} y utilizan literatura científica recomendada en su tablet para argumentar cuál tiene mayor rigor.`,
              },
              {
                type: 'activity',
                title: 'Actividad Sugerida',
                content: `Redacta una guía de prompts en tres pasos: Rol del modelo, Contexto específico de ${cleanSubject} y Criterio de verificación obligatoria de fuentes.`,
              },
              {
                type: 'test',
                title: 'Autoevaluación Formativa',
                content: `¿Cuál de las siguientes acciones promueve de manera más efectiva la ciudadanía digital ética en el uso de IA?`,
                options: [
                  'A) Ocultar el uso de herramientas de IA en las tareas escolares.',
                  'B) Citar explícitamente el prompt utilizado, reflexionar sobre los resultados y validar las fuentes con criterio propio.',
                  'C) Aceptar cualquier respuesta de la IA siempre que esté bien redactada.',
                ],
                correctAnswer: 1,
                explanation: 'La transparencia metodológica y el contraste analítico son los pilares de la honestidad académica y la madurez digital en el aula.',
              },
            ],
          },
        ],
      },
      {
        id: 'unit-3',
        title: `Unidad 3: Evaluación por Evidencias y Portafolios Digitales`,
        description: 'Rúbricas de desempeño y consolidación de competencias tangibles.',
        lessons: [
          {
            id: 'u3-l1',
            title: `El Portafolio Digital como Eje de Evaluación Competencial`,
            duration: '50 min',
            summary: `Instrumentos de evaluación que miden el progreso real y la metacognición del estudiante.`,
            blocks: [
              {
                type: 'idea',
                title: 'Idea Clave',
                content: `Evaluar por portafolio digital permite visibilizar el razonamiento, las iteraciones y el aprendizaje derivado del error, superando la memorización efímera.`,
              },
              {
                type: 'example',
                title: 'Ejemplo Práctico en Aula',
                content: `En lugar de un examen escrito de fin de lapso, los estudiantes publican en una web privada escolar su proyecto integrador con grabaciones en tablet, notas de diseño y reflexiones individuales.`,
              },
              {
                type: 'activity',
                title: 'Actividad Sugerida',
                content: `Diseña una escala de valoración con descriptores claros para evaluar el proceso de indagación y la calidad de la evidencia digital presentada en ${cleanSubject}.`,
              },
              {
                type: 'test',
                title: 'Autoevaluación Formativa',
                content: `¿Por qué el portafolio digital es especialmente idóneo para la era de la inteligencia artificial?`,
                options: [
                  'A) Porque evalúa el proceso creativo, la metacognición y el progreso personal, aspectos que una IA no puede falsificar por sí sola.',
                  'B) Porque no requiere tiempo de revisión por parte del profesor.',
                  'C) Porque sustituye la necesidad de que los alumnos aprendan conceptos fundamentales.',
                ],
                correctAnswer: 0,
                explanation: 'La evidencia secuencial del pensamiento, los borradores y las justificaciones orales o escritas certifican la genuina adquisición de competencias.',
              },
            ],
          },
        ],
      },
    ],
    finalEvaluation: `Desarrollo de un proyecto o unidad pedagógica aplicada a ${cleanSubject} en ${cleanGrade}, integrando el uso de tablets, consignas con IA, distribución temporal 60/40 y una rúbrica de portafolio digital.`,
    projectProposals: [
      `Laboratorio de simulación e indagación guiada en ${cleanSubject} con tablets y feedback socrático por IA.`,
      `Campaña escolar interactiva y podcast divulgativo sobre un reto de la comunidad escolar relacionado con ${cleanSubject}.`,
      `Guía interactiva creada por estudiantes para enseñar a otros cursos cómo investigar de forma ética con IA.`,
    ],
    sources: [
      'UNESCO (2023). Orientaciones para el uso de la IA generativa en la educación e investigación.',
      'AIK Soluciones Estratégicas (2026). Marco de Convergencia Humano-Tecnológica.',
      'Resnick, M. (2018). Cultivando la creatividad a través de proyectos y aprendizaje activo.',
    ],
    isAiGenerated: true,
    createdAt: new Date().toISOString().split('T')[0],
    metadata: {
      subject: cleanSubject,
      gradeLevel: cleanGrade,
      targetAudience: cleanTeacher,
      pedagogicalGoal: cleanGoal,
    },
  };

  return res.json(fallbackCourse);
});

/**
 * Endpoint to receive institutional contact inquiries
 */
app.post('/api/contact', (req, res) => {
  const {name, email, gradeLevel, message, institutionType} = req.body || {};
  console.log('Contacto institucional recibido:', {name, email, gradeLevel, message, institutionType});
  return res.json({
    success: true,
    message: 'Tu solicitud ha sido recibida con éxito. Un especialista de AIK Soluciones Estratégicas se pondrá en contacto en breve.',
    referenceId: `AIK-${Date.now().toString().slice(-6)}`,
  });
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);

