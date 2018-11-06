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
    status: "closed",
    principal: 100,
    interest: 50,
    balance: 0,
    initial_term: 30,
    start_date: 10/01/2018,
    end_date: 10/31/2018
  },
  {
    lender: "user2@user2.com",
    borrower: "user1@user1.com",
    status: "active",
    principal: 50,
    interest: 10,
    balance: 30,
    initial_term: 14,
    start_date: 11/01/2018,
    end_date: 11/15/2018
  },
  {
    lender: "user3@user3.com",
    borrower: "user2@user2.com",
    status: "pending",
    principal: 600,
    interest: 200,
    balance: 800,
    initial_term: 365,
    start_date: 11/07/2018,
    end_date: 11/07/2019
  },
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
