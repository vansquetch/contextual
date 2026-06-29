import { useState } from "react";
import { deploySite } from "../services/build.service";

export function useDeploy() {
  const [deploying, setDeploying] = useState(false);

  async function deploy() {
    try {
      setDeploying(true);

      await deploySite();

      alert("🚀 Build iniciado correctamente.");
    } catch (e) {
      console.error(e);

      alert("Ocurrió un error iniciando el build.");
    } finally {
      setDeploying(false);
    }
  }

  return {
    deploy,
    deploying,
  };
}
