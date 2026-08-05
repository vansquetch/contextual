import { useEffect, useState } from "react";
import type {
  ConfigContent,
  Lang,
  MediaContent,
  SiteContent,
} from "../types/content";
import {
  getContent,
  getContentConfig,
  getContentMedia,
  saveContent,
  saveContentConfig,
} from "../services/content.service";
import { useDebounce } from "./useDebounce";
import {
  defaultConfigContent,
  defaultSiteContent,
} from "../lib/content/templates";
import { reorderKeys } from "../utils/reorderKeys";

export function useContent() {
  const [lang, setLang] = useState<Lang>("es");
  const [content, setContent] = useState<SiteContent | null>(null);
  const [contentConfig, setContentConfig] = useState<ConfigContent | null>(
    null,
  );
  const [contentMedia, setContentMedia] = useState<MediaContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(true);
  const [section, setSection] = useState("nav");

  // El contenido ya no está partido por idioma, así que se carga una sola vez.
  useEffect(() => {
    async function load() {
      setLoading(true);
      const [json, media, config] = await Promise.all([
        getContent(),
        getContentMedia(),
        getContentConfig(),
      ]);
      setContent(reorderKeys(json, defaultSiteContent));
      setContentMedia(media);
      setContentConfig(reorderKeys(config, defaultConfigContent));
      setLoading(false);
      setSaved(true);
    }
    load();
  }, []);

  const debouncedContent = useDebounce(content, 1200);
  const debouncedContentConfig = useDebounce(contentConfig, 1200);

  useEffect(() => {
    if (!debouncedContent) return;
    if (loading) return;
    async function save() {
      setSaving(true);
      await saveContent(debouncedContent as SiteContent);
      setSaving(false);
      setSaved(true);
    }
    save();
  }, [debouncedContent]);

  useEffect(() => {
    if (!debouncedContentConfig) return;
    if (loading) return;
    async function save() {
      setSaving(true);
      await saveContentConfig(debouncedContentConfig as ConfigContent);
      setSaving(false);
      setSaved(true);
    }
    save();
  }, [debouncedContentConfig]);

  function updateContent(updater: (content: SiteContent) => SiteContent) {
    setSaved(false);
    setContent((old) => {
      if (!old) return old;
      return updater(old);
    });
  }
  function updateContentConfig(
    updater: (content: ConfigContent) => ConfigContent,
  ) {
    setSaved(false);
    setContentConfig((old) => {
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
    contentConfig,
    updateContent,
    updateContentConfig,
    setLang,
    setSection,
  };
}
