# Конвертер валют (Currency Converter)

Цей проект є веб-додатком для перегляду та редагування курсів валют, розробленим з використанням Vue 3 та Vuetify 3.

## 🌟 Функціональність

- 📊 **Перегляд курсів валют**: Відображення актуальних курсів валют від Національного банку України.
- 🔍 **Пошук курсів за датою**: Можливість вибрати дату та переглянути історичні курси валют.
- ✏️ **Редагування курсів**: Можливість змінювати курси валют локально.
- 📋 **Відстеження змін**: Окрема сторінка для перегляду змінених курсів валют.
- 🔎 **Пошук по валютах**: Фільтрація валют за назвою, кодом та іншими параметрами.

## 🛠️ Технології

- **Vue 3**: Прогресивний JavaScript фреймворк для створення користувацьких інтерфейсів.
- **Vuetify 3**: Бібліотека компонентів Material Design для Vue.
- **Vue Router**: Офіційний маршрутизатор для Vue.js.
- **Axios**: HTTP-клієнт для виконання запитів до API.
- **Vite**: Сучасний інструмент збірки для швидкої розробки.

## 📋 Структура проекту

- **/src/api**: Модуль для роботи з API Національного банку України.
- **/src/composables**: Повторно використовувані композиційні функції Vue.
- **/src/constants**: Константи проекту, включаючи маршрути та заголовки таблиць.
- **/src/pages**: Компоненти сторінок додатку.
- **/src/router**: Конфігурація маршрутизації.
- **/src/store**: Локальне сховище для управління зміненими курсами валют.

## 📱 Сторінки додатку

1. **Головна** (`/`): Відображення поточних курсів валют.
2. **Пошук курсу** (`/course-search`): Пошук курсів валют за обраною датою.
3. **Змінені курси** (`/changed-course`): Перегляд локально змінених курсів валют.
4. **Редагування валюти** (`/currency-edit/:code`): Сторінка для редагування курсу конкретної валюти.

## 🚀 Встановлення та запуск

### Встановлення залежностей

```bash
npm install
# або
yarn install
```

### Запуск сервера розробки

```bash
npm run dev
# або
yarn dev
```

Додаток буде доступний за адресою [http://localhost:3000](http://localhost:3000).

### Збірка для виробництва

```bash
npm run build
# або
yarn build
```

## 📝 API

Додаток використовує API Національного банку України для отримання курсів валют:

```
https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=YYYYMMDD&json
```

де `YYYYMMDD` - дата у форматі рік-місяць-день (наприклад, 20250703).
yarn build
```

(Repeat for npm, pnpm, and bun with respective commands.)

Once the build process is completed, your application will be ready for deployment in a production environment.

## 💪 Support Vuetify Development

This project is built with [Vuetify](https://vuetifyjs.com/en/), a UI Library with a comprehensive collection of Vue components. Vuetify is an MIT licensed Open Source project that has been made possible due to the generous contributions by our [sponsors and backers](https://vuetifyjs.com/introduction/sponsors-and-backers/). If you are interested in supporting this project, please consider:

- [Requesting Enterprise Support](https://support.vuetifyjs.com/)
- [Sponsoring John on Github](https://github.com/users/johnleider/sponsorship)
- [Sponsoring Kael on Github](https://github.com/users/kaelwd/sponsorship)
- [Supporting the team on Open Collective](https://opencollective.com/vuetify)
- [Becoming a sponsor on Patreon](https://www.patreon.com/vuetify)
- [Becoming a subscriber on Tidelift](https://tidelift.com/subscription/npm/vuetify)
- [Making a one-time donation with Paypal](https://paypal.me/vuetify)

## 📑 License
[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2016-present Vuetify, LLC
