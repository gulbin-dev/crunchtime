"use client";

export default function CatalogSectionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      className="mt-2 tablet:mt-8"
      aria-labelledby="header-section-title"
    >
      {children}
    </section>
  );
}
