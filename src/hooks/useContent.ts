import { useEffect, useState } from "react";
import type { Lang, MediaContent, SiteContent } from "../types/content";
import {
  getContent,
  getContentMedia,
  saveContent,
} from "../services/content.service";
import { useDebounce } from "./useDebounce";

export function useContent() {
  const [lang, setLang] = useState<Lang>("es");
  const [content, setContent] = useState<SiteContent | null>(null);
  const [contentMedia, setContentMedia] = useState<MediaContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(true);
  const [section, setSection] = useState("hero");

  useEffect(() => {
    async function load() {
      setLoading(true);
      const json = await getContent(lang);
      const media = await getContentMedia();
      setContentMedia(media);
      setContent(json);
      setLoading(false);
      setSaved(true);
    }
    load();
  }, [lang]);

  const debouncedContent = useDebounce(content, 1200);

  useEffect(() => {
    if (!debouncedContent) return;
    if (loading) return;
    async function save() {
      setSaving(true);
      await saveContent(lang, debouncedContent as SiteContent);
      setSaving(false);
      setSaved(true);
    }
    save();
  }, [debouncedContent]);

  function updateContent(updater: (content: SiteContent) => SiteContent) {
    setSaved(false);
    setContent((old) => {
      if (!old) return old;
      return updater(old);
    });
  }

  return {
    content,
    contentMedia,
    loading,
    saving,
    saved,
    lang,
    section,
    updateContent,
    setLang,
    setSection,
  };
}
