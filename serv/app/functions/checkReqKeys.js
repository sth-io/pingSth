function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return !re.test(email);
}

module.exports = function(obj, reqkeys) {
    var keys = Object.keys(reqkeys);
    var errs = [];
    for (i = 0, len = keys.length; i < len; ++i) {
        if (Object.keys(obj).indexOf(keys[i]) > -1) {
            var thiskey = keys[i];
            switch (reqkeys[keys[i]]) {
                case 'string':
                    if (typeof obj[thiskey] !== 'string') errs.push(keys[i]);
                    break;
                case 'date':
                    if (!(new Date(obj[thiskey]) !== "Invalid Date" && !isNaN(new Date(obj[thiskey])))) {
                        errs.push(keys[i])
                    };
                    break;
                case 'email':
                    if(validateEmail(obj[thiskey])) {
                        errs.push(keys[i]);
                    }
            }
        } else {
            errs.push(keys[i]);
        }
    }
    if (errs.length == 0) {
        return true;
    } else {
        return errs;
    }
}