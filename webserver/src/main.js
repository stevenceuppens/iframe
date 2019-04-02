const express = require('express');

const rootapp = express()
const rootport = 3000

const guestapp = express()
const guestport = 3001

rootapp.use('/', express.static('./rootapp/src/'))
rootapp.use('/guestapp', express.static('./guestapp/src/'))

guestapp.use('/', express.static('./guestapp/src/'))

rootapp.listen(rootport, () => console.log(`RootApp listening on port ${rootport}!`))
guestapp.listen(guestport, () => console.log(`GuestApp listening on port ${guestport}!`))