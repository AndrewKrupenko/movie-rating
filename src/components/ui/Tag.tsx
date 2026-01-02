type TagProps = {
  text: string;
  size?: "normal" | "large";
};

export default function Tag({ text, size = "normal" }: TagProps) {
  const sizeClass = size === "large" ? "tag-large" : "tag";
  return <span className={sizeClass}>{text}</span>;
}
