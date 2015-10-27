#!javascript

var pE = require('../app/services/crawl/pathExcluder');


describe("Path excluder", function() {
  it("should return true or false on specified settings", function() {
    var pathEdata = {
      website: 'http://something.com',
      relative: false,
      depth: 4,
      regex: {
        val: (/\/(\d{4})\//),
        excl: true
      }
    };
    // this should return false due to regex for /1241/ in path.
    var pathE = pE('http://something.com/test/1241/lel', pathEdata);
    expect(pathE).toBe(false);

    var pathEdata = {
      website: 'http://something.com',
      relative: false,
      depth: 4,
      regex: null
    };
    //this should return true due having the same domain.
    var pathE = pE('http://something.com/test/1241/lel', pathEdata);
    expect(pathE).toBe(true);

    var pathEdata = {
      website: 'http://something.com',
      relative: false,
      depth: 4,
      regex: null
    };
    //this should return false due having different domain.
    var pathE = pE('https://facebook.com/test/something.com/lel', pathEdata);
    expect(pathE).toBe(false);

    var pathEdata = {
      website: 'http://something.com',
      relative: true,
      depth: 4,
      regex: null
    };
    //this should return true because of relative.
    var pathE = pE('/test/asdfg/assets/lel', pathEdata);
    expect(pathE).toBe(true);

    var pathEdata = {
      website: 'http://something.com',
      relative: true,
      depth: 4,
      regex: null
    };
    //this should return false because of different domain and during relative.
    var pathE = pE('http://facebook.com/test/something.com/assets/lel', pathEdata);
    expect(pathE).toBe(false);


    var pathEdata = {
      website: 'http://something.com',
      relative: false,
      depth: 4,
      regex: {
        val: (/\/(\d{4})\//),
        excl: true
      }
    };
    // this should return true due to no regex for 1241 in path.
    var pathE = pE('http://something.com/test/lel', pathEdata);
    expect(pathE).toBe(true);

    // this should also work on page itself.
    var pathE = pE('http://something.com', pathEdata);
    expect(pathE).toBe(true);

  })
})
