const validator = require('validator');


const validatorSignup = (req) => {

    const { firstName, lastName, emailID, password } = req.body;
    if (firstName.length < 2 || firstName.length > 40) {
        throw new Error('First name must be between 2 and 40 characters');
    }
    if (lastName.length < 2 || lastName.length > 40) {
        throw new Error('Last name must be between 2 and 40 characters');
    }

    if (!validator.isEmail(emailID)) {
        throw new Error('Invalid email format');
    }
    if (!validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
        throw new Error('Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and symbols');
    }
};

const validatorEditProfile = (req) => {

    const validFields = ['firstName', 'lastName', 'age', 'photourl', 'skills', 'gender'];
    const isValid = Object.keys(req.body).every(field => validFields.includes(field));
    return isValid;
}

module.exports = { validatorSignup, validatorEditProfile };