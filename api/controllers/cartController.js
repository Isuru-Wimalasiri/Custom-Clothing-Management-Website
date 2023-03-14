import Cart from '../models/Cart.js';

// GET ALL CARTS;
export const getCarts = async (req, res, next) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    next(err);
  }
};

// GET A CART
export const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (err) {
    next(500);
  }
};

// ADD PRODUCT TO CART
export const createCart = async (req, res, next) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(201).json(savedCart);
  } catch (err) {
    next(err);
  }
};

//UPDATE CART
export const updateCart = async (req, res, next) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    next(err);
  }
};

// DELETE CART
export const deleteCart = async (req, res) => {
  try {
    const deletedCart = await Cart.findOneAndDelete(req.params.id);
    res.status(200).json(deletedCart);
  } catch (err) {
    next(err);
  }
};
