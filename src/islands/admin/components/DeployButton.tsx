import { useDeploy } from "../../../hooks/useDeploy";

export default function DeployButton() {
  const { deploy, deploying } = useDeploy();
  return (
    <button
      onClick={deploy}
      disabled={deploying}
      className="rounded-full bg-primary-500 px-6 py-3 text-white hover:bg-primary-400 disabled:opacity-50"
    >
      {deploying ? "Publicando..." : "🚀 Publicar sitio"}
    </button>
  );
}
