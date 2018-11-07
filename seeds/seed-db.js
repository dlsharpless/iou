const db = require('../models');

const users = [
  {
    email: "admin",
    password: "admin",
    name: "",
    phone: "",
  },
  {
    email: "user1@user1.com",
    password: "password1",
    name: "User One",
    phone: "111-111-1111",
  },
  {
    email: "user2@user2.com",
    password: "password2",
    name: "User Two",
    phone: "222-222-2222",
  },
  {
    email: "user3@user3.com",
    password: "password3",
    name: "User Three",
    phone: "333-333-3333",
  }
];

const loans = [
  {
    lender: "user1@user1.com",
    borrower: "user3@user3.com",
    status: "Closed",
    principal: 100,
    interest: 50,
    balance: 0,
    startDate: "10/01/2018",
    endDate: "10/31/2018",
    notes1: "user1@user1.com: Loan for new car battery",
    notes2: "user3@user3.com: I 'll pay you back with interest."
  },
  {
    lender: "user2@user2.com",
    borrower: "user1@user1.com",
    status: "Active",
    principal: 50,
    interest: 10,
    balance: 30,
    startDate: "11/01/2018",
    endDate: "11/15/2018",
    notes1: "user1@user1.com: Loan for locksmith",
    notes2: "user2@user2.com: Make another set of keys and I'll hang on to them for you in the future!"
  },
  {
    lender: "user3@user3.com",
    borrower: "user2@user2.com",
    status: "Denied",
    principal: 600,
    interest: 200,
    balance: 0,
    startDate: "09/01/2018",
    endDate: "01/31/2019",
    notes1: "user2@user2.com: Loan for computer",
    notes2: "user3@user3.com: I can't afford to make this loan."
  },
  {
    lender: "user3@user3.com",
    borrower: "user1@user1.com",
    status: "Pending",
    principal: 1000,
    interest: 200,
    startDate: "11/07/2018",
    endDate: "11/07/2019",
    notes1: "user1@user1.com: Loan for housing deposit and rent",
    authority: "user3@user3.com"
  }
];

db.sequelize.sync({}).then(function () {
 db.loans.bulkCreate(loans).then(function (rows) {
   console.log('\n\nINSERTED\n\n');
  }).catch(function (err) {
   console.log('\n\nError:', err);
  });
   db.users.bulkCreate(users).then(function (rows) {
    console.log('\n\nINSERTED\n\n');
  }).catch(function (err) {
    console.log('\n\nError:', err);
  });
});
