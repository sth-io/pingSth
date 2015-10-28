function pathExcl(url, params) {
  var result;
  console.log(params);
  if (params.regex != null && 'regex' in params) {
    switch (params.regex.excl) {
      case true:
        result = !params.regex.val.test(url);
        break;
      case false:
        result = params.regex.val.test(url);
        break;
      default:
        result = params.regex.val.test(url);
    }
    if (result && removeMarketing(url, params.website, params.relative)) {
      return true;
    } else {
      return false;
    }
  } else {
    return removeMarketing(url, params.website, params.relative);
  }
}

function removeMarketing(url, website, relative) {
  if (relative === true) {
    if (url.indexOf('://') > -1 && url.indexOf('://') < 7) {
      return false;
    } else {
      return true;
    }
  } else {
    if (url.indexOf(website) > -1 && url.indexOf(website) < 10) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = pathExcl;
