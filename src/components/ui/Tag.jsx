export default function Tag({ text, size = "normal" }) {
  const sizeClass = size === "large" ? "tag-large" : "tag";
  return <span className={sizeClass}>{text}</span>;
}
