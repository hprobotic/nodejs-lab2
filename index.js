#!/usr/bin/env babel-node

require('./helper')
let fs = require('fs').promise
let express = require('express')
let PromiseRouter = require('express-promise-router')
let morgan = require('morgan')
let trycatch = require('trycatch')
let bodyParser = require('body-parser')

async function main() {
    let app = express()
    app.use(morgan('dev'))

    app.use((req, res, next) => {
        trycatch(next, e => {
            console.log(e.stack)
            res.writeHead(500)
            res.end(e.stack)
        })
    })

    let router = PromiseRouter()
    console.log(router)
    Object.assign(app, router)     // Inherit methods
    app.use(router)

    let port = 8000
    await app.listen(port)
    console.log(`LISTENING @ http://127.0.0.1:${port}`)
}

main()
