export type BlockType = 'idea' | 'example' | 'activity' | 'test';

export interface LessonBlock {
  type: BlockType;
  title?: string;
  content: string;
  options?: string[];
  correctAnswer?: number;
  explanation?: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration?: string;
  summary?: string;
  blocks: LessonBlock[];
}

export interface CourseUnit {
  id: string;
  title: string;
  description?: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  learningObjectives: string[];
  units: CourseUnit[];
  finalEvaluation: string;
  projectProposals: string[];
  sources: string[];
  createdAt?: string;
  isAiGenerated?: boolean;
  metadata?: {
    subject?: string;
    gradeLevel?: string;
    targetAudience?: string;
    pedagogicalGoal?: string;
  };
}

export interface CourseGenerationRequest {
  subject: string;
  gradeLevel: string;
  teacherProfile?: string;
  studentProfile?: string;
  pedagogicalGoal?: string;
  availableHours?: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  gradeLevel: string;
  message: string;
  createdAt: string;
}
