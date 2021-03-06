const { admin, db } = require("../util/admin");

const config = require("../util/config");

const firebase = require("firebase");
firebase.initializeApp(config);

const {
  validateRegisterData,
  validateCustomerData,
  validateLoginData,
  validateUpdateData,
} = require("../util/middleware");

exports.getCurrentUser = (req, res) => {
  let userData = {};

  db.doc(`/users/${req.user.uid}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData = doc.data();
        return res.status(200).json(userData);
      } else {
        return res.status(404).json({ error: "User not found" });
      }
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};



exports.registerEmployee = (req, res) => {
  const newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    jobTitle: req.body.jobTitle,
    userType: "employee",
    active: true,
    tierLevel: req.body.tierLevel,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  };

  const { valid, errors } = validateRegisterData(newUser);

  if (!valid) {
    return res.status(400).json(errors);
  }

  let token, userId;
  firebase
    .auth()
    .createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idToken) => {
      token = idToken;
      const userCredentials = {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        jobTitle: newUser.jobTitle,
        userType: newUser.userType,
        active: newUser.active,
        tierLevel: newUser.tierLevel,
        phoneNumber: newUser.phoneNumber,
        email: newUser.email,
        userId,
      };
      return db.doc(`/users/${userId}`).set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        return res.status(400).json({ email: "Email is already in use" });
      } else if (err.code === "auth/invalid-email") {
        return res.status(400).json({ email: "Email is invalid" });
      } else {
        return res
          .status(500)
          .json({ general: "Something went wrong, please try again" });
      }
    });
};

exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  const { valid, errors } = validateLoginData(user);

  if (!valid) {
    return res.status(400).json(errors);
  }

  let response = {};

  db.collection('users').where('email', '==', user.email).limit(1).get()
      .then(data => {
          response.userType = data.docs[0].data().userType;
          response.firstName = data.docs[0].data().firstName;
          response.lastName = data.docs[0].data().lastName;
          response.tierLevel = data.docs[0].data().tierLevel;
          return firebase.auth().signInWithEmailAndPassword(user.email, user.password);
      })
      .then(user => {
          response.user = user.user
          return res.status(200).json(response);
      })
      .catch(err => {
          console.error(err);
          return res.status(403).json({ general: 'email or password is incorrect' });
      });
};

exports.getAllEmployees = (req, res) => {
  let employees = [];

  db.collection("users")
    .where("userType", "==", "employee")
    .get()
    .then((data) => {
      data.forEach((doc) => {
        if (doc.exists) {
          employees.push(doc.data());
        }
      });
      return res.status(200).json({ employees });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.getAllCustomers = (req, res) => {
  let customers = [];

  db.collection("users")
    .where("userType", "==", "customer")
    .orderBy("businessName")
    .get()
    .then((data) => {
      data.forEach((doc) => {
        if (doc.exists) {
          customers.push(doc.data());
        }
      });
      return res.status(200).json({ customers });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.getAllUsers = (req, res) => {
  let users = [];

  db.collection("users")
    .get()
    .then((data) => {
      data.forEach((doc) => {
        if (doc.exists) {
          users.push(doc.data());
        }
      });
      return res.status(200).json({ users });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.editEmployee = (req, res) => {
  let editedUserData = req.body;

  const { valid, errors } = validateUpdateData(editedUserData);

  if (!valid) {
    return res.status(400).json(errors);
  }

  db.doc(`/users/${req.body.userId}`)
    .update(editedUserData)
    .then(() => {
      return res.status(200).json({ message: "Update successful" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.changeEmployeeStatus = (req, res) => {
  let updatedStatus = { active: !req.body.active };

  db.doc(`/users/${req.body.userId}`)
    .update(updatedStatus)
    .then(() => {
      return res.status(200).json({ message: "Update successful" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.registerCustomer = (req, res) => {
  const newUser = {
    businessName: req.body.businessName,
    industry: req.body.industry,
    primaryContact: {
      firstName: req.body.primaryContact.firstName,
      lastName: req.body.primaryContact.lastName,
    },
    primaryOfficeNumber: req.body.primaryOfficeNumber,
    primaryExt: req.body.primaryExt,
    primaryCellNumber: req.body.primaryCellNumber,
    primaryEmail: req.body.primaryEmail,
    primaryJobTitle: req.body.primaryJobTitle,
    billingContact: {
      firstName: req.body.billingContact.firstName,
      lastName: req.body.billingContact.lastName,
    },
    billingOfficeNumber: req.body.billingOfficeNumber,
    billingExt: req.body.billingExt,
    billingCellNumber: req.body.billingCellNumber,
    billingEmail: req.body.billingEmail,
    billingJobTitle: req.body.billingJobTitle,
    shopAddress: {
      address: req.body.shopAddress.address,
      city: req.body.shopAddress.city,
      state: req.body.shopAddress.state,
      zipcode: req.body.shopAddress.zipcode,
    },
    billingAddress: {
      address: req.body.billingAddress.address,
      city: req.body.billingAddress.city,
      state: req.body.billingAddress.state,
      zipcode: req.body.billingAddress.zipcode,
    },
    noBillingContact: req.body.noBillingContact,
    userType: "customer",
    password: "Lifts2020!",
    employees: [],
  };

  const { valid, errors } = validateCustomerData(newUser);

  if (!valid) {
    return res.status(400).json(errors);
  }

  let token, userId;
  firebase
    .auth()
    .createUserWithEmailAndPassword(newUser.primaryEmail, newUser.password)
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idToken) => {
      token = idToken;
      const userCredentials = {
        businessName: req.body.businessName,
        industry: req.body.industry,
        primaryContact: {
          firstName: req.body.primaryContact.firstName,
          lastName: req.body.primaryContact.lastName,
        },
        primaryJobTitle: req.body.primaryJobTitle,
        primaryOfficeNumber: req.body.primaryOfficeNumber,
        primaryExt: req.body.primaryExt,
        primaryCellNumber: req.body.primaryCellNumber,
        primaryEmail: req.body.primaryEmail,
        billingContact: {
          firstName: req.body.billingContact.firstName,
          lastName: req.body.billingContact.lastName,
        },
        billingJobTitle: req.body.billingJobTitle,
        billingOfficeNumber: req.body.billingOfficeNumber,
        billingExt: req.body.billingExt,
        billingCellNumber: req.body.billingCellNumber,
        billingEmail: req.body.billingEmail,
        shopAddress: {
          address: req.body.shopAddress.address,
          city: req.body.shopAddress.city,
          state: req.body.shopAddress.state,
          zipcode: req.body.shopAddress.zipcode,
        },
        billingAddress: {
          address: req.body.billingAddress.address,
          city: req.body.billingAddress.city,
          state: req.body.billingAddress.state,
          zipcode: req.body.billingAddress.zipcode,
        },
        userType: "customer",
        employees: [],
        userId,
      };
      return db.doc(`/users/${userId}`).set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        return res.status(400).json({ email: "Email is already in use" });
      } else if (err.code === "auth/invalid-email") {
        return res.status(400).json({ email: "Email is invalid" });
      } else {
        return res
          .status(500)
          .json({ general: "Something went wrong, please try again" });
      }
    });
};

exports.editCustomer = (req, res) => {
  let editedUserData = req.body;

  const { valid, errors } = validateCustomerData(editedUserData);

  if (!valid) {
    return res.status(400).json(errors);
  }

  db.doc(`/users/${req.body.userId}`)
    .update(editedUserData)
    .then(() => {
      return res.status(200).json({ message: "Update successful" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.getCustomer = (req, res) => {
  const customerId = req.params.id;

  if (customerId) {
    db.doc(`/users/${customerId}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return res.status(200).json(doc.data());
        }
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
      });
  } else {
    console.error("Something went wrong");
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.addEmployeeToCustomer = (req, res) => {
  const customerId = req.body.userId;
  let updateData = req.body;

  console.log("here")
  console.log(updateData)

  if (customerId) {
    db.doc(`/users/${customerId}`)
      .update(updateData)
      .then(() => {
        return res.status(200).json({ message: "Update Successful" });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
      });
  }
};
