import Image from "next/image";
import Link from "next/link";
import w404 from "../assets/error/404.svg";

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center p-4 overflow-hidden z-1">
      <div className="mx-auto w-full max-w-[242px] text-center sm:max-w-[472px]">
        <h1 className="mb-8 font-bold text-gray-800 text-title-md xl:text-title-2xl">
          ERROR
        </h1>

        <Image
          src={w404}
          alt="404"
          
          width={472}
          height={152}
        />
       

        <p className="mt-10 mb-6 text-base text-gray-700 dark:text-gray-400 sm:text-lg">
          We can’t seem to find the page you are looking for!
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3.5 mb-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 cursor-pointer"
        >
          Back to Home Page
        </Link>
      </div>
    </div>
  );
}
