process.env.NODE_ENV = 'test';

const User = require('../models/user');
const Role = require('../models/role');
const UserRole = require('../models/userrole');
const truncate = require("./truncate.test");

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
const server = require('../bin/www');

chai.use(chaiHttp);

describe("User authentication", function () {
    let user;
    beforeEach(async () => {
        await truncate();
    })

    describe("/POST register", function () {
        it('should check that the email and phone provided are not used', function () {
            it('validate user information before adding them to the database', function (done) {
                let user = {
                    "first_name": "Ouda",
                    "last_name": "Wycliffe",
                    "email_address": "oudawy105@gmail.com",
                    "phone_number": "07001522333",
                    "password": "Ouda@1234"
                }
                chai.request(server)
                    .post('/api/v1/users/register')
                    .send(user)
                    .end((err, res) => {
                        res.should.have.status(403);
                        res.body.should.be.a('object');
                        res.body.should.have.property('success');
                        res.body.should.have.property('full_messages');
                        done();
                    })
            });
        });
    });

    //Register new non existing user
    describe("/Post register", function () {
        it('validate user information before adding them to the database', function (done) {
            let user = {
                "first_name": "Ouda",
                "last_name": "Wycliffe",
                "email_address": "oudawy105@gmail.com",
                "phone_number": "07001522333",
                "password": "Ouda@1234"
            }
            chai.request(server)
                .post('/api/v1/users/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success');
                    res.body.should.have.property('full_messages');
                  done();
                })
        });
    });


});