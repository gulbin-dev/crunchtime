"use client";

import { redirect } from "next/navigation";

export default function ToggleModal() {
  function handleModalSearch() {
    redirect("/search");
  }
  return (
    <button
      className="bg-white text-dark py-0.5 mx-5 mt-3 rounded-lg tablet:w-40 tablet:mt-6 tablet:ml-15"
      onClick={handleModalSearch}
    >
      Find you want to watch...
    </button>
  );
}
