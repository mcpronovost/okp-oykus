# Oykus

Just a textual storytelling roleplay game build with Astro and Django.


## Project Structure

Under construction.

```text
/
├── home
├── <games>
│   ├── rules
│   ├── lore
│   ├── forum
│   │   └── <categories>
│   │       └── <sections>
│   │           ├── <chapters>
│   │           |   ├── <messages>
│   │           |   └── new message
│   │           └── new chapter
│   └── community
│       └── <characters>
│           └── profile
|── community
|   └── <players>
└── settings
    |── profile
    └── account
```

Under construction.

## API endpoints

List of all API endpoints.

| Endpoint                              | Action                                                |
| :------------------------------------ | :---------------------------------------------------- |
| `/games/`                             | List of games                                         |
| `/games/<slug>/`                      | Data of a game                                        |
| `/forums/<slug>/categories/`          | List of forum categories of a game                    |
| `/forums/<slug>/categories/<pk>/`     | Data of a forum category                              |
| `/forums/<slug>/sections/<pk>/`       | Data of a forum section                               |
| `/forums/<slug>/topics/<pk>/`         | Data of a forum topic                                 |
