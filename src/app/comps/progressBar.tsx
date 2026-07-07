"use client";

// React
import { useRef } from "react";

// Framer Motion
import { useInView, motion } from "motion/react";

// Icons
import { TiArrowSortedDown } from "react-icons/ti";

export default function ProgressBar({ progress }: { progress: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  return (
    <div ref={ref}>
      {/* Progress bar */}
      <div className="flex justify-end w-[67%]">
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center">
            <div className="text-[#485293] border-3 border-gray-300 p-1.5 rounded-full">
              You
            </div>
            <TiArrowSortedDown className="text-gray-300" />
          </div>
        </div>
      </div>

      <div className="bg-gray-300 h-1.5 rounded-full mt-2 overflow-hidden">
        <motion.div
          className="bg-[#6abd8a] h-1.5 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: isInView ? `${progress}%` : 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </div>

      <div className="flex justify-end w-[67%] text-[#485293]">{progress}%</div>
    </div>
  );
}
