var nodemailer = require('nodemailer'),
  config = require('../../config');
// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
  service: config.email.type,
  auth: {
    user: config.email.user,
    pass: config.email.password
  }
});


function email(type, data) {
  handler[type](data);
}

handler = {
  'error': function(data) {
    // setup e-mail data with unicode symbols
    if( Object.prototype.toString.call( data.owner ) !== '[object Array]' ) {
      data.owner = [ data.owner ];
    }
    for (var i = 0, len = data.owner.length; i < len; i++) {
      var mailOptions = {
        from: '« PingSth <' + config.email.user + '>', // sender address
        to: data.owner[i], // list of receivers
        subject: '[PingSth] Website Alert', // Subject line
        text: 'Your website ' + data.website + ' has broke down', // plaintext body
        html: '<h1>Your website alarm</h1> <p><a href="' + data.website + '">' + data.website + '</a> is not accesible through ping.</p>' // html body
      };

      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          return console.log(error);
        }
        console.log('✔ Message sent. Response:'.cyan + info.response);

      });
    }
  }
}

module.exports = email;
