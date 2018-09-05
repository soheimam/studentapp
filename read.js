const fs = require('fs')

const read = (filename, callback) =>{
    fs.readFile(filename, function (err,data){
        if (err){
            return callback(err)
        };
        const json = JSON.parse(data);
        callback(null, json);
    })
}
module.exports = read