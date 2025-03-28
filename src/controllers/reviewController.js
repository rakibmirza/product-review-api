class ReviewController {
    constructor(reviewModel) {
        this.reviewModel = reviewModel;
    }

    async getReviewsByProduct(req, res) {
        try {
            const { product_id } = req.params;
            const reviews = await this.reviewModel.findAll({ 
                where: { product_id }
            });
            res.status(200).json(reviews);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching reviews', error });
        }
    }

    async getReviewByWebId(req, res) {
        try {
            const { web_id } = req.params;
            const reviews = await this.reviewModel.findAll({ 
                where: { web_id }  // Changed to search by web_id
            });
            if (reviews && reviews.length > 0) {
                res.status(200).json(reviews);
            } else {
                res.status(404).json({ message: 'Reviews not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error fetching reviews', error });
        }
    }

    async createReview(req, res) {
        try {
            const requiredFields = ['product_id', 'web_id', 'review', 'user_name', 'review_number'];
            const missingFields = requiredFields.filter(field => !req.body[field]);
            
            if (missingFields.length > 0) {
                return res.status(400).json({ 
                    message: 'Missing required fields', 
                    fields: missingFields 
                });
            }

            const reviewData = {
                ...req.body,
                review_date: req.body.review_date || new Date()
            };

            const newReview = await this.reviewModel.create(reviewData);
            res.status(201).json(newReview);
        } catch (error) {
            res.status(400).json({ 
                message: 'Error creating review', 
                error: error.message 
            });
        }
    }

    async updateReview(req, res) {
        try {
            const { product_id, review_number } = req.params;
            const [updated] = await this.reviewModel.update(req.body, {
                where: { 
                    product_id,
                    review_number: parseInt(review_number) // Changed from parseFloat to parseInt
                }
            });
            if (updated) {
                const updatedReview = await this.reviewModel.findOne({ 
                    where: { 
                        product_id,
                        review_number: parseInt(review_number) // Changed from parseFloat to parseInt
                    } 
                });
                res.status(200).json(updatedReview);
            } else {
                res.status(404).json({ message: 'Review not found' });
            }
        } catch (error) {
            res.status(400).json({ 
                message: 'Error updating review', 
                error: error.message 
            });
        }
    }

    async deleteReview(req, res) {
        try {
            const { product_id, review_number } = req.params;
            const deleted = await this.reviewModel.destroy({
                where: { 
                    product_id,
                    review_number: parseInt(review_number) // Changed from parseFloat to parseInt
                }
            });
            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Review not found' });
            }
        } catch (error) {
            res.status(500).json({ 
                message: 'Error deleting review', 
                error: error.message 
            });
        }
    }
}

module.exports = ReviewController;