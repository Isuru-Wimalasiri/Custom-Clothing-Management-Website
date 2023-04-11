//import products from '../../client/src/data/productsData.js';
import Product from '../models/Product.js';
import multer from 'multer';

//CREATE
export const createProduct = async (req, res, next) => {
  const categoryId = req.params.categoryId;
  const imageData = req.file.path;
  const newProduct = new Product({
    ...req.body,
    category: categoryId,
    image: imageData,
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    next(err);
  }
};

//UPDATE
export const updateProduct = async (req, res, next) => {
  try {
    const updatedOrder = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateProduct);
  } catch (err) {
    next(err);
  }
};

//DELETE
export const deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json('Order has been deleted...');
  } catch (err) {
    next(err);
  }
};

//GET ONE PRODUCT
export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

// //GET ALL
export const getProducts = async (req, res, next) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;

  try {
    // let products;
    // if (qNew) {
    //   products = await Product.find().sort({ createdAt: -1 }).limit(1);
    // } else if (qCategory) {
    //   products = await Product.find({
    //     category: {
    //       $in: [qCategory],
    //     },
    //   });
    // }
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

export const diffCategories = async (req, res, next) => {
  try {
    const categories = await Product.find().distinct('category');
    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({
  storage: storage,
  fileFilter: (req, res, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb('Give proper file format to upload');
  },
});
