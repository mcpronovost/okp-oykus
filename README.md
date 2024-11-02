# Oykus

A textual storytelling roleplay game built with Astro and Django.

## 🎮 Overview

Oykus is a web-based roleplaying platform that combines storytelling with game mechanics. It provides a rich environment for players to create characters, participate in forum discussions, and engage in collaborative storytelling.

## 🚀 Tech Stack

- **Frontend**: Astro + React
- **Backend**: Django + Django REST Framework
- **Styling**: SCSS
- **Container**: Docker

## 🛠️ Project Structure
```text
/home
├── <games>
│ ├── rules
│ ├── lore
│ ├── forum
│ │ └── <categories>
│ │ └── <sections>
│ │ ├── <topics>
│ │ | ├── <messages>
│ │ | └── new message
│ │ └── new topic
│ └── community
│ └── <characters>
│ └── profile
|── community
| └── <players>
└── settings
|── profile
└── account```

## 🔧 Installation

### Prerequisites

- Node.js >= 18.14.1
- npm >= 9.3.1
- Python 3.12.4
- Docker (optional)


## 🌐 API Endpoints

| Endpoint | Action |
| :------- | :----- |
| `/games/` | List of games |
| `/games/<slug>/` | Data of a game |
| `/forums/<slug>/categories/` | List of forum categories of a game |
| `/forums/<slug>/categories/<pk>/` | Data of a forum category |
| `/forums/<slug>/sections/<pk>/` | Data of a forum section |
| `/forums/<slug>/topics/<pk>/` | Data of a forum topic |
| `/forums/<slug>/topics/<pk>/messages/` | List of forum messages of a topic |

## 🌍 Internationalization

Oykus supports multiple languages. Currently available:
- English (en)
- French (fr)

## 📝 License

This project is private and unlicensed. All rights reserved.

## 👤 Author

**M-C Pronovost**
- GitHub: [@mcpronovost](https://github.com/mcpronovost)

---

© 2024 M-C Pronovost - All Rights Reserved