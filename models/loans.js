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
            allowNull: false
        },
        initial_term: {
            type: DataTypes.INTEGER
        },
        start_date: {
            type: DataTypes.DATE
        },
        end_date: {
            type: DataTypes.DATE
        }
    });

    return loans;
}
