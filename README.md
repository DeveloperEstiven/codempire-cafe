# Codempire Cafe

1. [General](#general)
2. [Tech stack](#tech-stack)
3. [Running applications locally](#running-applications-locally)

## General

**Project name:** Codempire Cafe.

## Tech stack:

- Typescript
- Client: React, redux-toolkit, redux-toolkit-query, styled-components
- Api: Nest.js, nestjs/passport, swagger

## Running application locally

### Required local files (.env)

web/.env api/.env

For the successful run of the project application and their further correct functioning, it is necessary to insert the above files.

The application **is not deployed**.

### To start, do the following:

1. `$ git clone {repository link}`;
2. install dependencies: `$ npm install` (ideally done once);
3. create Postgres Database and fill the required api/.env file according to the example below:

   - POSTGRES_LOCAL_HOST={_host_}
   - POSTGRES_PORT={_port_}
   - POSTGRES_USER={_user_}
   - POSTGRES_PASSWORD={_password_}
   - POSTGRES_DB={_database-name_}
   - PORT=5000
   - JWT_SECRET={jwt}

4. create web/.env file according to the example below:
   - REACT_APP_API_URL={_api-url_}

### Starting

**web**:

```bash
$ npm run start
```

**api**:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
