// Some placeholder data

// GET api/forum/index/
export const apiForumIndex = {
  id: 1,
  game: {
    id: 1,
    name: "Qalatlán",
    founder: {
      id: 1,
      name: "M-C Pronovost"
    },
    owner: {
      id: 1,
      name: "M-C Pronovost"
    },
    is_active: true,
    created_at: "2020-09-20",
    updated_at: "2020-09-20"
  },
  categories: [
    {
      id: 1,
      name: "Category A",
      description: "Description de la Category A.",
      is_visible: true,
      list_topics: [1, 2, 3],
      total_topics: 3,
      total_messages: 12,
      sections: [
        {
          id: 1,
          name: "Section A",
          description: "Description de la Section A.",
          is_visible: true,
          list_topics: [1, 2],
          total_topics: 2,
          total_messages: 6
        },
        {
          id: 2,
          name: "Section B",
          description: "Description de la Section B.",
          is_visible: true,
          list_topics: [3],
          total_topics: 1,
          total_messages: 6
        },
        {
          id: 3,
          name: "Section C",
          description: "Description de la Section C.",
          is_visible: true,
          list_topics: [],
          total_topics: 0,
          total_messages: 0
        }
      ]
    }
  ]
};