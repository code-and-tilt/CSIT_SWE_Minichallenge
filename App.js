const express = require('express')
var https = require('https')


var fs = require('fs')


const MongoClient = require('mongodb').MongoClient


const app = express()


const port = 3000


app.get('/', (req, res) => res.send('Message from Express route handler: Hello World!'))


var db;


MongoClient.connect('mongodb+srv://userReadOnly:7ZT817O8ejDfhnBM@minichallenge.q4nve1r.mongodb.net/', (err, client) => {


    if (err) return console.log(err)


    db = client.db('minichallenge') 


    https.createServer({


        key: fs.readFileSync('/Users/kanghao/Applications/server.key'),


        cert: fs.readFileSync('/Users/kanghao/Applications/server.cert')


    }, app)


        .listen(port, () => console.log(`Example app listening on port ${port}!`))


})