"use client";

// React & Next
import { useState } from "react";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Comments() {
  // State
  const [comments, setComments] = useState([
    {
      student: {
        profilePic: "/assets/images/profile-pic1.webp",
        name: "Student Name Gose Here",
      },
      comment:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem facilis tempore reiciendis laboriosam voluptatum dicta expedita aliquam nesciunt vitae eius!",
      date: "Oct 10,2021",
    },
    {
      student: {
        profilePic: "/assets/images/profile-pic2.webp",
        name: "Student Name Gose Here",
      },
      comment:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem facilis tempore reiciendis laboriosam voluptatum dicta expedita aliquam nesciunt vitae eius!",
      date: "Oct 10,2021",
    },
    {
      student: {
        profilePic: "/assets/images/profile-pic3.webp",
        name: "Student Name Gose Here",
      },
      comment:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem facilis tempore reiciendis laboriosam voluptatum dicta expedita aliquam nesciunt vitae eius!",
      date: "Oct 10,2021",
    },
  ]);
  const [newComment, setNewComment] = useState("");

  function addComment(e: React.FormEvent<HTMLFormElement>) {
    // Prevent Devault Form Submission
    e.preventDefault();

    if (newComment) {
      // Create New Comment Object
      const comment = {
        student: {
          profilePic: "/assets/images/profile-pic1.webp",
          name: "Student Name Gose Here",
        },
        comment: newComment,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      };

      // Add Comment to State
      setComments([...comments, comment]);

      // Clear Input
      setNewComment("");
    }
  }

  return (
    <>
      {/* Comments */}
      <div>
        {comments.map((comment, ind) => (
          <div
            key={ind}
            className={`flex gap-4 p-4 mb-4 ${!(ind === 0) && "border-t"} border-[#dfdfdf]`}
          >
            <Image
              src={comment.student.profilePic}
              alt={comment.student.name}
              width={40}
              height={40}
              className="w-22 h-22 rounded-full"
            />
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h3 className="text-[#6c6c6c]">{comment.student.name}</h3>
                <p className="text-sm text-[#808080]">{comment.date}</p>
              </div>
              <p className="text-[#808080]">{comment.comment}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Comment */}
      <form onSubmit={addComment} className="mt-15">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment"
          className="w-full h-50 shadow-[0_2px_30px_rgba(107,114,128,0.25)] p-7 outline-0"
        />
        <button
          className="flex items-center gap-2 bg-[#41b69d] hover:bg-[#29b496] text-white px-5 py-3 rounded mt-2"
          type="submit"
        >
          Add Comment
          <FaArrowRightLong />
        </button>
      </form>
    </>
  );
}
