# Nps

## Prerequisites

Make sure you have [Node.js](https://nodejs.org/en/download/) installed on your machine. Check by running the following command:

```
node -v
```

which should output something like the following:

```
v14.16.0
```

## Development server

To start both the frontend and backend run this command `npm run start:all`. Navigate to http://localhost:4200/?survey_id=survey1 (the URL includes the ID of the survey available).

Alternatively, you can start each individual app with `npm start nps-web` or `npm start nps-api`.

**Note:** the survey responses submitted are stored as JSON files under the directory `/nps-responses` under the project's root directory. This directory was added to `.gitignore` to be excluded from versioning.
