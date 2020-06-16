export default{
    registerUserValidation: (setErrors, user) =>{
        const errors = {};
        let isValid = true;
        if (!nameValidator(user.name)) {
            errors.name = "name must be At least 5 Characters";
            isValid = false;
        }
        if (!emailValidator(user.email)) {
            errors.email = "Please enter a Valid Email";
            isValid = false;
        }
        setErrors(errors);
        return isValid;
    },
    loginUserValidation:(setErrors, user) => {
        const errors = {};
        let isValid = true;
        if (!emailValidator(user.email)) {
            errors.email = "Please enter a Valid Email";
            isValid = false;
        }
        if(user.password.length === 0){
            errors.password = "Password is Required";
            isValid = false;
        }
        setErrors(errors);
        return isValid;
    }
}
const emailValidator = (email) => {
    if (!email.includes("@"))
        return false;
    return true;
}

const nameValidator = (name) => {
    if(name.length < 5)
        return false;
    return true;
}
