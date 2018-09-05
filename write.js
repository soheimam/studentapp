// Require FS, we need this for reading and writing files
const fs = require('fs')

// Declare the write function, it takes a filename, some data to write and a callback for when its done
const write = (filename, buttfuck, awdadadadadadadaddawdadad) => {
    // Actually executing fs.writeFile it takes the data from above
    fs.writeFile(filename, buttfuck, (err) => {
        // if there was an error while writing, throw it on the ground!
        if (err) throw err
        // execute the callback function
        awdadadadadadadaddawdadad()
    })
}

// Export the module so we can use in index file
module.exports = write