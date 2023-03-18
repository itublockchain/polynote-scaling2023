import { ReactNode } from "react";

export const Sidebar = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen bg-sidebarLight dark:bg-sidebarDark w-[90vw] absolute md:w-[320px] lg:relative left-0 top-0">
      {children}
    </div>
  );
};
