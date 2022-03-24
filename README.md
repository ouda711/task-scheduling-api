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
    * `PORT` - port where the api should run
    * `JWT_KEY` - any random string
    * `MAIL_HOST`, `MAIL_PORT`, `MAIL_USER`, `MAIL_PASS` - test values for
      all of these can be obtained by making an account
      with [mailtrap](https://mailtrap.io/inboxes)
* Run `npx sequelize-cli db:migrate` to create all the required tables.
* Optionally run `npx sequelize-cli db:seed:all` to fill the database with
  sample data using [faker.js](https://github.com/marak/Faker.js/) - Seed once to avoid violating database constraints - May be a reason to see an error in your console

## Running

* Use `node start` to start the API then you may query endpoints defined
  in the `routes` directory.
* Import `Task Scheduling API.postman_collection.json` into postman to get see how to Structure
  requests.

### Project Structure

```
.
├── app.js
├── bin
│   └── www
├── config
│   └── config.js
├── controllers
│   ├── task.controller.js
│   └── users.controller.js
├── dtos
│   ├── requests
│   │   └── user.request.dto.js
│   └── responses
│       ├── agent.response.dto.js
│       ├── app.response.dto.js
│       ├── commets.response.dto.js
│       ├── customer.response.dto.js
│       ├── paginator.reponse.dto.js
│       ├── role.response.dto.js
│       ├── task.response.dto.js
│       └── user.response.dto.js
├── helpers
│   └── mailer
│       ├── password-reset.helper.mailer.js
│       └── verification.helper.mailer.js
├── middlewares
│   ├── auth.middleware.js
│   └── benchmark.middleware.js
├── migrations
│   ├── 20220321132243-create-user.js
│   ├── 20220321132557-create-role.js
│   ├── 20220321133117-create-authenticate.js
│   ├── 20220321133204-create-user-role.js
│   ├── 20220321215811-create-password-reset.js
│   ├── 20220323210437-create-customer.js
│   ├── 20220323210548-create-agent.js
│   ├── 20220323210818-create-task.js
│   ├── 20220323211412-create-comment.js
│   └── 20220323213016-create-task-agent.js
├── models
│   ├── agent.js
│   ├── authenticate.js
│   ├── comment.js
│   ├── customer.js
│   ├── index.js
│   ├── passwordreset.js
│   ├── role.js
│   ├── taskagent.js
│   ├── task.js
│   ├── user.js
│   └── userrole.js
├── package.json
├── Procfile
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── README.md
├── routes
│   ├── index.js
│   ├── param_loaders
│   │   └── task.loader.js
│   ├── task.routes.js
│   ├── user.routes.js
│   └── users.js
├── seeders
│   ├── 20220324074737-admin-features.js
│   ├── 20220324080001-users.js
│   ├── 20220324081916-agents.js
│   ├── 20220324090901-customers.js
│   ├── 20220324090902-tasks.js
│   └── 20220324092141-comments.js
├── Task Scheduling API.postman_collection.json
├── test
│   ├── truncate.test.js
│   └── user.test.js
├── utils
│   └── sanitize.js
└── views
    ├── error.ejs
    └── index.ejs

21 directories, 60 files

```

### Endpoints


* Link variable can either be the localhost url or the production url
```
Login: {{Link}}/api/v1/users/login - phone & password
Register: {{Link}}/api/v1/users/register - first_name, last_name, email_address, phone_number, password
Forget Password: {{Link}}/api/v1/users/forget-password - email_address

Get Paginated Tasks: {{Link}}/api/v1/tasks
Get single task by id: {{Link}}/api/v1/tasks/by_id/{id}
```