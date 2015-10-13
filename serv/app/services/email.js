
var nodemailer = require('nodemailer');
// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'krzysztofkpyta@gmail.com',
        pass: 'owslen69xD'
    }
});


function email(type, data) {
  handler[type](data);
}

handler = {
    'error': function(data) {
      // setup e-mail data with unicode symbols
      var mailOptions = {
          from: 'PingSth ✔ <PingSth@gmail.com>', // sender address
          to: 'krzysztofweglinski@gmail.com', // list of receivers
          subject: 'PingSth Alert', // Subject line
          text: 'Your website' + data.website + 'has broke down', // plaintext body
          html: '<h1>Your website' + data.website + '</h1> <p>has broke down</p>' // html body
      };

      transporter.sendMail(mailOptions, function(error, info){
          if(error){
              return console.log(error);
          }
          console.log('Message sent: ' + info.response);

      });
    }
}

module.exports = email;
