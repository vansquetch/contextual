// content/templates.ts
import type { SiteContent, ConfigContent } from "../../types/content";

export const defaultSiteContent: SiteContent = {
  nav: {
    what: { es: "", en: "" },
    solutions: { es: "", en: "" },
    how: { es: "", en: "" },
    areas: { es: "", en: "" },
    team: { es: "", en: "" },
    network: { es: "", en: "" },
    contact: { es: "", en: "" },
    cta: { es: "", en: "" },
  },
  hero: {
    headline: { es: "", en: "" },
    body: { es: "", en: "" },
    body2: { es: "", en: "" },
    cta: { es: "", en: "" },
  },
  what: {
    title: { es: "", en: "" },
    items: [{ id: "", title: { es: "", en: "" }, body: { es: "", en: "" } }],
  },
  solutions: {
    title: { es: "", en: "" },
    items: [{ id: "", title: { es: "", en: "" }, body: { es: "", en: "" } }],
  },
  how: {
    title: { es: "", en: "" },
    items: [{ id: "", title: { es: "", en: "" }, body: { es: "", en: "" } }],
  },
  areas: { title: { es: "", en: "" }, items: [{ es: "", en: "" }] },
  team: {
    title: { es: "", en: "" },
    principal: [
      {
        id: "",
        name: { es: "", en: "" },
        role: { es: "", en: "" },
        bio: { es: "", en: "" },
        photo: { type: "image", content: "" },
      },
    ],
    members: [
      {
        id: "",
        name: { es: "", en: "" },
        role: { es: "", en: "" },
        bio: { es: "", en: "" },
        photo: { type: "image", content: "" },
      },
    ],
  },
  network: {
    title: { es: "", en: "" },
    body: { es: "", en: "" },
    label: { es: "", en: "" },
    items: [
      {
        id: "",
        title: { es: "", en: "" },
        image: { type: "image", content: "" },
      },
    ],
  },
  contact: {
    title: { es: "", en: "" },
    subtitle: { es: "", en: "" },
    fields: {
      name: { es: "", en: "" },
      surname: { es: "", en: "" },
      email: { es: "", en: "" },
      message: { es: "", en: "" },
    },
    cta: { es: "", en: "" },
  },
  footer: { location: { es: "", en: "" }, email: "", site: "" },
};

export const defaultConfigContent: ConfigContent = {
  footer: { social: { x: "", instagram: "", youtube: "", linkedin: "" } },
};
