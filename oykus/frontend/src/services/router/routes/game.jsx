export const GAMES_ROUTES = {
    games: {
      component: () => import("@/pages/game/Home.jsx"),
      paths: {
        en: "g",
        fr: "g",
      },
      children: {
        game: {
          component: () => import("@/pages/game/Home.jsx"),
          paths: {
            en: "{slug}",
            fr: "{slug}",
          },
          children: {
            community: {
              component: () => import("@/pages/game/Home.jsx"),  // TODO: Create Community page
              paths: {
                en: "community",
                fr: "communaute",
              },
              children: {
                character: {
                  component: () => import("@/pages/game/Home.jsx"),  // TODO: Create Character page
                  paths: {
                    en: "c{character_id}-{character_slug}",
                    fr: "c{character_id}-{character_slug}",
                  },
                },
              },
            },
            forum: {
              component: () => import("@/pages/game/forum/Category.jsx"),
              paths: {
                en: "c{category_id}-{category_slug}",
                fr: "c{category_id}-{category_slug}",
              },
              children: {
                section: {
                  component: () => import("@/pages/game/forum/Section.jsx"),
                  paths: {
                    en: "s{section_id}-{section_slug}",
                    fr: "s{section_id}-{section_slug}",
                  },
                  children: {
                    topic: {
                      component: () => import("@/pages/game/forum/Topic.jsx"),
                      paths: {
                        en: "t{topic_id}-{topic_slug}",
                        fr: "t{topic_id}-{topic_slug}",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
};
