import Category from '../models/Category.js';

//CREATE
export const createCategory = async (req, res, next) => {
  try {
    console.log(req.body);
    const newCategory = new Category(req.body);
    const savedCategory = await newCategory.save();
    res.status(200).json(savedCategory);
  } catch (err) {
    next(err);
  }
};

//UPDATE
export const updateCategory = async (req, res, next) => {
  //NOT IMPLEMENT CORRECTLY
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateCategory);
  } catch (err) {
    next(err);
  }
};

//DELETE
export const deleteCategory = async (req, res, next) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json('Category has been deleted...');
  } catch (err) {
    next(err);
  }
};

//GET ONE PRODUCT
export const getCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};

// //GET ALL
export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};
