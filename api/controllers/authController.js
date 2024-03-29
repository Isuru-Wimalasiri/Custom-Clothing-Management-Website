import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { createError } from '../utils/err.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
      gender: req.body.gender,
      primaryAddress: req.body.primaryAddress,
      contactNumber: req.body.contactNumber,
      isAdmin: req.body.isAdmin,
      zipCode: req.body.zipCode,
      country: req.body.country,
      profilePic: req.body.profilePic,
    });
    await newUser.save();
    res.status(200).json('User has been created.');
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return next(createError(404, 'User not found'));
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return next(createError(400, 'Wrong password or username!'));
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT,
      { algorithm: 'HS256' }
    );
    const { password, ...otherDetails } = user._doc;

    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json({ ...otherDetails, token });
  } catch (err) {
    next(err);
  }
};
