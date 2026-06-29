import type { Lang, SiteContent } from "../../types/content.ts";
import Topbar from "./Topbar.tsx";

import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  sidebar: ReactNode;
};

export default function AdminLayout({ children, sidebar }: Props) {
  return (
    <div className="flex h-screen bg-secondary-100">
      {sidebar}

      <div className="flex flex-1 flex-col">
        <Topbar />

        <main className="flex-1 overflow-auto p-10">
          <div className="mx-auto max-w-5xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
