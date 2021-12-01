# Zendesk Coding Challenge - Wilson Le

## Demo link:

Access my site at [https://zcc-wilsonle.web.app](https://zcc-wilsonle.web.app)

## Table of Content:

- [Zendesk Coding Challenge](#)
  - [Demo link:](#demo-link)
  - [Table of Content:](#table-of-content)
  - [About The App](#about-the-app)
  - [Screenshots](#screenshots)
  - [Technologies](#technologies)
  - [Get Started](#get-started)

## About The App

- A web application that is use to view tickets from ZenDesk, using ZenDesk API.
- Backend has 2 endpoint that is consumed by Frontend:
  - getTickets: get 10 tickets at a time
  - getTicket: get details of one ticket at a time
- Frontend features:
  - Loading component when data is not fetched from Backend
  - Friendly Error Modal when an error occurs:
    - Internal Server Error (from the app's server)
    - Unexpected Error (from the users)
    - Network Error (I actually implement this because there was an actual network outage in my university while I'm doing this)
- Notable features:
  - CI/CD
  - Hosting
  - Testing
  - Linting
  - Code Formatting
  - Pre-commit hooks

## Screenshots

[<img alt="All tickets" width="240px" src="https://i.ibb.co/R3JZPcy/tickets.png" />](https://i.ibb.co/R3JZPcy/tickets.png)
[<img alt="Loading screen" width="240px" src="https://i.ibb.co/cL9Mpqg/fetching.png" />](https://i.ibb.co/cL9Mpqg/fetching.png)

[<img alt="Error screen" width="240px" src="https://i.ibb.co/ydLwRdQ/error.png" />](https://i.ibb.co/ydLwRdQ/error.png)
[<img alt="Ticket detail screen" width="240px" src="https://i.ibb.co/rZDB9NK/detail.png" />](https://i.ibb.co/rZDB9NK/detail.png)

## Technologies

- Frontend: [React](https://reactjs.org), [Tailwind CSS](https://tailwindcss.com), [Typescript](https://www.typescriptlang.org)

- Backend: [Firebase](https://firebase.google.com), [Typescript](https://www.typescriptlang.org)

- CI/CD: [Github Actions](https://github.com/features/actions)

- Testing: [Jest](https://jestjs.io), [Testing Library](https://testing-library.com)

- Linter: [ESLint](https://eslint.org)

- Formatter: [Prettier](https://prettier.io)

## Get Started

- Install dependencies in all project folders

```
yarn install
```

- Create Firebase project from the Firebase Console, enable Hosting and Functions
- Initialize Firebase Hosting, Functions, Emulators

```
firebase init
```

- Create functions/src/secrets.json and frontend/src/secrets.json from example found in functions/src and frontend/src

- Create .env at root with from example found in root. The passphrase will encrypt/decrypt secret files

- To encrypt file:

```
yarn encrypt
```

- Concurrently start React app and emulators

```
yarn start
```
