const express = require('express');
const ReviewController = require('../controllers/reviewController');
const Review = require('../models/reviewModel');

const router = express.Router();
const reviewController = new ReviewController(Review);

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - product_id
 *         - web_id
 *         - review
 *         - user_name
 *         - review_number
 *       properties:
 *         product_id:
 *           type: string
 *           description: Product identifier
 *         web_id:
 *           type: string
 *           description: Unique web identifier
 *         review:
 *           type: string
 *           description: Review content
 *         user_name:
 *           type: string
 *           description: Name of the reviewer
 *         review_date:
 *           type: string
 *           format: date-time
 *           description: Date of the review
 *         review_number:
 *           type: integer
 *           description: Review rating
 */

/**
 * @swagger
 * /product-review-api/reviews/product/{product_id}:
 *   get:
 *     summary: Get reviews by product
 *     parameters:
 *       - in: path
 *         name: product_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 */
router.get('/product/:product_id', reviewController.getReviewsByProduct.bind(reviewController));

/**
 * @swagger
 * /product-review-api/reviews/{web_id}:
 *   get:
 *     summary: Get a review by web_id
 *     parameters:
 *       - in: path
 *         name: web_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: Review not found
 */
router.get('/:web_id', reviewController.getReviewByWebId.bind(reviewController));

/**
 * @swagger
 * /product-review-api/reviews:
 *   post:
 *     summary: Create a new review
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       201:
 *         description: Review created
 *       400:
 *         description: Invalid input
 */
router.post('/', reviewController.createReview.bind(reviewController));

/**
 * @swagger
 * /product-review-api/reviews/{product_id}/{review_number}:
 *   put:
 *     summary: Update a specific review for a product
 *     parameters:
 *       - in: path
 *         name: product_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID of the review
 *       - in: path
 *         name: review_number
 *         required: true
 *         schema:
 *           type: integer
 *         description: The review number (e.g., 99.00)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       200:
 *         description: Review updated successfully
 *       404:
 *         description: Review not found
 *       400:
 *         description: Invalid input
 */
router.put('/:product_id/:review_number', reviewController.updateReview.bind(reviewController));

/**
 * @swagger
 * /product-review-api/reviews/{product_id}/{review_number}:
 *   delete:
 *     summary: Delete a specific review for a product
 *     parameters:
 *       - in: path
 *         name: product_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID of the review
 *       - in: path
 *         name: review_number
 *         required: true
 *         schema:
 *           type: number
 *           format: float
 *         description: The review number (e.g., 99.00)
 *     responses:
 *       204:
 *         description: Review deleted successfully
 *       404:
 *         description: Review not found
 */
router.delete('/:product_id/:review_number', reviewController.deleteReview.bind(reviewController));

module.exports = router;