import { cn } from "@/utils/cn";
import { useCallback, useEffect } from "react";

export const BentoGridTemplate = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
      id="cards"
      onMouseEnter={() => (document.getElementById("cards") as HTMLDivElement).classList.add("focus")}
      onMouseLeave={() => (document.getElementById("cards") as HTMLDivElement).classList.remove("focus")}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento p-[2px] hover:shadow-xl transition duration-200 justify-between card flex flex-col space-y-4 shadow-input dark:shadow-none dark:bg-black dark:border-transparent bg-white border-transparent",
        className
      )}
    >
      <div className="justify-between p-4 card-content !bg-black flex flex-col space-y-4">
        <div className="before" />
        {header}
        <div className="group-hover/bento:translate-x-2 transition justify-between flex flex-col duration-200">
          {icon}
          <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
            {title}
          </div>
          <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
            {description}
          </div>
        </div>
        <div className="after" />
      </div>
    </div>
  );
};
