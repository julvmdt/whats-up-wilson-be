# whats-up-wilson backend

## how to start

1. create a .env file for important environment variables
2. make sure to set each typeorm variable to an existing postgres database (can be local)
````
TYPEORM_HOST=
TYPEORM_USERNAME=
TYPEORM_PASSWORD=
TYPEORM_DATABASE=
TYPEORM_PORT=
AUTH_SECRET=testAuthSecret
TYPEORM_CONNECTION=postgres
TYPEORM_SYNCHRONIZE=false
TYPEORM_LOGGING=error
TYPEORM_MIGRATIONS=src/migrations/**.ts
TYPEORM_MIGRATIONS_DIR=src/migrations
TYPEORM_ENTITIES=src/**/*.entity.ts
TYPEORM_ENTITIES_DIR=src/db/entities
TYPEORM_DRIVER_EXTRA={"ssl":true}
TYPEORM_CACHE=false
````
3. npm i
4. npm run start