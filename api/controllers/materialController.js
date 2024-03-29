import Material from '../models/Material.js';

//CREATE
export const createMaterial = async (req, res, next) => {
  const newMaterial = new Material(req.body);

  try {
    const savedMaterial = await newMaterial.save();
    res.status(200).json(savedMaterial);
  } catch (err) {
    next(err);
  }
};

//UPDATE
export const updateMaterial = async (req, res, next) => {
  try {
    const updatedMaterial = await Material.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedMaterial);
  } catch (err) {
    next(err);
  }
};

//DELETE
export const deleteMaterial = async (req, res, next) => {
  try {
    await Material.findByIdAndDelete(req.params.id);
    res.status(200).json('Material has been deleted...');
  } catch (err) {
    next(err);
  }
};

//GET ONE PRODUCT
export const getMaterial = async (req, res, next) => {
  try {
    const material = await Material.findById(req.params.id);
    res.status(200).json(material);
  } catch (err) {
    next(err);
  }
};

// //GET ALL
export const getMaterials = async (req, res, next) => {
  try {
    const materials = await Material.find();
    res.status(200).json(materials);
  } catch (err) {
    next(err);
  }
};
