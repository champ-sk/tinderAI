const validator = require('validator');


const validatorSignup = (req)=>{

    const {firstName, lastName, emailID, password} = req.body;
    if(firstName.length < 2 || firstName.length > 40 ) {
        throw new Error('First name must be between 2 and 40 characters');
    }
    if(lastName.length < 2 || lastName.length > 40 ) {
        throw new Error('Last name must be between 2 and 40 characters');
    }

    if(!validator.isEmail(emailID)) {
        throw new Error('Invalid email format');
    }
     if(!validator.isStrongPassword(password, { minLength: 12 , minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
        throw new Error('Password must be at least 12 characters long and include uppercase letters, lowercase letters, numbers, and symbols');
    }
};

module.exports = { validatorSignup };