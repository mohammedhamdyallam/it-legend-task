"use client";

// React
import { useState, useEffect } from "react";

// Framer Motion
import { AnimatePresence, motion } from "motion/react";

// Icons
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlineLock } from "react-icons/md";
import { LiaTimesSolid } from "react-icons/lia";
import { LuPlus } from "react-icons/lu";

// Comps
import ProgressBar from "./progressBar";
import PdfModal from "./pdfModal";
import ExamModal from "./examModal";

// Data
import { courseRoadMapData } from "../utils/constants";

// Types
import { questionsType } from "../utils/types";
import { ExamType } from "../utils/types";

export default function CourseRoadMap() {
  // State
  const [isDesktop, setIsDesktop] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [pdfFile, setPdfFile] = useState("");
  const [isExamOpen, setIsExamOpen] = useState(false);
  const [exam, setExam] = useState<ExamType>({
    questions: [],
    time: 0,
  });
  
  // Effect to check if the screen is desktop size
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");

    const handleChange = () => setIsDesktop(media.matches);

    handleChange();
    media.addEventListener("change", handleChange);

    return () => media.removeEventListener("change", handleChange);
  }, []);

  // Format time
  function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} minutes`;
  }

  // Open PDF
  function openPdf(file: string) {
    setPdfFile(file);
    setIsPdfOpen(true);
  }

  // Close PDF
  function closePdf() {
    setIsPdfOpen(false);
  }

  // Open Exam
  function openExam(questions: questionsType, time: number) {
    setExam({ questions, time });
    setIsExamOpen(true);
  }

  // Close Exam
  function closeExam() {
    setIsExamOpen(false);
  }

  return (
    <>
      <h2 className="text-xl font-bold text-gray-800">
        Topics for This Course
      </h2>

      <ProgressBar progress={63} />

      {courseRoadMapData.map((topic, index) => (
        <div
          key={index}
          className="bg-white border border-gray-300 shadow-md mt-6 overflow-hidden"
        >
          <button
            onClick={() => {
              if (!isDesktop) {
                setOpenIndex(openIndex === index ? null : index);
              }
            }}
            className="flex justify-between items-center w-full p-6 text-left"
          >
            <div>
              <h3 className="font-semibold">{topic.week}</h3>
              <p className="text-gray-500 mt-2">{topic.description}</p>
            </div>
            {!isDesktop && (
              <>
                {openIndex === index ? (
                  <LiaTimesSolid size={30} />
                ) : (
                  <LuPlus size={30} />
                )}
              </>
            )}
          </button>

          <AnimatePresence initial={false}>
            {(isDesktop || openIndex === index) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6">
                  {topic.lessons.map((lesson, lessonInd) => (
                    <div
                      key={lessonInd}
                      onClick={
                        lesson.type === "pdf"
                          ? () => openPdf(lesson.file)
                          : lesson.type === "exam"
                            ? () => openExam(lesson.questions, lesson.time)
                            : undefined
                      }
                      className={`flex items-center justify-between border-b border-gray-300 p-3 transition-all duration-200 hover:bg-gray-50 hover:border-gray-400 hover:shadow-sm cursor-pointer
                        ${lessonInd === 0 ? "border-t" : ""}`}
                    >
                      <span className="flex gap-1.5 items-center text-left font-medium text-gray-700">
                        <IoDocumentTextOutline />
                        {lesson.title}
                      </span>

                      {lesson.type === "exam" ? (
                        <div className="flex gap-2 items-center">
                          <span className="bg-[#f2faf8] text-[#41b69d] text-center rounded p-1 w-30">
                            {lesson.questionsCount} QUESTIONS
                          </span>
                          <span className="bg-[#fdf2f4] text-[#e54c60] text-center rounded p-1 w-30">
                            {formatTime(lesson.time)}
                          </span>
                        </div>
                      ) : (
                        <MdOutlineLock />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}

      {/* Pdf Modal */}
      <PdfModal isOpen={isPdfOpen} onClose={closePdf} file={pdfFile} />

      {/* Exam Modal */}
      <ExamModal isOpen={isExamOpen} onClose={closeExam} exam={exam} />
    </>
  );
}
