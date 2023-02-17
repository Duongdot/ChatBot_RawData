const functions = require('firebase-functions')
const cors = require('cors')({origin: true});
const app = require("./server")
exports.endpoint = functions.region('asia-northeast1').https.onRequest(app)