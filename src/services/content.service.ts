import type {
  ConfigContent,
  Lang,
  MediaContent,
  SiteContent,
} from "../types/content.ts";
import { supabase } from "../lib/supabase";

const TABLE = "site_content";

export async function getContent(lang: Lang): Promise<SiteContent> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("content")
    .eq("type", "static")
    .eq("lang", lang)
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

export async function saveContent(lang: Lang, content: SiteContent) {
  const { error } = await supabase
    .from(TABLE)
    .update({
      content,
      updated_at: new Date().toISOString(),
    })
    .eq("lang", lang)
    .eq("type", "static");

  if (error) throw error;
}
