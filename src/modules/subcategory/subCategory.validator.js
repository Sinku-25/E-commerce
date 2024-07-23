import joi from "joi";

export const createSubCategorySchema = joi.object({
  name: joi.string().min(2).max(30).required(),
  categoryId:joi.string().hex().length(24).required(),
});

export const getSubCategoryByIdSchema = joi.object({
  _id: joi.string().hex().length(24).required(),
});

export const updateSubCategorySchema = joi.object({
  name: joi.string().min(2).max(30).required(),
  categoryId:joi.string().hex().length(24).required(),
  _id: joi.string().hex().length(24).required(),
});
export const deleteSubCategorySchema = joi.object({
    _id: joi.string().hex().length(24).required(),
  });