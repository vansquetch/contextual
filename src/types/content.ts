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
    fields: {
      name: string;
      surname: string;
      email: string;
      message: string;
    };
    cta: string;
  };
  footer: {
    location: string;
    email: string;
    site: string;
  };
};

export type MediaContent = {
  hero: { image: string };
  team: {
    jairo: string;
    enrique: string;
  };
  network: {
    nyu: string;
    peace: string;
    world: string;
  };
};

export type ConfigContent = {
  footer: {
    social: { x: string; instagram: string; youtube: string; linkedin: string };
  };
};
