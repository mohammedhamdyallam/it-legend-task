"use client";

// React
import { useState, useEffect, useMemo } from "react";

// Icons
import { IoIosArrowBack } from "react-icons/io";
import { LuAlarmClock } from "react-icons/lu";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";

// Types
import { ExamType } from "../utils/types";

type ExamModalProps = {
  isOpen: boolean;
  onClose: () => void;
  exam: ExamType;
  examId?: string;
}

type ExamState = {
  answers: (number | null)[];
  currentQuestion: number;
  timeLeft: number;
  isFinished: boolean;
  selectedAnswer: number | null;
}

export default function ExamModal({
  isOpen,
  onClose,
  exam,
  examId,
}: ExamModalProps) {
  const totalQuestions = exam?.questions?.length ?? 0;

  const storageKey = useMemo(() => {
    const key =
      examId ??
      `${exam?.questions?.map((q) => q.id).join(",") ?? ""}-${exam?.time ?? ""}`;
    return `exam-progress:${key}`;
  }, [examId, exam]);

  const [examState, setExamState] = useState<ExamState>(() => {
    const defaultState: ExamState = {
      answers: Array(totalQuestions).fill(null),
      currentQuestion: 0,
      timeLeft: Number(exam?.time) || 0,
      isFinished: false,
      selectedAnswer: null,
    };

    if (typeof window === "undefined") {
      return defaultState;
    }

    try {
      const saved = sessionStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        let restoredAnswers = Array(totalQuestions).fill(null);
        let restoredQuestion = 0;
        let restoredTime = Number(exam?.time) || 0;
        let restoredFinished = false;

        if (Array.isArray(parsed.answers)) restoredAnswers = parsed.answers;
        if (typeof parsed.currentQuestion === "number")
          restoredQuestion = parsed.currentQuestion;
        if (typeof parsed.timeLeft === "number") restoredTime = parsed.timeLeft;
        if (typeof parsed.isFinished === "boolean")
          restoredFinished = parsed.isFinished;

        return {
          answers: restoredAnswers,
          currentQuestion: restoredQuestion,
          timeLeft: restoredTime,
          isFinished: restoredFinished,
          selectedAnswer: restoredAnswers[restoredQuestion] ?? null,
        };
      }
    } catch (e) {
      console.error("Error restoring exam state:", e);
    }

    return defaultState;
  });

  const { answers, currentQuestion, timeLeft, isFinished, selectedAnswer } =
    examState;

  // Timer Effect
  useEffect(() => {
    if (isFinished) return;

    const timer = setInterval(() => {
      setExamState((prev) => {
        if (prev.timeLeft <= 1) {
          clearInterval(timer);
          return { ...prev, timeLeft: 0, isFinished: true };
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isFinished]);

  // Persist progress on every change so it can be restored later
  useEffect(() => {
    sessionStorage.setItem(
      storageKey,
      JSON.stringify({ answers, currentQuestion, timeLeft, isFinished }),
    );
  }, [answers, currentQuestion, timeLeft, isFinished, storageKey]);

  function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  }

  function goToQuestion(index: number) {
    setExamState((prev) => ({
      ...prev,
      currentQuestion: index,
      selectedAnswer: prev.answers[index] ?? null,
    }));
  }

  function selectAnswer(ind: number) {
    setExamState((prev) => {
      const updated = [...prev.answers];
      updated[prev.currentQuestion] = ind;
      return { ...prev, answers: updated, selectedAnswer: ind };
    });
  }

  function submitAnswer() {
    setExamState((prev) => {
      if (prev.currentQuestion + 1 >= totalQuestions) {
        return { ...prev, isFinished: true };
      }
      const nextQuestion = prev.currentQuestion + 1;
      return {
        ...prev,
        currentQuestion: nextQuestion,
        selectedAnswer: prev.answers[nextQuestion] ?? null,
      };
    });
  }

  // Score summary + per-question review for the results screen
  function getResults() {
    let correct = 0;
    let answered = 0;
    let hasCorrectAnswerData = true;

    exam.questions.forEach((q, i) => {
      if (answers[i] !== null) answered += 1;
      if (typeof q.correctAnswer !== "number") {
        hasCorrectAnswerData = false;
        return;
      }
      if (answers[i] === q.correctAnswer) correct += 1;
    });

    return { correct, answered, hasCorrectAnswerData };
  }

  if (!isOpen) return null;

  // Results UI
  if (isFinished) {
    const { correct, answered, hasCorrectAnswerData } = getResults();

    return (
      <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm">
        <div className="h-screen overflow-y-auto bg-gray-100">
          {/* Header */}
          <div className="sticky top-0 z-20 bg-linear-to-b from-[#3f54b4] to-[#5a78fd] shadow-lg">
            <button
              onClick={onClose}
              className="absolute left-5 top-5 h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition"
            >
              <IoIosArrowBack size={24} />
            </button>

            <div className="flex flex-col items-center justify-center px-6 pt-14 pb-8 text-white">
              <h2 className="text-3xl font-bold">Exam Finished</h2>
              <p className="text-white/80 mt-2">Review your answers below</p>

              <div className="mt-6 w-full max-w-md rounded-3xl bg-white p-6 text-center text-[#3f54b4] shadow-xl">
                {hasCorrectAnswerData ? (
                  <>
                    <p className="text-5xl font-extrabold">
                      {correct}/{totalQuestions}
                    </p>
                    <p className="mt-2 text-gray-500">Correct Answers</p>
                  </>
                ) : (
                  <>
                    <p className="text-5xl font-extrabold">
                      {answered}/{totalQuestions}
                    </p>
                    <p className="mt-2 text-gray-500">Questions Answered</p>
                  </>
                )}
              </div>

              {hasCorrectAnswerData && (
                <div className="grid grid-cols-3 gap-3 w-full max-w-md mt-6">
                  <div className="rounded-xl bg-white/15 p-3">
                    <p className="text-2xl font-bold">{correct}</p>
                    <p className="text-sm text-white/80">Correct</p>
                  </div>

                  <div className="rounded-xl bg-white/15 p-3">
                    <p className="text-2xl font-bold">{answered - correct}</p>
                    <p className="text-sm text-white/80">Wrong</p>
                  </div>

                  <div className="rounded-xl bg-white/15 p-3">
                    <p className="text-2xl font-bold">
                      {totalQuestions - answered}
                    </p>
                    <p className="text-sm text-white/80">Skipped</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Questions */}
          <div className="mx-auto flex max-w-4xl flex-col gap-5 px-5 py-8">
            {exam.questions.map((q, i) => {
              const userAnswer = answers[i];
              const hasCorrect = typeof q.correctAnswer === "number";
              const isCorrect = hasCorrect && userAnswer === q.correctAnswer;

              return (
                <div
                  key={q.id ?? i}
                  className="rounded-2xl bg-white p-5 shadow-md border border-gray-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#5a78fd] font-bold text-white">
                      {i + 1}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {q.question}
                        </h3>

                        {hasCorrect &&
                          (isCorrect ? (
                            <IoCheckmarkCircle
                              size={34}
                              className="text-green-500 shrink-0"
                            />
                          ) : (
                            <IoCloseCircle
                              size={34}
                              className="text-red-500 shrink-0"
                            />
                          ))}
                      </div>

                      <div className="mt-5 flex flex-col gap-3">
                        {q.options.map((option, ind) => {
                          const isUserPick = userAnswer === ind;
                          const isRightAnswer =
                            hasCorrect && q.correctAnswer === ind;

                          let style =
                            "bg-gray-50 border-gray-200 text-gray-700";

                          if (isRightAnswer) {
                            style =
                              "bg-green-100 border-green-500 text-green-800";
                          } else if (isUserPick && !isRightAnswer) {
                            style = "bg-red-100 border-red-500 text-red-700";
                          }

                          return (
                            <div
                              key={ind}
                              className={`flex items-center justify-between rounded-xl border-2 px-4 py-3 transition-all ${style}`}
                            >
                              <span className="font-medium">{option}</span>

                              <div className="flex gap-2">
                                {isUserPick && (
                                  <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                                    Your Answer
                                  </span>
                                )}

                                {isRightAnswer && !isUserPick && (
                                  <span className="rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
                                    Correct
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}

                        {userAnswer === null && (
                          <div className="rounded-lg bg-yellow-50 border border-yellow-300 p-3 text-sm text-yellow-700">
                            You didn&#39;t answer this question.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <button
              onClick={onClose}
              className="mt-6 w-full rounded-xl bg-[#4f6cff] py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-[#3d5ef5]"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  const pageStart = Math.floor(currentQuestion / 5) * 5;
  const visibleQuestions = exam.questions.slice(pageStart, pageStart + 5);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative h-screen w-screen overflow-hidden bg-white">
        <button
          onClick={onClose}
          className="absolute left-4 top-6 z-10 text-white"
        >
          <IoIosArrowBack size={30} />
        </button>

        <div className="bg-linear-to-b from-[#3f54b4] to-[#5a78fd] h-full w-full flex flex-col items-center justify-around">
          <div className="flex flex-col items-center w-[90%] p-6">
            <div className="bg-[#fbd500] text-white shadow-[#fbd500] shadow-[0_0_50px_rgba(251,213,0,0.9)] flex justify-between items-center gap-2 rounded-lg px-7 py-2 mb-4">
              <LuAlarmClock size={30} className="text-white" />
              {formatTime(timeLeft)}
            </div>

            <div className="text-white flex items-center gap-2 mb-4">
              {visibleQuestions.map((_, i) => {
                const absoluteIndex = pageStart + i;
                return (
                  <div
                    key={absoluteIndex}
                    onClick={() => goToQuestion(absoluteIndex)}
                    className={`border rounded-full flex justify-center items-center w-15 h-15 p-3 cursor-pointer transition
                    ${
                      currentQuestion === absoluteIndex
                        ? "bg-white text-[#5a78fd] border-white"
                        : "border-white"
                    }`}
                  >
                    {absoluteIndex + 1}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white h-[70%] w-[90%] rounded-2xl p-6">
            <p className="text-lg font-semibold mb-10">
              {exam.questions[currentQuestion]?.id}.{" "}
              {exam.questions[currentQuestion]?.question}
            </p>

            <div className="flex flex-col gap-12">
              {exam.questions[currentQuestion]?.options.map((option, ind) => (
                <div
                  key={ind}
                  onClick={() => selectAnswer(ind)}
                  className={`flex items-center gap-3 rounded-lg cursor-pointer shadow-[0_2px_10px_rgba(107,114,128,0.25)] ${
                    selectedAnswer === ind
                      ? "bg-[#5d7aff] text-white hover:bg-[#5d7aff]"
                      : "bg-white text-black hover:bg-gray-100"
                  }`}
                >
                  <div
                    className={`h-full border-r border-[#ddd] p-5
                      ${selectedAnswer === ind ? "border-white" : "border-[#ddd]"}
                    `}
                  >
                    <div
                      className={`flex items-center justify-center w-4 h-4 rounded border ${
                        selectedAnswer === ind
                          ? "border-white"
                          : "border-[#5d7aff]"
                      }`}
                    >
                      {selectedAnswer === ind && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                      )}
                    </div>
                  </div>

                  <div className="p-4">{option}</div>
                </div>
              ))}
            </div>

            {selectedAnswer !== null && (
              <div className="flex justify-center items-center p-5">
                <button
                  onClick={submitAnswer}
                  className="bg-[#5a78fd] hover:bg-[#5a62ff] text-white px-4 py-3 rounded-md"
                >
                  Submit
                </button>
              </div>
            )}
          </div>

          <div className="bg-white w-5 h-[70%] absolute top-[27%] left-0 rounded-full translate-x-[-10px]"></div>
          <div className="bg-white w-5 h-[70%] absolute top-[27%] right-0 rounded-full translate-x-[10px]"></div>
        </div>
      </div>
    </div>
  );
}