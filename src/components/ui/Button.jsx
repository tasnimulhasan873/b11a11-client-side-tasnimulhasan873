import React from "react";
import clsx from "clsx";

export function Button({ className, ...props }) {
  return (
    <button
      className={clsx(
        "w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-lg font-semibold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-200 ease-in-out transform hover:scale-105",
        className
      )}
      {...props}
    />
  );
}
