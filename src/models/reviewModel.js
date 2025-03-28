// This file defines the Review model, which represents the "product_reviews" table in the database.

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Review extends Model {}

Review.init({
    product_id: {  // Changed from review_product_id
        type: DataTypes.TEXT,
        allowNull: false,
        primaryKey: true
    },
    web_id: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    review: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    user_name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    review_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    review_number: {
        type: DataTypes.INTEGER,  // Changed from DECIMAL(10,2) to INTEGER
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Review',
    tableName: process.env.NODE_ENV === 'test' ? 'test_commerce_product_review' : 'commerce_product_review',
    timestamps: false,
    id: false  // Tell Sequelize not to assume an 'id' column
});

module.exports = Review;