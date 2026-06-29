import { useState } from "react";
import { login } from "../../services/auth.service";

interface Props {
  onLogin(): void;
}

export default function Login({ onLogin }: Props) {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();

    setLoading(true);

    setError("");

    const { error } = await login(email, password);

    if (error) {
      setError(error.message);

      setLoading(false);

      return;
    }

    onLogin();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl bg-white p-8 shadow"
      >
        <h1 className="mb-8 type-medium">Contextual CMS</h1>

        <input
          className="input-admin mb-4"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="input-admin mb-6"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="mb-4 text-red-600">{error}</p>}

        <button className="button-admin w-full" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
