# Boilerplate-expressjs/typescript-backend
Boilerplate-expressjs/typescript-backend service
## Tech Stack

- Backend:
  - MongoDB
  - Node.js
  - Mongoose
  - TypeScript
  - Jest
  - Express.js

## How to use

- Install npm dependencies:

```sh
yarn install
```

- Start Mongodb Instance

```sh
docker compose -f mongodb.yaml up
```

- Start development server

```sh
yarn start:dev
```
- Push to upstream branch without test

```sh
git push --no-verify
```