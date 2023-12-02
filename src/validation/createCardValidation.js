import Joi from "joi";
import validateToCard from "./validateToCard ";

const createCardSchema = Joi.object({
  title: Joi.string().min(2).max(256).required(),
  subtitle: Joi.string().min(2).max(256).required(),
  description: Joi.string().min(2).max(1024).required(),
  web: Joi.string().min(11).allow(""),
  phone: Joi.string()
    .min(9)
    .max(11)
    .pattern(/^\+?(972|0)(\-)?0?(([23489]{1}\d{7})|[5]{1}\d{8})$/)
    .messages({
      "string.pattern.base": "Phone number is not valid",
      "string.empty": "Phone is not allowed to be empty",
    })
    .required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .min(5)
    .required(),
  url: Joi.string().min(14).required(),
  alt: Joi.string().min(2).max(256).required(),
  state: Joi.string().min(2).max(256).allow(""),
  country: Joi.string().min(2).max(256).required(),
  city: Joi.string().min(2).max(256).required(),
  street: Joi.string().min(2).max(256).required(),
  houseNumber: Joi.number().min(2).max(256).required(),
  zip: Joi.number().min(2).max(256).allow(""),
});
const validateCard = (inputToCheck) => {
  return validateToCard(createCardSchema, inputToCheck);
};

export { validateCard };
