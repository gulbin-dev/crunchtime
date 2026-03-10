"use client";
import { useEffect, useRef, useState } from "react";

export default function FailedDataDialog({
  error,
}: {
  error: { type: string; status: number; message: string } | Error;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (dialogRef.current) {
      if (isOpen) dialogRef.current.showModal();
      else dialogRef.current.close();
    }
  }, [isOpen]);

  const errorHeading = error instanceof Error;
  return (
    <dialog
      ref={dialogRef}
      className="rounded-lg bg-light text-dark place-self-center p-4"
      closedby="any"
    >
      <h2 className="text-heading-md">
        {!errorHeading && error.type}: {!errorHeading && error.status}
      </h2>
      <p className="text-red-600 mt-3">{error.message}</p>
      <button
        className="bg-cta mt-5 float-right font-bold text-light rounded-md py-1 px-3"
        onClick={() => setIsOpen(false)}
      >
        Try Again
      </button>
    </dialog>
  );
}
