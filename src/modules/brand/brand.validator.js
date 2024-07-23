import joi from "joi";

export const addBrandSchema = joi.object({
  name: joi.string().min(2).max(30).required(),
});

export const getBrandByIdSchema = joi.object({
  _id: joi.string().hex().length(24).required(),
});

export const updateBrandSchema = joi.object({
  name: joi.string().min(2).max(30).required(),
  _id: joi.string().hex().length(24).required(),
});
export const deleteBrandSchema = joi.object({
    _id: joi.string().hex().length(24).required(),
  });