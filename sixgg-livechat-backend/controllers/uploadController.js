const uploadImage = (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).send("No files were uploaded.");
    }

    // You might want to save the file information in your MongoDB database
    // For example, create a new message document including the image URL/path
    res.status(200).json({
      status: true,
      message: "Successfully uploaded",
      data: { filePath: req.file.name }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { uploadImage };
