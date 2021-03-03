const functionsConfig = require("firebase-functions").config();

module.exports = [
  {
    "name": "dev",
    "type": "mysql",
    "host": process.env.DB_HOST || functionsConfig.ddbb.host,
    "port": process.env.DB_PORT || functionsConfig.ddbb.port,
    "username": process.env.DB_USER || functionsConfig.ddbb.user,
    "password": process.env.DB_PASSWORD || functionsConfig.ddbb.password,
    "database": process.env.DB_NAME || functionsConfig.ddbb.name,
    "synchronize": false,
    "logging": true,
    "entities": [
      "lib/src/entity/**/*.js"
    ],
    "migrations": [
      "lib/src/migration/**/*.js"
    ],
    "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration"
    }
  },
  {
    "name": "prod",
    "type": "mysql",
    "host": process.env.DB_HOST || functionsConfig.ddbb.host,
    "port": process.env.DB_PORT || functionsConfig.ddbb.port,
    "username": process.env.DB_USER || functionsConfig.ddbb.user,
    "password": process.env.DB_PASSWORD || functionsConfig.ddbb.password,
    "database": process.env.DB_NAME || functionsConfig.ddbb.name,
    "synchronize": false,
    "logging": false,
    "entities": [
      "lib/src/entity/**/*.js"
    ],
    "migrations": [
      "lib/src/migration/**/*.js"
    ],
    "cli": {
      "entitiesDir": "lib/src/entity",
      "migrationsDir": "lib/src/migration"
    }
  },
  {
    "name": "local",
    "type": "mysql",
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "synchronize": false,
    "logging": true,
    "entities": [
      "lib/src/entity/**/*.js"
    ],
    "migrations": [
      "lib/src/migration/**/*.js"
    ],
    "cli": {
      "entitiesDir": "lib/src/entity",
      "migrationsDir": "src/migration"
    }
  },
]
