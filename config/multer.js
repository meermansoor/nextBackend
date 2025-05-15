import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

export default upload;


// File size limits and allowed types
const fileFilter = (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

// Configure storage with size limits and file filtering
const uploadImage = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: fileFilter
}).single('image'); // 'image' is the field name in the form

// Helper function to handle image upload
const saveImage = (req, res) => {
    return new Promise((resolve, reject) => {
        uploadImage(req, res, (err) => {
            if (err) {
                if (err instanceof multer.MulterError) {
                    // Multer error (e.g., file too large)
                    reject({ status: 400, message: 'File upload error: ' + err.message });
                } else {
                    // Unknown error
                    reject({ status: 500, message: err.message });
                }
            } else if (!req.file) {
                reject({ status: 400, message: 'No file uploaded' });
            } else {
                // File uploaded successfully
                resolve({
                    filename: req.file.filename,
                    path: req.file.path,
                    mimetype: req.file.mimetype,
                    size: req.file.size
                });
            }
        });
    });
};

export { saveImage };



