exports.validateRegisterData = data => {
    let errors = {};

    if(isEmpty(data.email)) {
        errors.email = 'Must not be empty';
    } else if(!isEmail(data.email)) {
        errors.email = 'Must be a valid email address';
    };

    if(isEmpty(data.firstName)) {
        errors.firstName = 'Must not be empty';
    };
    if(isEmpty(data.lastName)) {
        errors.lastName = 'Must not be empty';
    };
    if(data.jobTitle === '' || data.jobTitle === 'Select') {
        errors.jobTitle = 'Must select a job title';
    };
    if(data.tierLevel === null || data.tierLevel === 'Select') {
        errors.tierLevel = 'Must select a tier level';
    };
    if(isEmpty(data.phoneNumber)) {
        errors.phoneNumber = 'Must not be empty';
    } else if(!isPhoneNumber(data.phoneNumber)) {
        errors.phoneNumber = 'Must be a valid phone number';
    };
    if(isEmpty(data.password)) {
        errors.password = 'Must not be empty';
    } else if(!isStrongPassword(data.password)) {
        errors.password = 'Weak password'
    }
    if(data.password !== data.confirmPassword) {
        errors.confirmPassword = 'Passwords must match';
    };

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };
};

exports.validateLoginData = data => {
    let errors = {};

    if(isEmpty(data.email)) {
        errors.email = 'Must not be empty';
    };
    if(isEmpty(data.password)) {
        errors.password = 'Must not be empty';
    };

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };
};

exports.validateUpdateData = data => {
    let errors = {};

    if(isEmpty(data.firstName)) {
        errors.firstName = 'Must not be empty';
    };
    if(isEmpty(data.lastName)) {
        errors.lastName = 'Must not be empty';
    };
    if(data.jobTitle === 'Select') {
        errors.jobTitle = 'Must select a job title';
    };
    if(data.tierLevel === 'Select') {
        errors.tierLevel = 'Must select a tier level';
    };
    if(isEmpty(data.phoneNumber)) {
        errors.phoneNumber = 'Must not be empty';
    } else if(!isPhoneNumber(data.phoneNumber)) {
        errors.phoneNumber = 'Must be a valid phone number';
    };

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };
};

exports.validateWorkOrderData = data => {
    let errors = {};

    if(isEmpty(data.customer)) {
        errors.customer = 'Must not be empty';
    };
    if(isEmpty(data.serviceDate)) {
        errors.serviceDate = 'Must not be empty';
    };
    if(isEmpty(data.serviceTime)) {
        errors.serviceTime = 'Must not be empty';
    };
    if(isEmpty(data.serviceDescription)) {
        errors.serviceDescription = 'Must not be empty';
    };
    if(data.serviceType.length === 0) {
        errors.serviceType = 'Must not be empty';
    };
    if(isEmpty(data.serviceManager)) {
        errors.serviceManager = 'Must not be empty';
    };
    if(isEmpty(data.officeManager)) {
        errors.officeManager = 'Must not be empty';
    };
    if(data.crewMembers.length === 0) {
        errors.crewMembers = 'Must not be empty';
    };

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };
};

// Helper Functions

const isEmpty = string => {
    if(string.trim() === '') {
        return true;
    } else {
        return false;
    };
};

const isEmail = email => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email.match(regEx)) {
        return true;
    } else {
        return false;
    };
};

const isPhoneNumber = phoneNumber => {
    const regEx = /^[0-9]{3}[-]{1}[0-9]{3}[-]{1}[0-9]{4}$/;
    if(phoneNumber.match(regEx)) {
        return true;
    } else {
        return false;
    };
};

const isStrongPassword = password => {
    const regEx = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()--_+.]).{8,}$/;
    if(password.match(regEx)) {
        return true;
    } else {
        return false;
    };
};