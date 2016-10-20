#!/usr/bin/env babel-node

require('./helper')
let fs = require('fs').promise
let express = require('express')
let PromiseRouter = require('express-promise-router')
let morgan = require('morgan')
let trycatch = require('trycatch')
let bodyParser = require('body-parser')
let path = require('path')

async function main() {
    let app = express()
    app.use(morgan('dev'))

    app.use((req, res, next) => {
        console.log("result",req.url)
        trycatch(next, e => {
            console.log(e.stack)
            res.writeHead(500)
            res.end(e.stack)
        })
    })

    let router = PromiseRouter()
    // Object.assign(app, router)     // Inherit methods
    app.use(router)

    app.get("*", read)
    app.put("*", create)

    // lorem10

    app.post("*", bodyParser.raw(), update)
    app.del("*", remove)

    let port = 8000
    await app.listen(port)
    console.log(`LISTENING @ http://127.0.0.1:${port}`)


}
async function routeHandelerName(req, res) {
    console.log("result:", res)
}

async function read(req, res) {
    // Code here
    let filePath = path.join(__dirname, 'files', req.url)
    let data = await fs.readFile(filePath)
    res.end(data)

}

async function create(req, res) {
    let filePath = path.join(__dirname, 'files', req.url)
    let data = await fs.open(fielPath, "wx")
    res.end()
}

async function update(req, res) {
    let filePath = path.join(__dirname, 'files', req.url)
    let data = await fs.writeFile(filePath, req.body)
    res.end()
}

async function remove(req, res) {
    let filePath = path.join(__dirname, 'files', req.url)
    let data = await fs.unlink(filePath)
    res.end()
}
main()
