import joi from "joi";

export const getProductByIdSchema = joi.object({
  _id: joi.string().hex().length(24).required(),
});

export const  updateProductSchema = joi.object({
  title: joi.string().min(5).max(30).required(),
  _id: joi.string().hex().length(24).required(),
});
export const deleteProductSchema = joi.object({
    _id: joi.string().hex().length(24).required(),
  });