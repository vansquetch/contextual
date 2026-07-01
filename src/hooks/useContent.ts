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
  const [section, setSection] = useState("hero");

  useEffect(() => {
    async function load() {
      setLoading(true);
      const json = await getContent(lang);
      const media = await getContentMedia();
      const config = await getContentConfig();
      setContentMedia(media);
      setContentConfig(config);
      setContent(json);
      setLoading(false);
      setSaved(true);
    }
    load();
  }, [lang]);

  const debouncedContent = useDebounce(content, 1200);
  const debouncedContentConfig = useDebounce(contentConfig, 1200);

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

  useEffect(() => {
    if (!debouncedContentConfig) return;
    if (loading) return;
    async function save() {
      setSaving(true);
      console.log("saving:" + debouncedContentConfig);
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
