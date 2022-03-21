## TASK SCHEDULING API Code

### Set-up

* Make sure [postgresql](https://www.postgresql.org/) is installed
  and running.
* Clone the repository then run `npm install`
* Add a `.env` file in the project's root defining:
    - `DB_USERNAME` - postgresql username
    - `DB_NAME` - name of database to use
    - `DB_HOST` - host where postgresql is running  e.g localhost
    - `DB_PASSWORD` - password of the database
    * `API_PORT` - port where the api should run
    * `JWT_KEY` - any random string
    * `MAIL_HOST`, `MAIL_PORT`, `MAIL_USER`, `MAIL_PASS` - test values for
      all of these can be obtained by making an account
      with [mailtrap](https://mailtrap.io/inboxes)
* Run `npx sequelize-cli db:migrate` to create all the required tables.
* Optionally run `npx sequelize-cli db:seed:all` to fill the database with
  sample data using [faker.js](https://github.com/marak/Faker.js/) - Seed once to avoind violating database constraints - May be a reaon to see an error in your console