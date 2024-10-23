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

| Command                        | Action                                              |
| :----------------------------- | :-------------------------------------------------- |
| `/games`                       | List of all games                                   |
| `/games/<slug>`                | Data of a game                                      |
| `/forums/<slug>/categories`    | List of forum categories of a game                  |
