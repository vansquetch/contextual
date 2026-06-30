import Topbar from "./Topbar.tsx";

import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  sidebar: ReactNode;
  topBarAction?: ReactNode;
};

export default function AdminLayout({
  children,
  sidebar,
  topBarAction,
}: Props) {
  return (
    <div className="flex h-screen bg-secondary-100">
      {sidebar}

      <div className="flex flex-1 flex-col">
        <Topbar action={topBarAction} />

        <main className="flex-1 overflow-auto p-2 ">
          <div className="mx-auto max-w-5xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
