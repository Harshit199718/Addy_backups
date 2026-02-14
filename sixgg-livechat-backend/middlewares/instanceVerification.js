const SECRET_KEY = 'your_secret_key';

const decryptData = (encryptedData, secret) => {
    const CryptoJS = require('crypto-js');
  const bytes = CryptoJS.AES.decrypt(encryptedData, secret);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

const verifyInstance = async (req, res, next) => {
    try {
        const instanceToken = req?.headers["instance-token"]
        if (!instanceToken) {
            return next(new Error("Instance Token is required"))
        }
        const {instanceName, instanceId} = decryptData(instanceToken, SECRET_KEY);
        if (!instanceName || instanceName==="undefined" || instanceName==="null" || !instanceId || instanceId==="undefined" || instanceId==="null") {
            return next(new Error("Not Valid Instance"))
        }
        req.isSuperBO = req?.headers["is-superbo"]
        req.instance = `${instanceName}_${instanceId}`
        next()
    } catch (error) {
        return next(error)
    }
}

module.exports = {decryptData, verifyInstance}