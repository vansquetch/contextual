/**
 * getContent — data access layer for site copy.
 *
 * Currently reads from the local JSON file.
 * To swap to Supabase: replace the body of getContent() with a
 * supabase.from('content').select('*').eq('lang', lang) call and
 * reshape the response to the same SiteContent shape.
 * The rest of the codebase (components, pages) stays untouched.
 */

import contentData from "./content.json";

export type Lang = "es" | "en";

export type NavContent = {
  what: string;
  solutions: string;
  how: string;
  areas: string;
  team: string;
  network: string;
  contact: string;
  cta: string;
};

export type HeroContent = {
  headline: string;
  body: string;
  body2: string;
  cta: string;
};

export type ServiceItem = {
  id: string;
  title: string;
  body: string;
};

export type HowItem = {
  id: string;
  title: string;
  body: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
};

export type SiteContent = {
  nav: NavContent;
  hero: HeroContent;
  what: { title: string; items: ServiceItem[] };
  solutions: { title: string; items: ServiceItem[] };
  how: { title: string; items: HowItem[] };
  areas: { title: string; items: string[] };
  team: { title: string; members: TeamMember[] };
  network: { title: string; body: string; label: string };
  contact: {
    title: string;
    subtitle: string;
    fields: { name: string; surname: string; email: string; message: string };
    cta: string;
  };
  footer: { location: string; email: string; site: string };
};

/**
 * Returns all site content for the given language.
 * Swap this function body to fetch from Supabase (or any CMS)
 * without changing anything else.
 */
export async function getContent(lang: Lang): Promise<SiteContent> {
  // --- LOCAL JSON (current) ---
  return contentData[lang] as SiteContent;

  // --- SUPABASE (future) ---
  // import { createClient } from '@supabase/supabase-js'
  // const supabase = createClient(import.meta.env.SUPABASE_URL, import.meta.env.SUPABASE_ANON_KEY)
  // const { data, error } = await supabase
  //   .from('site_content')
  //   .select('*')
  //   .eq('lang', lang)
  //   .single()
  // if (error) throw error
  // return data as SiteContent
}
