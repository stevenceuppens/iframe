const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const rootapp = express();
const rootport = 3000;

const guestapp = express();
const guestport = 3001;

const unsafeapp = express();
const unsafeport = 5000;

const reportapp = express();
const reportport = 9000;

rootapp.use(function (req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
});
rootapp.use('/guestapp', helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        fontSrc: ['https://fonts.gstatic.com'],
        styleSrc: ["'self'", 'http://localhost:3001', 'https://stackpath.bootstrapcdn.com', 'https://fonts.googleapis.com'],
        scriptSrc: ["'self'", 'http://localhost:3001'],
        frameAncestors: ['http://localhost:3000'],
        reportUri: 'http://localhost:9000/report-violation'
    }
}));
rootapp.use('/', express.static('./rootapp/src/'))
rootapp.use('/guestapp', express.static('./guestapp/src/'))

rootapp.listen(rootport, () => console.log(`RootApp listening on port ${rootport}!`))

//##############################################################################

guestapp.use(function (req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next()
});
guestapp.use(helmet({
    frameguard: {
        action: 'allow-from',
        domain: 'http://localhost:3000'
    }
}));
guestapp.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        fontSrc: ['https://fonts.gstatic.com'],
        styleSrc: ["'self'", 'http://localhost:3001', 'https://stackpath.bootstrapcdn.com', 'https://fonts.googleapis.com'],
        scriptSrc: ["'self'", "'unsafe-inline'", 'http://localhost:3001'],
        frameAncestors: ['http://localhost:3000'],
        reportUri: 'http://localhost:9000/report-violation'
    }
}));
guestapp.use('/', express.static('./guestapp/src/'))

guestapp.listen(guestport, () => console.log(`GuestApp listening on port ${guestport}!`))

//##############################################################################

unsafeapp.use(function (req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
});
unsafeapp.use('/', express.static('./rootapp/src/'))

unsafeapp.listen(unsafeport, () => console.log(`UnsafeApp listening on port ${unsafeport}!`))

//##############################################################################

reportapp.use(bodyParser.json({
    type: ['json', 'application/csp-report']
}))

reportapp.post('/report-violation', (req, res) => {
    if (req.body) {
        console.log('CSP Violation: ', req.body)
    } else {
        console.log('CSP Violation: No data received!')
    }

    res.status(204).end()
})

reportapp.listen(reportport, () => console.log(`ReportApp listening on port ${reportport}!`))
