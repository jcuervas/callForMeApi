rm ./lib/src/migration -rf
rm ./src/migration -rf

npm run build
typeorm migration:generate -n migration
npm run build
typeorm migration:run
