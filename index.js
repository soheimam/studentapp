const express = require('express');
const write = require('./write')
const read = require('./read')
const bodyParser = require('body-parser')

let app = express();

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({
    extended: false
}))

// app.use(express.static(__dirname + "/public"));

app.use(express.static("public"));

app.get('/', function (req, res) {
    res.render('home')
});


app.get('/usersjson', function (req, res) {
    read('users.json', function (err, data) {
        if (err) {
            return console.log(err)
        }

        res.json(data)
    })
})

app.get('/users', function (req, res) {
    read('users.json', function (err, data) {
        if (err) {
            return console.log(err)
        }

        res.render('users', {
            firstname: data.map(person => person.firstname),
            lastname: data.map(person => person.lastname),
            email: data.map(person => person.email),
            arrayLength: data.length
        })
    })
})

app.post('/users', function (req, res) {
    read('users.json', function (err, data) {
        if (err) {
            return console.log(err)
        }

        const userInput = req.body.search;
        const firstNames = data.map(person => person.firstname);
        const lastNames = data.map(person => person.lastname);

        if (firstNames.includes(userInput) || lastNames.includes(userInput)) {
            const output = data.filter(person => person.firstname === userInput || person.lastname === userInput || `${person.firstname} ${person.lastname}` === userInput)

            res.render('results', {
                firstname: output[0].firstname,
                lastname: output[0].lastname,
                email: output[0].email,
                arrayLength: output.length
            })
        }
     else{
        res.render('results', {
            firstname: null,
            lastname: null,
            email: null,
            arrayLength: 0
        })
     }
    })
})

app.get('/adduser', function(req, res){
    res.render('adduser')
    
});

app.post('/adduser', function(req,res){
    const student = { // Create a student object
        firstname : req.body.fname,
        lastname : req.body.lname,
        email : req.body.email
    }

    read('users.json', (err, data) => {
        if (err) throw err
        const json = data
        json.push(student)

        write('users.json', JSON.stringify(json), function() {
            res.redirect('/users')
        })
    })
})


app.listen(3000);
