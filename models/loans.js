module.exports = function (sequelize, DataTypes) {
    const loans = sequelize.define("loans", {
        lender: {
            type: DataTypes.STRING,
            allowNull: false
        },
        borrower: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        principal: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        interest: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        balance: {
            type: DataTypes.DECIMAL(10, 2),
        },
        startDate: {
            type: DataTypes.STRING
        },
        endDate: {
            type: DataTypes.STRING
        },
        notes1: {
            type: DataTypes.STRING
        },
        notes2: {
            type: DataTypes.STRING
        },
        authority: {
            type: DataTypes.STRING
        }
    });

    return loans;
}
