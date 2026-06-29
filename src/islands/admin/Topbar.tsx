import { logout } from "../../services/auth.service";
import DeployButton from "./components/DeployButton";

export default function Topbar() {
  return (
    <header className="flex items-center justify-between border-b border-secondary-300 bg-white px-10 py-6">
      <div>
        <h2 className="type-medium">Administrador de contenido</h2>
      </div>
      <div className="flex gap-2">
        <button
          onClick={async () => {
            await logout();

            location.reload();
          }}
        >
          Cerrar sesión
        </button>
        <DeployButton />
      </div>
    </header>
  );
}
