npm run build
typeorm -c $1 migration:generate -n migration
npm run build
typeorm -c $1 migration:run
