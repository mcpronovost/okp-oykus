# Oykus

Just a textual storytelling roleplay game build with Astro and Django.


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
│   │           ├── <chapters>
│   │           |   ├── <messages>
│   │           |   └── new message
│   │           └── new chapter
│   └── <characters>
│       └── profile
|── community
|   └── <players>
└── settings
```

Under construction.

## API endpoints

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                              |
| :------------------------ | :-------------------------------------------------- |
| `/games`                  | List of all games                                   |
| `/games/<slug>`           | Data of a game                                      |
