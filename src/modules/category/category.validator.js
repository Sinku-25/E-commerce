import joi from "joi";

export const addCategorySchema = joi.object({
  name: joi.string().min(2).max(30).required(),
});

export const getCategoryByIdSchema = joi.object({
  _id: joi.string().hex().length(24).required(),
});

export const updateCategorySchema = joi.object({
  name: joi.string().min(2).max(30).required(),
  _id: joi.string().hex().length(24).required(),
});
export const deleteCategorySchema = joi.object({
    _id: joi.string().hex().length(24).required(),
  });