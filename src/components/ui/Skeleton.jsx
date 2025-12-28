export default function Skeleton({
  className = "",
  variant = "default",
  ...props
}) {
  const baseClasses = "bg-gray-200 animate-pulse";

  const variants = {
    default: "h-4 rounded-lg",
    text: "h-4 rounded-lg",
    "text-sm": "h-3 rounded-lg",
    "text-lg": "h-5 rounded-lg",
    "text-xl": "h-6 rounded-lg",
    title: "h-6 mb-2 rounded-lg",
    button: "h-8 w-16 rounded-lg",
    avatar: "rounded-full",
    image: "w-full h-full",
    line: "h-4 mb-2 rounded-lg",
  };

  const variantClass = variants[variant] || variants.default;

  return (
    <div className={`${baseClasses} ${variantClass} ${className}`} {...props} />
  );
}
