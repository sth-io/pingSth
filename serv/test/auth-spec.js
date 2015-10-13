#!javascript

var auth = require("../app/services/auth"),
    jwt = require('jsonwebtoken'),
    conf = require("../config");

describe("Token Auth", function() {
    it("should reutrn user if token match or false if not", function() {
        var user = {
            "email": "asdf@asd.pl",
            "password": "$2a$10$nRqHmf9jgJYSivVS5fiB8.n4eG1i.CpWW4Iq4K2S85ST0mns42CwK"
        },
            token = jwt.sign(user, conf.secret, {
                expiresInMinutes: 1440 // expires in 24 hours
            }),
            req = {
                body: {
                    token: token
                }
            };
        
        auth({body: {'test': 'test'}, query: {'test': 'test'}, headers: {'test': 'test'}}, function(cb) {
            expect(cb).toBe(false);
        });

        auth(req, function(cb) {
            expect(cb.email).toBe(user.email);
        });
        
        req.body.token = "lel";
        auth(req, function(cb) {
            expect(cb).toBe(false);
        });
        
    });
});