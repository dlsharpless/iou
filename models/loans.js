const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LoanSchema = new Schema({
    lender: {
        type: String,
        required: true
    },
    borrower: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    principal: {
        type: Schema.Types.Decimal128,
        required: true
    },
    interest: {
        type: Schema.Types.Decimal128,
        required: true
    },
    balance: {
        type: Schema.Types.Decimal128
    },
    startDate: {
        type: String
    },
    endDate: {
        type: String
    },
    notes1: {
        type: String
    },
    notes2: {
        type: String
    },
    authority: {
        type: String
    }
});

const Loan = mongoose.model('Loan', LoanSchema);
module.exports = Loan;
