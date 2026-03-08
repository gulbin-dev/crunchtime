"use client";
// defining TYPE for UI_Brick parameter
interface Prop {
  value: string | string[];
  style: string;
}
export default function UI_Brick({ value, style }: Prop) {
  if (typeof value === "string") {
    return (
      <p className={`w-fit border py-0.2 px-1 rounded-xl ${style}`}>{value}</p>
    );
  }
  return value.map((text) => (
    <p
      className={`w-fit border py-0.2 px-1 rounded-xl italic ${style}`}
      key={text}
    >
      {text}
    </p>
  ));
}
