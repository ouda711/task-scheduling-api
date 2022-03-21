'use strict'

require('dotenv').config();
const nodemailer = require('nodemailer');
const models = require('../../models');

async function send(to, link) {
    let transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: false,
        auth:{
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    const url = `http://localhost:${process.env.API_PORT}/api/v1/users/confirm/${link}`;
    let message = {
        from: '"Task Scheduling API" <noreply@task-scheduling-api.com>',
        to: to,
        subject:'Account Verification',
        html: "<p>Thank you for registering with Task Scheduling API.<br />Follow this link to verify your account:<br/><a href="+url+">Confirm email</a></p>",
    };
    let sent;
    transporter.sendMail(message,(err, info)=>{
        if(err){
            sent = false
        }
        else{
            sent = true
        }
    });

    models.Authenticate.create({
        email_address: to,
        token: link,
        is_used:false
    }).catch(err=>{
        console.log(err);
    }).then(()=>{
        console.log('Verification email sent');
    })
}

module.exports = {
    send: send
}