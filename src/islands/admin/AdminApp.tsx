import { useEffect, useState } from "react";

import AdminLayout from "./AdminLayout";
import Sidebar from "./Sidebar.tsx";

import JsonEditor from "./JsonEditor";

import { getSession } from "../../services/auth.service.ts";
import Login from "./Login.tsx";
import { useContent } from "../../hooks/useContent.ts";

export default function AdminApp() {
  const [authenticated, setAuthenticated] = useState(false);
  const [section, setSection] = useState("hero");

  const { content, loading, saving, saved, lang, setLang, updateContent } =
    useContent();

  useEffect(() => {
    getSession().then(({ data }) => {
      setAuthenticated(!!data.session);
    });
  }, []);
  useEffect(() => {
    console.log(section);
  }, [section]);

  if (!authenticated) {
    return <Login onLogin={() => setAuthenticated(true)} />;
  }
  return (
    <AdminLayout
      sidebar={
        <Sidebar
          sections={Object.keys(content ?? {})}
          selected={section}
          onSelect={setSection}
        />
      }
    >
      <h1 className="mb-4 text-3xl font-bold">{section}</h1>

      {loading ? (
        <div className="p-20">Cargando...</div>
      ) : (
        <JsonEditor
          value={content?.[section]}
          onChange={(value) => {
            updateContent((content) => ({
              ...content,

              [section]: value,
            }));
          }}
        />
      )}
      {saving ?? "Guardando..."}
    </AdminLayout>
  );
}
