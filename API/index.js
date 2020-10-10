'use strict'

const Hapi = require('@hapi/hapi')
const Vision = require('@hapi/vision')
const Handlebars = require('handlebars')

const jenosizeRoutes = require('./routes')

require('dotenv').config()

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    await server.register({
        plugin: Vision
    })
    server.views({
        engines: {
          html: Handlebars
        },
        path: __dirname + '/views',
        layout: 'layout'
    })

    server.route(jenosizeRoutes)

    await server.start()
    console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
    console.log(err)
    process.exit(1)
})

init()