// Icons
import { BiBookReader } from "react-icons/bi";
import { CiGlobe } from "react-icons/ci";
import { FaRegClock } from "react-icons/fa6";
import { RiBookShelfLine } from "react-icons/ri";

export default function CourseMaterials() {
  return (
    <section className="mb-17">
      <h2 className="mb-4 text-2xl font-bold">Course Materials</h2>

      <div className="flex flex-col lg:flex-row gap-0 lg:gap-17 xl:gap-45 bg-white rounded-lg shadow-md p-6">
        <table className="w-full border-collapse">
          <tbody>
            <tr className="border-b border-[#dfdfdf]">
              <th
                scope="row"
                className="flex items-center py-3 text-left font-medium text-gray-700"
              >
                <FaRegClock size={18} className="mr-2" />
                Duration:
              </th>
              <td className="py-3 text-right text-gray-600">3 Weeks</td>
            </tr>

            <tr className="border-b border-[#dfdfdf]">
              <th
                scope="row"
                className="flex items-center py-3 text-left font-medium text-gray-700"
              >
                <RiBookShelfLine size={18} className="mr-2" />
                Lessons:
              </th>
              <td className="py-3 text-right text-gray-600">8</td>
            </tr>

            <tr className="border-b border-[#dfdfdf]">
              <th
                scope="row"
                className="flex items-center py-3 text-left font-medium text-gray-700"
              >
                <BiBookReader size={18} className="mr-2" />
                Enrolled:
              </th>
              <td className="py-3 text-right text-gray-600">65 Students</td>
            </tr>

            <tr className="border-b lg:border-0 border-[#dfdfdf]">
              <th
                scope="row"
                className="flex items-center py-3 text-left font-medium text-gray-700"
              >
                <CiGlobe size={18} className="mr-2" />
                Language:
              </th>
              <td className="py-3 text-right text-gray-600">English</td>
            </tr>
          </tbody>
        </table>
        <table className="w-full border-collapse">
          <tbody>
            <tr className="border-b border-[#dfdfdf]">
              <th
                scope="row"
                className="flex items-center py-3 text-left font-medium text-gray-700"
              >
                <FaRegClock size={18} className="mr-2" />
                Instructor:
              </th>
              <td className="py-3 text-right text-gray-600">Edward Norton</td>
            </tr>

            <tr className="border-b border-[#dfdfdf]">
              <th
                scope="row"
                className="flex items-center py-3 text-left font-medium text-gray-700"
              >
                <RiBookShelfLine size={18} className="mr-2" />
                Certificate:
              </th>
              <td className="py-3 text-right text-gray-600">Yes</td>
            </tr>

            <tr className="border-b border-[#dfdfdf]">
              <th
                scope="row"
                className="flex items-center py-3 text-left font-medium text-gray-700"
              >
                <BiBookReader size={18} className="mr-2" />
                Enrolled:
              </th>
              <td className="py-3 text-right text-gray-600">65 Students</td>
            </tr>

            <tr>
              <th
                scope="row"
                className="flex items-center py-3 text-left font-medium text-gray-700"
              >
                <CiGlobe size={18} className="mr-2" />
                Price :
              </th>
              <td className="py-3 text-right text-gray-600">80%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
