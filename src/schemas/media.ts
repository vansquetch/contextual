export const mediaSchema = {
  "hero.image": {
    folder: "hero",
    filename: "hero",
    width: 900,
    height: 1200,
  },

  "team.members.0.photo": {
    folder: "team",
    filename: "member1",
    width: 500,
    height: 500,
  },

  "team.members.1.photo": {
    folder: "team",
    filename: "member2",
    width: 500,
    height: 500,
  },

  "network.logos.0": {
    folder: "logos",
    filename: "logo1",
    width: 300,
    height: 300,
  },

  "network.logos.1": {
    folder: "logos",
    filename: "logo2",
    width: 300,
    height: 300,
  },

  "network.logos.2": {
    folder: "logos",
    filename: "logo3",
    width: 300,
    height: 300,
  },
} as const;
