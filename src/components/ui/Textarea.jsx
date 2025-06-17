import React from "react";
import clsx from "clsx";

export const textareaClass = "w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-600 transition duration-150 ease-in-out";

export function Textarea({ className, ...props }) {
  return <textarea className={clsx(textareaClass, className)} {...props} />;
}
