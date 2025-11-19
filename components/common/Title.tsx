import { cn } from "@/lib/utils";

const Subtitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("text-lg font-semibold", className)}>{children}</div>
  );
};

const MainTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h2 className={cn("text-3xl font-semibold -mt-1 text-mood-red", className)}>
      {children}
    </h2>
  );
};

const TitleTag = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "text-xs text-mood-red border-mood-red p-1 px-2 rounded-full mb-3 border w-fit",
        className
      )}
    >
      {children}
    </div>
  );
};
export { Subtitle, TitleTag, MainTitle };
