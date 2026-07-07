import type {
  ConfigContent,
  Lang,
  Localized,
  LocalizedText,
  MediaContent,
  SiteContent,
} from "../types/content.ts";
import { supabase } from "../lib/supabase";

const TABLE = "site_content";
export async function getContent(): Promise<SiteContent> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("content")
    .eq("type", "static")
    .single();

  if (error) throw error;
  return data.content as SiteContent;
}

export async function getContentConfig(): Promise<ConfigContent> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("content")
    .eq("type", "config")
    .single();

  if (error) throw error;
  return data.content as ConfigContent;
}

export async function getContentMedia(): Promise<MediaContent> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("content")
    .eq("type", "media")
    .single();

  if (error) throw error;
  return data.content as MediaContent;
}

export async function saveContentConfig(contentConfig: ConfigContent) {
  const { error } = await supabase
    .from(TABLE)
    .update({
      content: contentConfig,
      updated_at: new Date().toISOString(),
    })
    .eq("type", "config");

  if (error) throw error;
}

function isLocalizedText(value: unknown): value is LocalizedText {
  return (
    typeof value === "object" &&
    value !== null &&
    "es" in value &&
    "en" in value
  );
}

export function localizeContent<T>(content: T, lang: Lang): Localized<T> {
  if (Array.isArray(content)) {
    return content.map((item) => localizeContent(item, lang)) as Localized<T>;
  }

  if (isLocalizedText(content)) {
    return content[lang] as Localized<T>;
  }

  if (content && typeof content === "object") {
    const result: Record<string, unknown> = {};

    for (const key in content) {
      result[key] = localizeContent(
        (content as Record<string, unknown>)[key],
        lang,
      );
    }

    return result as Localized<T>;
  }

  return content as Localized<T>;
}

export async function saveContent(content: SiteContent) {
  const { error } = await supabase
    .from(TABLE)
    .update({
      content,
      updated_at: new Date().toISOString(),
    })
    .eq("type", "static");

  if (error) throw error;
}
