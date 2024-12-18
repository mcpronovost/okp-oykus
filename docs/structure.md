.
├── .docker/
├── backend/
│   ├── okp/
│   │   ├── api/
│   │   │   ├── v1/
│   │   │   │   ├── games/
│   │   │   │   │   ├── serializers.py
│   │   │   │   │   ├── urls.py
│   │   │   │   │   └── views.py
│   │   │   │   ├── users/
│   │   │   │   │   ├── serializers.py
│   │   │   │   │   ├── urls.py
│   │   │   │   │   └── views.py
│   │   │   │   └── urls.py
│   │   │   ├── urls.py
│   │   │   └── views.py
│   │   │
│   │   ├── games/
│   │   │   ├── admin.py
│   │   │   └── models.py
│   │   ├── users/
│   │   │   ├── admin.py
│   │   │   └── models.py
│   │   │
│   │   ├── fields.py
│   │   ├── urls.py
│   │   └── utils.py
│   │
│   ├── manage.py
│   └── requirements.txt
│
├── docs/
│
├── frontends/
│   ├── public/
│   │   ├── fonts/
│   │   ├── favicon.ico
│   │   └── robots.txt
│   │
│   ├── src/
│   │   ├── _assets/
│   │   │   ├── css/
│   │   │   ├── img/
│   │   │   └── vendors/
│   │   │
│   │   ├── _services/
│   │   │   ├── api/
│   │   │   ├── i18n/
│   │   │   │   └── locales/
│   │   │   ├── router/
│   │   │   │   └── routes/
│   │   │   ├── store/
│   │   │   │   └── slices/
│   │   │   └── utils/
│   │   │       ├── constants/
│   │   │       └── types/
│   │   │
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── core/
│   │   │   ├── layout/
│   │   │   ├── react/
│   │   │   │   ├── applications/
│   │   │   │   └── common/
│   │   │   └── views/
│   │   │
│   │   └── pages/
│   │
│   ├── astro.config.mjs
│   ├── package.json
│   ├── prettier.config.js
│   └── tsconfig.json
│
├── .env
├── docker-compose.yml
├── LICENSE.md
└── README.md