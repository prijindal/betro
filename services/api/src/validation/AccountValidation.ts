import { body, ValidationChain } from "express-validator";

const PostValidation = {
  saveProfile: (): Array<ValidationChain> => [
    body("first_name", "first_name is required!").not().isEmpty(),
    body("last_name", "last_name is required!").not().isEmpty(),
  ],
};

export default PostValidation;
