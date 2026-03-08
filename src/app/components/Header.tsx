"use client";
import { useState, useEffect, useRef } from "react";
import Navigations from "./Navigations";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Header() {
  const pathname = usePathname();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const buttonEl = buttonRef.current;
    if (
      isMobileNavOpen &&
      buttonEl?.getAttribute("aria-expanded") === "false"
    ) {
      document.body.style.overflow = "hidden";
      buttonEl?.setAttribute("aria-expanded", "true");
    }

    return () => {
      document.body.style.overflow = "auto";
      buttonEl?.setAttribute("aria-expanded", "false");
    };
  }, [isMobileNavOpen]);

  return (
    <>
      <header className="max-w-[768px] w-full h-10 items-center flex justify-between px-2 place-self-center">
        <Link href="/" className="text-heading-lg mx-0! font-bold">
          CrunchTime
        </Link>
        <button
          ref={buttonRef}
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          className="flex flex-col gap-1 p-0.5 tablet:hidden"
          aria-label="menu button"
          aria-expanded="false"
          aria-controls="mobile-menu"
        >
          <span className="hamburger-icon" aria-hidden="true"></span>
          <span className="hamburger-icon" aria-hidden="true"></span>
          <span className="hamburger-icon" aria-hidden="true"></span>
        </button>

        <nav className="hidden text-heading-md tablet:block">
          <ul className="flex gap-3">
            <li>
              <Link
                href="/"
                aria-current={pathname === "/" ? "page" : undefined}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                aria-current={pathname === "/about" ? "page" : undefined}
              >
                About
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      {isMobileNavOpen && (
        <div
          id="mobile-menu"
          className="bg-primary-color-darker w-full h-screen relative top-0 left-0 z-10 py-5"
        >
          <Navigations
            navStyle="flex flex-col gap-2 items-end pr-3"
            anchorStyle="text-heading-lg text-cta"
            updateState={setIsMobileNavOpen}
            currentPath={pathname}
          />
        </div>
      )}
    </>
  );
}
