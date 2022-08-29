function validateLoginForm(email, password) {
  let error = {};
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  if (email.trim().length === 0) {
    error = {...error, emailError: 'enter valid email address'};
  }
  if (reg.test(email) === false) {
    error = {...error, emailError: 'Enter yout valid email address here'};
  }

  if (password.trim().length === 0) {
    error = {...error, passwordError: "Enter your correct password here"};
  }

  if (Object.keys(error).length > 0) {
    return error;
  }
  return null;
}

function validateSignupForm(email, password, firstName, lastName) {
    let error = {};
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  
    if (email.trim().length === 0) {
      error = {...error, emailError: 'enter valid email address'};
    }
    if (reg.test(email) === false) {
      error = {...error, emailError: 'Enter valid email address here'};
    }
  
    if (password.trim().length === 0) {
      error = {...error, passwordError: "Enter your password here"};
    }

    if (firstName.trim().length === 0) {
        error = {...error, firstNameError: "You can't keep this field empty"};
      }

      if (lastName.trim().length === 0) {
        error = {...error, lastNameError: "You can't keep this field empty"};
      }
  
    if (Object.keys(error).length > 0) {
      return error;
    }
    return null;
  }

  function validateForgotPasswordForm(email, password, firstName, lastName) {
    let error = {};
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  
    if (email.trim().length === 0) {
      error = {...error, emailError: 'enter valid email address'};
    }
    
    if (Object.keys(error).length > 0) {
      return error;
    }
    return null;
  }

const textInputValidateUtil = {
  validateLoginForm,
  validateSignupForm,
  validateForgotPasswordForm
};

export default textInputValidateUtil;
