"use client";

// Next
import Image from "next/image";

// Icons
import { IoIosArrowBack } from "react-icons/io";

// Types
import { LeaderBoard } from "../utils/types";
type LeaderBoardModalProps = {
  isOpen: boolean;
  onClose: () => void;
  leaderboard: LeaderBoard;
}

export default function LeaderBoardModal({ isOpen, onClose, leaderboard }: LeaderBoardModalProps) {
  // Constants
  const messages = [
    {
      msg: "عظيم يا صديقي.. أداءك في الكورس ده أفضل من 60% من باقي الطلبة.. كمّل عايز أشوف اسمك في الليدر بورد هنا",
      emoji: "💪",
    },
  ];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 h-screen w-screen overflow-auto bg-white">
          <button onClick={onClose} className="absolute left-4 top-6 z-10">
            <IoIosArrowBack size={30} />
          </button>

          <div className="container mx-auto px-4 py-3">
            {/* Title */}
            <div className="flex flex-col items-center text-[#080264] mb-7">
              <h1>Starting SEO as your Home Based Business</h1>
              <h2 className="text-bold">LeaderBoard</h2>
            </div>

            {/* Message */}
            <div
              className="bg-[#f5f9fa] text-[#080264] flex items-center rounded-md p-5 mb-7"
              dir="rtl"
            >
              <span className="text-7xl">{messages[0].emoji}</span>
              <p className="text-xl">{messages[0].msg}</p>
            </div>

            {/* LeaderBoard */}
            <div className="flex flex-col gap-5 bg-[#f5f9fa] rounded-lg p-7 mb-7">
              {leaderboard.map((student, ind) => {
                return (
                  <div
                    key={ind}
                    className="flex items-center  gap-4 bg-white border border-[#e8e8e8] rounded-md p-4"
                  >
                    <Image
                      src={student.profilePic}
                      alt={student.name}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    {student.name}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
