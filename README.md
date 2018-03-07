# TopSub
Subscribe to search results

## Install
* `git clone git@github.com:guyb7/TopSub.git`
* `yarn`
* create `.env`:
```
NODE_ENV=development
PORT=3010

PG_HOST=127.0.0.1
PG_PORT=5444
PG_DB=postgres
PG_USER=postgres
PG_PASSWORD=mysecretpassword

```

## Development
* `yarn db:start` - will launch a pg instance on local port 5444 (postgres/mysecretpassword)
* `yarn start`

## Tests
`yarn test`

## Deployment
