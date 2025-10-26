import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { cloudinaryUpload } from './cloudinary.config';

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryUpload,
  params: {
    public_id: (req, file) => {

      const fileName = file.originalname
        .toLowerCase()
        .replace(/\s+/g, '-') // empty space remove replace with dash
        .replace(/\./g, '-')
        // eslint-disable-next-line no-useless-escape
        .replace(/[^a-z0-9\-\.]/g, ''); // non alpha numeric - !@#$

      const uniqueFileName =
        Math.random().toString(15).substring(2) +
        '-' +
        Date.now() +
        '-' +
        fileName;

      return uniqueFileName;
    },
  },
});

export const multerUpload = multer({ storage: storage });
