// Next.js
import Link from "next/link";

// Icons
import { MdKeyboardArrowRight } from "react-icons/md";

// Comps
import CourseRoadMap from "./comps/courseRoadMap";
import Comments from "./comps/comments";
import CoursePlayer from "./comps/CoursePlayer";
import IconsSections from "./comps/iconsSections";
import CourseMaterials from "./comps/courseMaterials";

export default function Home() {
  return (
    <>
      <header className="bg-[#f5f9fa]">
        <div className="container mx-auto px-4 mb-6">
          <nav className="h-16 flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>

            <MdKeyboardArrowRight className="text-gray-400" />

            <Link
              href="/courses"
              className="hover:text-blue-600 transition-colors"
            >
              Courses
            </Link>

            <MdKeyboardArrowRight className="text-gray-400" />

            <span className="font-medium text-gray-900">Course Details</span>
          </nav>

          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Starting SEO as your Home Based Business
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col lg:flex-row container mx-auto px-4">
        <div className="flex-8">
          {/* hero-section */}
          <section>
            {/* Course Video */}
            <CoursePlayer
              videoSrc="/assets/videos/course-video.mp4"
              videoPoster="/assets/images/course-poster.png"
            />

            {/* Course Icons */}
            <IconsSections />
          </section>

          {/* Course Materials */}
          <CourseMaterials />

          {/* Course Road Map */}
          <div className="flex-4 lg:hidden flex flex-col mb-15">
            <CourseRoadMap />
          </div>

          {/* Commments */}
          <section id="comments" className="mb-10">
            <h2 className="mb-4 text-2xl font-bold">Comments</h2>

            {/* Comments */}
            <Comments />
          </section>
        </div>

        {/* Course Road Map */}
        <div className="hidden flex-4 flex-col lg:flex lg:ml-5 xl:ml-15 mb-10">
          <CourseRoadMap />
        </div>
      </main>
    </>
  );
}
