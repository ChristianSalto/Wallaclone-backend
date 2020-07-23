# Wallaclone-backend

## Install

```shell
npm install
```

<span style="color:red">Important !!!</span> -> **You must copy .env.example to .env and adapt your configuration to the project**

```shell
cp .env.example .env
```

To initialize the database you can run:

```shell
npm run install_db
```

## Run the app

Start the api as a developer:

```shell
npm run dev
```

Start the api in production:

```shell
npm run start
```

### How to start a mongoDB

```shell
./bin/mongod --dbpath ./data/db --directoryperdb
```
