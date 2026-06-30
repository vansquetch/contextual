import type { MediaContent, SiteContent } from "../../types/content.ts";

import AdminLayout from "./AdminLayout";
import Sidebar from "./Sidebar.tsx";
import JsonEditor from "./JsonEditor";
import Login from "./Login.tsx";

import { useContent } from "../../hooks/useContent.ts";
import { useAuth } from "../../hooks/useAuth.ts";
import MediaEditor from "./MediaEditor.tsx";

export default function AdminApp() {
  const {
    content,
    contentMedia,
    loading,
    saving,
    lang,
    setLang,
    updateContent,
    section,
    setSection,
  } = useContent();
  const { authenticated, setAuthenticated } = useAuth();

  if (!authenticated) {
    return <Login onLogin={() => setAuthenticated(true)} />;
  }
  return (
    <AdminLayout
      topBarAction={
        <button
          className="rounded-full border aspect-square flex justify-center items-center hover:bg-gray-100 bg-gray-200 text-gray-900 text-sm w-10 h-10"
          onClick={() => setLang(lang == "es" ? "en" : "es")}
        >
          {lang == "es" ? "en" : "es"}
        </button>
      }
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
        <>
          {saving ?? (
            <span className="text-sm text-ink-muted rounded-full bg-gray-100 p-2">
              guardando...
            </span>
          )}
          {/* {contentMedia?.[section as keyof MediaContent] ?? (
            <MediaEditor
              onChange={() => ""}
              value={contentMedia?.[section as keyof MediaContent]}
            />
          )} */}

          <JsonEditor
            value={content?.[section as keyof SiteContent]}
            onChange={(value) => {
              updateContent((content) => ({
                ...content,

                [section]: value,
              }));
            }}
          />
        </>
      )}
    </AdminLayout>
  );
}
