<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

This app is meant to be used as a gateway for sending a payment to an external service.

This application uses the following design patterns:
    - Composite
    - Null Object
    - Factory
    - State

Besides, this application implements Clean architecture: domain, infrastructure and usecases

## Installation

1.-Install PostgreSQL with version 16

2.- Create an .env.local configuration file with the following parameters:

```editorconfig
POSTGRES_HOST=http://url.of.your.database.com
POSTGRES_PORT=5432
POSTGRES_USER=your_user
POSTGRES_PASSWORD=y0ur_s3cr3t_p4ss
POSTGRES_DB=your_database_name
```

Then, create a user, a database with the configurations shown above, and grant all privileges on
the database and the public schema to the user you created and permit login. 


Later, set the following configuration into your .env.local

```editorconfig
GENERAL_PAYMENT_BASE_URL=http://the.url.to.your.payment.com
HASHING_SALT=your_hashing_salt
SIGNUP_HEADER=THIS_IS_THE_SIGNUP_HEADDER_D
X_GENERAL_PAYMENT=MAKE-GENERAL-PAYMENT
```
Then, clone this repo:

[Payment application](https://github.com/francosopo/payment_repository)

And run it. That repository acts like a payment provider.

Finally, run

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run build
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

Finally, create a user with enough balance, this is because I decided to do that verification.
Besides, the token is kept by the server and updated dynamically. The endpoint to create a user with
enough balance is "/users/sign_up" and the payload is, as example
```json
{
  email: 'franco.seguel@ug.uchile.cl',
  password: 'mi_password_s3cr3t4',
  balance: 9000
}
```
One important thing is that the transferCode is also used to identify the user that makes the payment.
Since is not in the usecase, you can do a payment only with a valid "transferCode" parameter

## License

Nest is [MIT licensed](LICENSE).
