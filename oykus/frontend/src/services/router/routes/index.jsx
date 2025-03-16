const ROUTES = {
  home: {
    component: () => import("@/pages/Home.jsx"),
    paths: {
      en: "",
      fr: "",
    },
  },
  games: {
    component: () => import("@/pages/Home.jsx"),
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

export default ROUTES;
