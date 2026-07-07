"use client";

// React
import { useState } from "react";

// Comps
import LeaderBoardModal from "./leaderBoardModal";
import QuestionSectionModal from "./questionsSectionModal";

// Icons
import { FaQuestion } from "react-icons/fa6";
import { LiaCommentSolid } from "react-icons/lia";
import { MdOutlineLeaderboard } from "react-icons/md";

// Types
import { LeaderBoard } from "../utils/types";

export default function IconsSections() {
  // State
  const [isLeaderBoardOpen, setIsLeaderBoardOpen] = useState(false);
  const [isQuestionSectionOpen, setIsQuestionSectionOpen] = useState(false);

  // Constants
  const leaderboard: LeaderBoard = [
    {
      profilePic: "/assets/images/profile-pic1.webp",
      name: "Ahmed Ali",
    },
    {
      profilePic: "/assets/images/profile-pic2.webp",
      name: "Sara Mohamed",
    },
    {
      profilePic: "/assets/images/profile-pic3.webp",
      name: "Omar Hassan",
    },
    {
      profilePic: "/assets/images/profile-pic2.webp",
      name: "Mariam Mostafa",
    },
    {
      profilePic: "/assets/images/profile-pic2.webp",
      name: "Youssef Khaled",
    },
    {
      profilePic: "/assets/images/profile-pic3.webp",
      name: "Nour Ahmed",
    },
    {
      profilePic: "/assets/images/profile-pic1.webp",
      name: "Karim Adel",
    },
    {
      profilePic: "/assets/images/profile-pic2.webp",
      name: "Laila Samir",
    },
    {
      profilePic: "/assets/images/profile-pic3.webp",
      name: "Mahmoud Tarek",
    },
    {
      profilePic: "/assets/images/profile-pic3.webp",
      name: "Hana Gamal",
    },
  ];

  // Close LeaderBoard
  function closeLeaderBoard() {
    setIsLeaderBoardOpen(false);
  }

  function closeQuestionSection() {
    setIsQuestionSectionOpen(false);
  }

  return (
    <>
      <div className="flex space-x-4 mt-5 mb-10">
        <a
          href="#comments"
          className="rounded-full border border-[#e7e7e7] p-2.5 text-[#808080] transition-all duration-200 hover:bg-gray-100 hover:text-black hover:border-gray-300"
          aria-label="Comments"
          title="Comments"
        >
          <LiaCommentSolid size={17} />
        </a>
        <button
          onClick={() => {
            setIsQuestionSectionOpen(true);
          }}
          className="rounded-full border border-[#e7e7e7] p-2.5 text-[#808080] transition-all duration-200 hover:bg-gray-100 hover:text-black hover:border-gray-300"
          title="Ask a question"
        >
          <FaQuestion size={17} />
        </button>
        <button
          onClick={() => {
            setIsLeaderBoardOpen(true);
          }}
          className="rounded-full border border-[#e7e7e7] p-2.5 text-[#808080] transition-all duration-200 hover:bg-gray-100 hover:text-black hover:border-gray-300"
          title="LeaderBoard"
        >
          <MdOutlineLeaderboard size={17} />
        </button>
      </div>

      {/* Leaderboard Modal */}
      <LeaderBoardModal
        isOpen={isLeaderBoardOpen}
        onClose={closeLeaderBoard}
        leaderboard={leaderboard}
      />

      {/* Leaderboard Modal */}
      <QuestionSectionModal
        isOpen={isQuestionSectionOpen}
        onClose={closeQuestionSection}
      />
    </>
  );
}
