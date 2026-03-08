import Link from "next/link";
import { BsLinkedin, BsGithub, BsGlobe } from "react-icons/bs";
export default function Footer() {
  return (
    <footer className="bg-dark-50 text-light px-3 py-4 place-self-center w-full max-w-180">
      <h2 className="text-heading-lg">CrunchTime</h2>
      <p className="mt-1">
        A{" "}
        <span className="font-bold">
          <em>demo website</em>
        </span>{" "}
        made by a frontend React web developer Joshua Glenn R. Gulbin.
      </p>

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
      <p>&copy; 2026 CrunchTime. All Rights Reserved</p>
    </footer>
  );
}
