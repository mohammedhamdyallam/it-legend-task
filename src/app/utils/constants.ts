// Types
import { Lesson } from "./types";

// Course Road Map Data
export const courseRoadMapData: {
  week: string;
  description: string;
  lessons: Lesson[];
}[] = [
  {
    week: "Week 1 - Week 4",
    description:
      "Advanced story telling techniques for writers: Personas, Characters & Plots",
    lessons: [
      {
        title: "Introduction",
        type: "lesson",
      },
      {
        title: "Course Overview",
        type: "lesson",
      },
      {
        title: "Course Overview",
        type: "exam",
        questionsCount: 10,
        time: 600,
        questions: [
          {
            id: 1,
            question: "What is the primary goal of this React.js course?",
            options: [
              "Learn JavaScript from scratch",
              "Understand React concepts and build real-world applications",
              "Only design user interfaces",
              "Create SQL databases",
            ],
            correctAnswer: 1,
          },
          {
            id: 2,
            question: "Which topic is covered first in this course?",
            options: [
              "React Hooks",
              "State Management",
              "Introduction to React & JSX",
              "API Integration",
            ],
            correctAnswer: 2,
          },
          {
            id: 3,
            question:
              "Why is it important to understand the course structure before starting?",
            options: [
              "To skip unnecessary lessons",
              "To have a clear learning roadmap",
              "To reduce total study time",
              "To install only required software",
            ],
            correctAnswer: 1,
          },
          {
            id: 4,
            question:
              "What is the main difference between 'State' and 'Props' in React?",
            options: [
              "State is immutable, Props are mutable",
              "State is internal and mutable, Props are external and read-only",
              "State is for parent components only, Props are for child components",
              "There is no difference between them",
            ],
            correctAnswer: 1,
          },
          {
            id: 5,
            question: "Which hook is used for side effects in React?",
            options: ["useState", "useEffect", "useContext", "useReducer"],
            correctAnswer: 1,
          },
          {
            id: 6,
            question: "What does the 'virtual DOM' concept in React mean?",
            options: [
              "A copy of the real DOM that React uses for performance optimization",
              "A database for storing React components",
              "A CSS framework similar to Bootstrap",
              "A JavaScript library for animations",
            ],
            correctAnswer: 0,
          },
          {
            id: 7,
            question: "When should you use 'useMemo' in React?",
            options: [
              "To memorize user data",
              "To cache expensive calculations and prevent unnecessary re-renders",
              "To handle API requests",
              "To create new components",
            ],
            correctAnswer: 1,
          },
          {
            id: 8,
            question:
              "What is the purpose of 'React Router' in a React application?",
            options: [
              "To manage application state",
              "To handle navigation between different pages without reloading the page",
              "To style components",
              "To connect to databases",
            ],
            correctAnswer: 1,
          },
          {
            id: 9,
            question:
              "Which state management library is most commonly used with React for complex applications?",
            options: ["React Context", "Redux", "MobX", "All of the above"],
            correctAnswer: 3,
          },
          {
            id: 10,
            question:
              "What is the correct way to handle a form input in React?",
            options: [
              "Use document.getElementById to access input values",
              "Use controlled components with useState",
              "Use jQuery for form handling",
              "Never use forms in React",
            ],
            correctAnswer: 1,
          },
        ],
      },
      {
        title: "Course Exercise / Reference Files",
        type: "lesson",
      },
      {
        title: "Code Editor Installation (Optional if you have one)",
        type: "lesson",
      },
      {
        title: "Embedding PHP in HTML",
        type: "pdf",
        file: "/assets/pdfs/Mohammed_Hamdy_Frontend_Developer_CV.pdf",
      },
    ],
  },
  {
    week: "Week 5 - Week 8",
    description:
      "Advanced story telling techniques for writers: Personas, Characters & Plots",
    lessons: [
      {
        title: "Defining Functions",
        type: "lesson",
      },
      {
        title: "Function Parameters",
        type: "lesson",
      },
      {
        title: "Return Values From Functions",
        type: "exam",
        file: "/assets/pdfs/pdf1.pdf",
        questionsCount: 2,
        time: 900,
        questions: [
          {
            id: 1,
            question: "What is the primary goal of this React.js course?",
            options: [
              "Learn JavaScript from scratch",
              "Understand React concepts and build real-world applications",
              "Only design user interfaces",
              "Create SQL databases",
            ],
            correctAnswer: 1,
          },
          {
            id: 2,
            question: "Which topic is covered first in this course?",
            options: [
              "React Hooks",
              "State Management",
              "Introduction to React & JSX",
              "API Integration",
            ],
            correctAnswer: 2,
          },
          {
            id: 3,
            question:
              "Why is it important to understand the course structure before starting?",
            options: [
              "To skip unnecessary lessons",
              "To have a clear learning roadmap",
              "To reduce total study time",
              "To install only required software",
            ],
            correctAnswer: 1,
          },
          {
            id: 4,
            question:
              "What is the main difference between 'State' and 'Props' in React?",
            options: [
              "State is immutable, Props are mutable",
              "State is internal and mutable, Props are external and read-only",
              "State is for parent components only, Props are for child components",
              "There is no difference between them",
            ],
            correctAnswer: 1,
          },
          {
            id: 5,
            question: "Which hook is used for side effects in React?",
            options: ["useState", "useEffect", "useContext", "useReducer"],
            correctAnswer: 1,
          },
          {
            id: 6,
            question: "What does the 'virtual DOM' concept in React mean?",
            options: [
              "A copy of the real DOM that React uses for performance optimization",
              "A database for storing React components",
              "A CSS framework similar to Bootstrap",
              "A JavaScript library for animations",
            ],
            correctAnswer: 0,
          },
          {
            id: 7,
            question: "When should you use 'useMemo' in React?",
            options: [
              "To memorize user data",
              "To cache expensive calculations and prevent unnecessary re-renders",
              "To handle API requests",
              "To create new components",
            ],
            correctAnswer: 1,
          },
          {
            id: 8,
            question:
              "What is the purpose of 'React Router' in a React application?",
            options: [
              "To manage application state",
              "To handle navigation between different pages without reloading the page",
              "To style components",
              "To connect to databases",
            ],
            correctAnswer: 1,
          },
          {
            id: 9,
            question:
              "Which state management library is most commonly used with React for complex applications?",
            options: ["React Context", "Redux", "MobX", "All of the above"],
            correctAnswer: 3,
          },
          {
            id: 10,
            question:
              "What is the correct way to handle a form input in React?",
            options: [
              "Use document.getElementById to access input values",
              "Use controlled components with useState",
              "Use jQuery for form handling",
              "Never use forms in React",
            ],
            correctAnswer: 1,
          },
        ],
      },
      {
        title: "Global Variable and Scope",
        type: "lesson",
      },
      {
        title: "Newer Way of creating a Constant",
        type: "lesson",
      },
      {
        title: "Constants",
        type: "pdf",
        file: "/assets/pdfs/Mohammed_Hamdy_Frontend_Developer_CV.pdf",
      },
    ],
  },
  {
    week: "Week 9 - Week 12",
    description:
      "Advanced story telling techniques for writers: Personas, Characters & Plots",
    lessons: [
      {
        title: "Defining Functions",
        type: "lesson",
      },
      {
        title: "Function Parameters",
        type: "lesson",
      },
      {
        title: "Return Values From Functions",
        type: "exam",
        file: "/assets/pdfs/pdf1.pdf",
        questionsCount: 10,
        time: 900,
        questions: [
          {
            id: 1,
            question: "What is the primary goal of this React.js course?",
            options: [
              "Learn JavaScript from scratch",
              "Understand React concepts and build real-world applications",
              "Only design user interfaces",
              "Create SQL databases",
            ],
            correctAnswer: 1,
          },
          {
            id: 2,
            question: "Which topic is covered first in this course?",
            options: [
              "React Hooks",
              "State Management",
              "Introduction to React & JSX",
              "API Integration",
            ],
            correctAnswer: 2,
          },
          {
            id: 3,
            question:
              "Why is it important to understand the course structure before starting?",
            options: [
              "To skip unnecessary lessons",
              "To have a clear learning roadmap",
              "To reduce total study time",
              "To install only required software",
            ],
            correctAnswer: 1,
          },
          {
            id: 4,
            question:
              "What is the main difference between 'State' and 'Props' in React?",
            options: [
              "State is immutable, Props are mutable",
              "State is internal and mutable, Props are external and read-only",
              "State is for parent components only, Props are for child components",
              "There is no difference between them",
            ],
            correctAnswer: 1,
          },
          {
            id: 5,
            question: "Which hook is used for side effects in React?",
            options: ["useState", "useEffect", "useContext", "useReducer"],
            correctAnswer: 1,
          },
          {
            id: 6,
            question: "What does the 'virtual DOM' concept in React mean?",
            options: [
              "A copy of the real DOM that React uses for performance optimization",
              "A database for storing React components",
              "A CSS framework similar to Bootstrap",
              "A JavaScript library for animations",
            ],
            correctAnswer: 0,
          },
          {
            id: 7,
            question: "When should you use 'useMemo' in React?",
            options: [
              "To memorize user data",
              "To cache expensive calculations and prevent unnecessary re-renders",
              "To handle API requests",
              "To create new components",
            ],
            correctAnswer: 1,
          },
          {
            id: 8,
            question:
              "What is the purpose of 'React Router' in a React application?",
            options: [
              "To manage application state",
              "To handle navigation between different pages without reloading the page",
              "To style components",
              "To connect to databases",
            ],
            correctAnswer: 1,
          },
          {
            id: 9,
            question:
              "Which state management library is most commonly used with React for complex applications?",
            options: ["React Context", "Redux", "MobX", "All of the above"],
            correctAnswer: 3,
          },
          {
            id: 10,
            question:
              "What is the correct way to handle a form input in React?",
            options: [
              "Use document.getElementById to access input values",
              "Use controlled components with useState",
              "Use jQuery for form handling",
              "Never use forms in React",
            ],
            correctAnswer: 1,
          },
        ],
      },
      {
        title: "Global Variable and Scope",
        type: "lesson",
      },
      {
        title: "Newer Way of creating a Constant",
        type: "lesson",
      },
      {
        title: "Constants",
        type: "pdf",
        file: "/assets/pdfs/Mohammed_Hamdy_Frontend_Developer_CV.pdf",
      },
    ],
  },
];