rm ./lib/src/migration -rf
npm run build
typeorm -c $1 migration:generate -n migration
npm run build
typeorm -c $1 migration:run
