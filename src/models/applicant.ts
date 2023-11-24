export type ApplicantType = 'BP' | 'PP';
export type QuestionType = 'general' | 'project';
export interface Context {
  question: string;
  answer: string;
  questionType: QuestionType;
  questionId: string;
  projectIndex: number | null;
}
export type ContentType = 'section' | 'topic' | 'subtopic';

export interface Content {
  index: number;
  text: string;
  type: ContentType;
}

export interface Summary {
  index: number;
  title: string;
  topics: string[];
  developed: boolean;
}

export interface Applicant {
  id: string;
  name: string;
  type: ApplicantType;
  fileId: string[];
  context: Context[];
  businessOptions: string[];
  choosenOption: string;
  summary: Summary[];
  content: Content[];
}

export interface ApplicantCreate extends Omit<Applicant, 'id'> {
  id: string | null;
  name: string;
  type: ApplicantType;
  fileId: string[];
  context: Context[];
  businessOptions: string[];
  choosenOption: string;
  summary: Summary[];
  content: Content[];
}
