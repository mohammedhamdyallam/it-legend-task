"use client";
// React
import { useState } from "react";

// Icons
import { FaArrowRightLong } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";

export default function QuestionSectionModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  // State
  const [question, setQuestion] = useState("");

  // Submit Question
  function submitQuestion(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setQuestion("");
  }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white px-6">
          <button onClick={onClose} className="absolute left-4 top-6 z-10">
            <IoIosArrowBack size={30} />
          </button>

          <div className="w-full max-w-2xl">
            <h1 className="mb-6 text-3xl font-bold">Ask Your Questions Here</h1>

            <form onSubmit={submitQuestion}>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask your question..."
                className="h-52 w-full resize-none rounded-lg p-7 shadow-[0_2px_30px_rgba(107,114,128,0.25)] outline-none"
              />

              <button
                type="submit"
                className="mt-4 flex items-center gap-2 rounded bg-[#41b69d] px-5 py-3 text-white transition-colors hover:bg-[#29b496]"
              >
                Ask Question
                <FaArrowRightLong />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
