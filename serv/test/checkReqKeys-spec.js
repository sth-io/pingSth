#!javascript
var check = require("../app/functions/checkReqKeys"),
    Note = require('../app/models/note');
 
describe("checkReqKeys", function () {
  it("should check if required fields are met", function () {
    var sampleNote = {
        title: 'some title',
        content: 'some content',
        type: '1',
        owner: 'test'
    };
    var reqFields = {'owner': 'string', 'title': 'string', 'type': 'string', 'content': 'string'};
    expect(check(sampleNote, reqFields)).toBe(true);

    var badNote = {
        content: 1,
        type: '1',
        owner: 'test'
    };

    expect(typeof check(badNote, reqFields).length).toBe("number");

    var mail = {
        email: 'testmail@test.com',
    };  

    expect(check(mail, {email: "email"})).toBe(true);

    var badmail = {
        email: 'asdf@asd',
    }; 

    expect(typeof check(badmail, {email: "email"}).length).toBe("number");

  });
});    