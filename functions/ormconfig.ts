require('dotenv').config();

module.exports = [
  {
    "name": "dev",
    "type": "mysql",
    "host": process.env.DB_HOST_DEV,
    "port": process.env.DB_PORT_DEV,
    "username": process.env.DB_USER_DEV,
    "password": process.env.DB_PASSWORD_DEV,
    "database": process.env.DB_NAME_DEV,
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
    "host": process.env.DB_HOST_PROD,
    "port": process.env.DB_PORT_PROD,
    "username": process.env.DB_USER_PROD,
    "password": process.env.DB_PASSWORD_PROD,
    "database": process.env.DB_NAME_PROD,
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
    "host": process.env.DB_HOST_LOCAL,
    "port": process.env.DB_PORT_LOCAL,
    "username": process.env.DB_USER_LOCAL,
    "password": process.env.DB_PASSWORD_LOCAL,
    "database": process.env.DB_NAME_LOCAL,
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
