import Link from "next/link";
import { BsLinkedin, BsGithub, BsGlobe } from "react-icons/bs";
export default function AboutPage() {
  return (
    <main className="p-3">
      <h1 className="text-center text-heading-xl mt-5">CrunchTime</h1>
      <p className="mt-5 text-justify">
        This website is for{" "}
        <span className="font-bold">
          <em>demo purposes</em>
        </span>{" "}
        only made by frontend react web developer Joshua Glenn R. Gulbin. This
        website uses{" "}
        <span className="font-bold">
          <em>TMDB</em>
        </span>{" "}
        and the{" "}
        <span className="font-bold">
          <em>TMDB APIs</em>
        </span>{" "}
        but is not endorsed, certified, or otherwise approved by TMDB.
      </p>

      <h2 className="mt-5">Learn more about the developer</h2>

      <ul className="flex gap-2 p-3">
        <li>
          <Link
            href="https://www.linkedin.com/in/joshua-glenn-gulbin/"
            target="_blank"
            aria-label="Navigate to the developer's Linkedin Profile"
          >
            <BsLinkedin className="text-heading-lg" aria-hidden />
          </Link>
        </li>
        <li>
          <Link
            href="https://github.com/gulbin-dev"
            target="_blank"
            aria-label="Navigate to the developer's Github Profile"
          >
            <BsGithub className="text-heading-lg" aria-hidden />
          </Link>
        </li>
        <li>
          <Link
            href=""
            target="_blank"
            aria-label="Navigate to the developer's portfolio website"
          >
            <BsGlobe className="text-heading-lg" aria-hidden />
          </Link>
        </li>
      </ul>
    </main>
  );
}
