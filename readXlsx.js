var exceltojson = require("xlsx-to-json-lc");

module.exports = function (filename, sheet) {
    return new Promise((resolve, reject) => {
        exceltojson({
            input: filename,
            sheet: sheet,
            output: null,
        }, function(err, result) {
            if(err) {
                return reject(err);
            } else {
                resolve(result);
            }
          });

    })
}