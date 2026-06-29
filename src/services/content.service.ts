import type { Lang, SiteContent } from "../types/content.ts";
import { supabase } from "../lib/supabase";

const TABLE = "site_content";

export async function getContent(lang: Lang): Promise<SiteContent> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("content")
    .eq("lang", lang)
    .single();

  if (error) throw error;
  return data.content as SiteContent;
}

export async function saveContent(lang: Lang, content: SiteContent) {
  const { error } = await supabase
    .from(TABLE)
    .update({
      content,
      updated_at: new Date().toISOString(),
    })
    .eq("lang", lang);

  if (error) throw error;
}
