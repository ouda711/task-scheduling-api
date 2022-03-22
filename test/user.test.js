process.env.NODE_ENV = 'test';

const User = require('../models/user');
const Role = require('../models/role');
const UserRole = require('../models/userrole');
const truncate = require("./truncate.test");

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let expect = chai.expect;
const server = require('../bin/www');

chai.use(chaiHttp);

describe("User authentication", function () {
    beforeEach(async () => {
        // await truncate();
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
                        expect(res.status).to.equal(403);
                        expect(res.body.success).to.equal('false');
                        expect(res.body.errors.email_address).to.equal('Email address oudawy105@gmail.com is already taken');
                        expect(res.body.errors.phone_number).to.equal('Phone number: 07001522333 is already taken')
                        done();
                    })
            });
        });
    });

    describe("/POST register", function () {
        it('Check for unprovided registration parameters', function (done) {
            let user = {
                "first_name": "Ouda",
                "last_name": "Wycliffe",
                "password": "Ouda@1234"
            }
            chai.request(server)
                .post('/api/v1/users/register')
                .send(user)
                .end((err, res) => {
                    expect(res.status).to.equal(422)
                    expect(res.body.success).to.equal(false);
                    expect(res.body.errors.email_address).to.equal('Email is required');
                    expect(res.body.errors.phone_number).to.equal('Phone number is required');
                    res.body.should.be.a('object');
                    done();
                })
        });
    });

    describe("/POST Login", function () {
        it('Empty login credentials', function (done) {
            let user = {

            };
            chai.request(server)
                .post('/api/v1/users/login')
                .send(user)
                .end((err, res) => {
                    expect(res.status).to.equal(400)
                    expect(res.body.success).to.equal(false);
                    expect(res.body.full_messages[0]).to.equal('Please provide your phone and password');
                    res.body.should.be.a('object');
                    done();
                })
        })
    })

    describe("/POST Login", function () {
        it('Failed due to locked status, unverified account', function (done) {
            let user = {
                "phone": "07001522333",
                "password": "Ouda@1234"
            };
            chai.request(server)
                .post('/api/v1/users/login')
                .send(user)
                .end((err, res) => {
                    expect(res.status).to.equal(401)
                    expect(res.body.success).to.equal(false);
                    expect(res.body.full_messages[0]).to.equal('This account is suspended. Contact admin' || 'Please verify your account before you continue');
                    res.body.should.be.a('object');
                    done();
                })
        })
    })

    describe("/POST Login", function () {
        it('Wrong phone provided in login', function (done) {
            let user = {
                "phone": "07001522334",
                "password": "Ouda@1234"
            };
            chai.request(server)
                .post('/api/v1/users/login')
                .send(user)
                .end((err, res) => {
                    expect(res.status).to.equal(200)
                    expect(res.body.success).to.equal(false);
                    expect(res.body.full_messages[0]).to.equal('Failed more than two cases. Try again');
                    res.body.should.be.a('object');
                    done();
                })
        })
    })

    describe("/POST Login", function () {
        it('Wrong password in login', function (done) {
            let user = {
                "phone": "07001522333",
                "password": "Ouda@123"
            };
            chai.request(server)
                .post('/api/v1/users/login')
                .send(user)
                .end((err, res) => {
                    expect(res.status).to.equal(200)
                    expect(res.body.success).to.equal(false);
                    expect(res.body.full_messages[0]).to.equal('Failed more than two cases. Try again');
                    res.body.should.be.a('object');
                    done();
                })
        })
    })

    describe("/POST Login", function () {
        it('More than two cases failed', function (done) {
            let user = {
                "phone": "07001522333",
                "password": "Ouda@1234"
            };
            chai.request(server)
                .post('/api/v1/users/login')
                .send(user)
                .end((err, res) => {
                    expect(res.status).to.equal(401)
                    expect(res.body.success).to.equal(false);
                    expect(res.body.full_messages[0]).to.equal('This account is suspended. Contact admin');
                    res.body.should.be.a('object');
                    done();
                })
        })
    })

    describe("/POST Login", function () {
        it('Successfully logged in', function (done) {
            let user = {
                "phone": "07001522333",
                "password": "Ouda@1234"
            };
            chai.request(server)
                .post('/api/v1/users/login')
                .send(user)
                .end((err, res) => {
                    expect(res.status).to.equal(200)
                    expect(res.body.success).to.equal(true);
                    res.body.should.have.property('token')
                    res.body.should.be.a('object');
                    const token = res.body.token;
                    const data = res.body.user;
                    console.log(token);
                    console.log(data)
                    done();
                })
        })
    })
});