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

exports.validateCustomerData = data => {
    let errors = {};

    if(isEmpty(data.businessName)) {
        errors.businessName = 'Must not be empty';
    };
    if(isEmpty(data.industry)) {
        errors.industry = 'Must not be empty';
    };
    if(data.primaryContact) {
        if(isEmpty(data.primaryContact.firstName)) {
            if(!errors.primaryContact) {
                errors.primaryContact = {};
            };
            errors.primaryContact.firstName = 'Must not be empty'
        };
        if(isEmpty(data.primaryContact.lastName)) {
            if(!errors.primaryContact) {
                errors.primaryContact = {};
            };
            errors.primaryContact.lastName = 'Must not be empty';
        };
    } else {
        if(!errors.primaryContact) {
            errors.primaryContact = {};
        };
        errors.primaryContact.firstName = 'Must not be empty';
        errors.primaryContact.lastName = 'Must not be empty';
    };
    if(isEmpty(data.primaryOfficeNumber) && isEmpty(data.primaryCellNumber)) {
        errors.primaryOfficeNumber = 'Must not be empty';
        errors.primaryCellNumber = 'Must not be empty';
    } else if(!isEmpty(data.primaryOfficeNumber) && !isPhoneNumber(data.primaryOfficeNumber)) {
        errors.primaryOfficeNumber = 'Must be a valid phone number';
    } else if(!isEmpty(data.primaryCellNumber) && !isPhoneNumber(data.primaryCellNumber)) {
        errors.primaryCellNumber = 'Must be a valid phone number';
    };
    if(isEmpty(data.primaryEmail)) {
        errors.primaryEmail = 'Must not be empty';
    } else if(!isEmail(data.primaryEmail)) {
        errors.primaryEmail = 'Must be a valid email address';
    };
    if(isEmpty(data.primaryJobTitle)) {
        errors.primaryJobTitle = 'Must not be empty';
    };
    if(data.shopAddress) {
        if(isEmpty(data.shopAddress.address)) {
            if(!errors.shopAddress) {
                errors.shopAddress = {};
            };
            errors.shopAddress.address = 'Must not be empty';
        };
        if(isEmpty(data.shopAddress.city)) {
            if(!errors.shopAddress) {
                errors.shopAddress = {};
            };
            errors.shopAddress.city = 'Must not be empty';
        };
        if(isEmpty(data.shopAddress.state)) {
            if(!errors.shopAddress) {
                errors.shopAddress = {};
            };
            errors.shopAddress.state = 'Must not be empty';
        };
        if(isEmpty(data.shopAddress.zipcode)) {
            if(!errors.shopAddress) {
                errors.shopAddress = {};
            };
            errors.shopAddress.zipcode = 'Must not be empty';
        };
    } else {
        if(!errors.shopAddress) {
            errors.shopAddress = {};
        };
        errors.shopAddress.address = 'Must not be empty';
        errors.shopAddress.city = 'Must not be empty';
        errors.shopAddress.state = 'Must not be empty';
        errors.shopAddress.zipcode = 'Must not be empty';
    };
    if(!data.noBillingContact) {
        if(data.billingContact) {
            if(isEmpty(data.billingContact.firstName)) {
                if(!errors.billingContact) {
                    errors.billingContact = {};
                };
                errors.billingContact.firstName = 'Must not be empty';
            };
            if(isEmpty(data.billingContact.lastName)) {
                if(!errors.billingContact) {
                    errors.billingContact = {};
                };
                errors.billingContact.lastName = 'Must not be empty';
            };
        } else {
            if(!errors.billingContact) {
                errors.billingContact = {};
            };
            errors.billingContact.firstName = 'Must not be empty';
            errors.billingContact.lastName = 'Must not be empty';
        };
        if(isEmpty(data.billingOfficeNumber) && isEmpty(data.billingCellNumber)) {
            errors.billingOfficeNumber = 'Must not be empty';
            errors.billingCellNumber = 'Must not be empty';
        } else if(!isEmpty(data.billingOfficeNumber) && !isPhoneNumber(data.billingOfficeNumber)) {
            errors.billingOfficeNumber = 'Must be a valid phone number';
        } else if(!isEmpty(data.billingCellNumber) && !isPhoneNumber(data.billingCellNumber)) {
            errors.billingCellNumber = 'Must be a valid phone number';
        };
        if(isEmpty(data.billingEmail)) {
            errors.billingEmail = 'Must not be empty';
        } else if(!isEmail(data.billingEmail)) {
            errors.billingEmail = 'Must be a valid email address';
        };
        if(isEmpty(data.billingJobTitle)) {
            errors.billingJobTitle = 'Must not be empty';
        };
        if(data.billingAddress) {
            if(isEmpty(data.billingAddress.address)) {
                if(!errors.billingAddress) {
                    errors.billingAddress = {};
                };
                errors.billingAddress.address = 'Must not be empty';
            };
            if(isEmpty(data.billingAddress.city)) {
                if(!errors.billingAddress) {
                    errors.billingAddress = {};
                };
                errors.billingAddress.city = 'Must not be empty';
            };
            if(isEmpty(data.billingAddress.state)) {
                if(!errors.billingAddress) {
                    errors.billingAddress = {};
                };
                errors.billingAddress.state = 'Must not be empty';
            };
            if(isEmpty(data.billingAddress.zipcode)) {
                if(!errors.billingAddress) {
                    errors.billingAddress = {};
                };
                errors.billingAddress.zipcode = 'Must not be empty';
            };
        } else {
            if(!errors.billingAddress) {
                errors.billingAddress = {};
            };
            errors.billingAddress.address = 'Must not be empty';
            errors.billingAddress.city = 'Must not be empty';
            errors.billingAddress.state = 'Must not be empty';
            errors.billingAddress.zipcode = 'Must not be empty';
        };
    }

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

exports.validateTaskData = data => {
    let errors = {};

    if(isEmpty(data.taskDescription)) {
        errors.taskDescription = 'Must not be empty';
    };
    if(isEmpty(data.taskDate)) {
        errors.taskDate = 'Must not be empty';
    };
    if(isEmpty(data.taskTime)) {
        errors.taskTime = 'Must not be empty';
    };
    if(isEmpty(data.employeeId)) {
        errors.employeeId = 'Must select an option';
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