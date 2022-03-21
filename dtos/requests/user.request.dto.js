const sanitizeInput = require('../../utils/sanitize').sanitizeInput;
exports.createUserRequestDto = (body) => {
    const resultBinding = {
        validatedData: {},
        errors: {},
    };

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!body.first_name || body.first_name.trim() === '')
        resultBinding.errors.first_name = 'First name is required';
    else
        resultBinding.validatedData.first_name = sanitizeInput(body.first_name);
    if (!body.last_name || body.last_name.trim() === '')
        resultBinding.errors.last_name = 'Last name is required';
    else
        resultBinding.validatedData.last_name = sanitizeInput(body.last_name);
    if (body.email_address && body.email_address.trim() !== '' && emailRegex.test(String(body.email_address).toLowerCase()))
        resultBinding.validatedData.email_address = sanitizeInput(body.email_address.toLowerCase());
    else
        resultBinding.errors.email_address = 'Email is required';
    if (!body.phone_number || body.phone_number.trim() === '')
        resultBinding.errors.phone_number = 'Phone number is required';
    else
        resultBinding.validatedData.phone_number = sanitizeInput(body.phone_number);
    if (body.password && body.password.trim() !== '')
        resultBinding.validatedData.password = body.password;
    else
        resultBinding.errors.password = 'Password must not be empty';

    resultBinding.validatedData.is_verified = false;
    resultBinding.validatedData.status = false;
    resultBinding.validatedData.last_login = null;

    return resultBinding;
}