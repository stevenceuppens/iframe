const express = require('express');
const frameguard = require('frameguard')

const rootapp = express()
const rootport = 3000

const guestapp = express()
const guestport = 3001

rootapp.use(frameguard({ action: 'deny' }))
rootapp.use('/', express.static('./rootapp/src/'))
rootapp.use('/guestapp', express.static('./guestapp/src/'))

guestapp.use(frameguard({
    action: 'allow-from',
    domain: 'http://127.0.0.1:3000'
}));
guestapp.use('/', express.static('./guestapp/src/'))

rootapp.listen(rootport, () => console.log(`RootApp listening on port ${rootport}!`))
guestapp.listen(guestport, () => console.log(`GuestApp listening on port ${guestport}!`))