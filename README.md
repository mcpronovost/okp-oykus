# Oykus

Just a textual storytelling rpg game build with Astro and Django.


## Project Structure

Under construction.

```text
/
├── home
├── <games>
│   ├── lore
│   ├── rules
│   ├── forum
│   │   └── <categories>
│   │       └── <sections>
│   │           ├── <topics>
│   │           |   ├── <messages>
│   │           |   └── new message
│   │           └── new topic
│   └── <characters>
│       └── profile
└── community
    └── <players>
```

Under construction.

## API endpoints

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                              |
| :------------------------ | :-------------------------------------------------- |
| `/games`                  | List of all games                                   |
| `/games/<slug>`           | Data of a game                                      |
