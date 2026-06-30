import type { ReactNode } from "react";
import { logout } from "../../services/auth.service";
import DeployButton from "./components/DeployButton";

export default function Topbar({ action }: { action: ReactNode }) {
  return (
    <header className="flex items-center justify-between border-b border-secondary-300 bg-white px-10 py-6">
      <div>
        <h2 className="type-medium hidden sm:block">
          Administrador de contenido
        </h2>
      </div>
      <div className="flex gap-2 items-center">
        {action}

        <DeployButton />
        <button
          className="w-10 h-10 flex justify-center items-center hover:bg-gray-100 border border-gray-500 text-gray-700 rounded-full color-ink text-sm aspect-square"
          onClick={async () => {
            await logout();

            location.reload();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M6 2h9a2 2 0 0 1 2 2v2h-2V4H6v16h9v-2h2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2"
            />
            <path
              fill="currentColor"
              d="M16.09 15.59L17.5 17l5-5l-5-5l-1.41 1.41L18.67 11H9v2h9.67z"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
