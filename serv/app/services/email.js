
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
          from: '« PingSth <pingsth@gmail.com>', // sender address
          to: 'krzysztofweglinski@gmail.com', // list of receivers
          subject: '[PingSth] Website Alert', // Subject line
          text: 'Your website ' + data.website + ' has broke down', // plaintext body
          html: '<h1>Your website alarm</h1> <p><a href="' + data.website + '">' + data.website + '</a> is not accesible through ping.</p>' // html body
      };

      transporter.sendMail(mailOptions, function(error, info){
          if(error){
              return console.log(error);
          }
          console.log('✔ Message sent. Response:'.cyan + info.response);

      });
    }
}

module.exports = email;
