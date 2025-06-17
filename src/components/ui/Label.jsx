import * as LabelPrimitive from "@radix-ui/react-label";

export function Label({ className, ...props }) {
  return (
    <LabelPrimitive.Root
      className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}
      {...props}
    />
  );
}
