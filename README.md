# TopSub
Subscribe to search results

## Install
* `git clone git@github.com:guyb7/TopSub.git`
* `yarn`
* create `.env`:
```
NODE_ENV=development
PORT=3010

RAZZLE_PG_HOST=127.0.0.1
RAZZLE_PG_PORT=5444
RAZZLE_PG_DB=postgres
RAZZLE_PG_USER=postgres
RAZZLE_PG_PASSWORD=mysecretpassword

RAZZLE_DB_LOGGING=true
```

## DB
We use the [Sequelize](http://docs.sequelizejs.com/) ORM over Postgresql.

To run a local DB in a docker container, make sure you're logged in to docker with `docker login` and then run `yarn db:start`. It will launch a pg instance on local port 5444 with the user postgres/mysecretpassword.

To remove the container run `yarn db:rm`.

Sync DB with:
```
yarn sequelize db:migrate
```
Add a DB model and a [migration](http://docs.sequelizejs.com/manual/tutorial/migrations.html):
```
yarn sequelize model:generate --name User --attributes firstName:string,lastName:string
```
Then edit the `src/DB/migrations/xxx-create.user.js` and `src/DB/models/user.js` files.

## Development
* `yarn start`

## Tests
`yarn test`

## Deployment
