export type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
};

export type questionsType = Question[];

export type ExamType = {
  questions: questionsType;
  time: number;
};

// LeaderBoard Types
export type LeaderBoard = {
  profilePic: string;
  name: string;
}[];

export type DefaultLesson = {
  title: string;
  type: "lesson";
};

export type PdfLesson = {
  title: string;
  type: "pdf";
  file: string;
};

export type ExamLesson = {
  title: string;
  type: "exam";
  questionsCount: number;
  time: number;
  questions: Question[];
  file?: string;
};

export type Lesson = DefaultLesson | PdfLesson | ExamLesson;