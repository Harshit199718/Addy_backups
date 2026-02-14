const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs/promises');
const path = require('path');

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
      cb(new Error('Only JPEG and PNG files are supported'), false);
    } else {
      cb(null, true);
    }
  },
  limits: { fileSize: 2 * 1024 * 1024 } // 2 MB limit
});

// Middleware to compress and store the image
const compressAndStoreImage = async (req, res, next) => {
  if (!req.file) return next(new Error('No file provided!'));

  const uploadDir = path.join(__dirname, '../uploads');
  try {
    await fs.mkdir(uploadDir, { recursive: true });
  } catch (err) {
    return next(err);
  }

  const filename = Date.now() + '-' + req.file.originalname;
  const filepath = path.join(uploadDir, filename);

  sharp(req.file.buffer)
    .jpeg({ quality: 80 })  // Reduce quality to 80% for JPEG files
    .toFile(filepath)
    .then(() => {
      req.file.path = filepath;  // Pass the file path to the next middleware
      req.file.name = filename;  // Pass the file name to the next middleware
      next();
    })
    .catch(error => {
      next(error);
    });
};

module.exports = { upload, compressAndStoreImage };
