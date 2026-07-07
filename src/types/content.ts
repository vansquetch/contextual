export type Lang = "es" | "en";

export type LocalizedText = {
  es: string;
  en: string;
};
export type Localized<T> = T extends LocalizedText
  ? string
  : T extends Array<infer U>
    ? Localized<U>[]
    : T extends object
      ? { [K in keyof T]: Localized<T[K]> }
      : T;

export type ImageField = {
  type: "image";
  content: string;
};

export type NavContent = {
  what: LocalizedText;
  solutions: LocalizedText;
  how: LocalizedText;
  areas: LocalizedText;
  team: LocalizedText;
  network: LocalizedText;
  contact: LocalizedText;
  cta: LocalizedText;
};

export type HeroContent = {
  headline: LocalizedText;
  body: LocalizedText;
  body2: LocalizedText;
  cta: LocalizedText;
};

export type ServiceItem = {
  id: string;
  title: LocalizedText;
  body: LocalizedText;
};

export type HowItem = {
  id: string;
  title: LocalizedText;
  body: LocalizedText;
};

export type TeamMember = {
  id: string;
  name: LocalizedText;
  role: LocalizedText;
  bio: LocalizedText;
  photo: ImageField;
};

export type NetworkItem = {
  id: string;
  title: LocalizedText;
  image: ImageField;
};

export type SiteContent = {
  nav: NavContent;
  hero: HeroContent;
  what: { title: LocalizedText; items: ServiceItem[] };
  solutions: { title: LocalizedText; items: ServiceItem[] };
  how: { title: LocalizedText; items: HowItem[] };
  areas: { title: LocalizedText; items: LocalizedText[] };
  team: {
    title: LocalizedText;
    principal: TeamMember[];
    members: TeamMember[];
  };
  network: {
    title: LocalizedText;
    body: LocalizedText;
    label: LocalizedText;
    items: NetworkItem[];
  };
  contact: {
    title: LocalizedText;
    subtitle: LocalizedText;
    fields: {
      name: LocalizedText;
      surname: LocalizedText;
      email: LocalizedText;
      message: LocalizedText;
    };
    cta: LocalizedText;
  };
  footer: {
    location: LocalizedText;
    email: string; // dato de contacto: igual en ambos idiomas
    site: string; // dominio: igual en ambos idiomas
  };
};

export type ConfigContent = {
  footer: {
    social: {
      x: string;
      instagram: string;
      youtube: string;
      linkedin: string;
    };
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
