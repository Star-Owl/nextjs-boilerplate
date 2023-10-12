var admin = require('firebase-admin')

var serviceAccount = require('../../private/starowl-social-firebase-adminsdk-f5dnk-64f1f56c52.json')

export default admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
})
