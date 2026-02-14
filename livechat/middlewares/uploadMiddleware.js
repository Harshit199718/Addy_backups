const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const maxSize = 2 * 1024 * 1024;

const upload = multer({ storage: storage, limits: { fileSize: maxSize } });

module.exports = {upload}