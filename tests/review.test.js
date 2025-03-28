const request = require('supertest');
const app = require('../src/app');
const sequelize = require('../src/config/database.test');
const Review = require('../src/models/reviewModel');

// Create a server variable in wider scope
let server;
let agent;

beforeAll(async () => {
    try {
        await sequelize.authenticate();
        console.log('Test database connected successfully');
        await sequelize.sync({ force: true });
        // Start server and store reference
        server = app.listen(3001);
        agent = request.agent(server);
    } catch (error) {
        console.error('Unable to connect to the test database:', error);
        throw error;
    }
});

beforeEach(async () => {
    await Review.destroy({ where: {} }); // Clear all records before each test
});

afterAll(async () => {
    return new Promise((resolve) => {
        server.close(() => {
            sequelize.close()
                .then(() => resolve())
                .catch(err => {
                    console.error('Error during cleanup:', err);
                    resolve();
                });
        });
    });
});

describe('Review API', () => {
    const testReview = {
        "product_id": "XXXX08831",
        "web_id": "99998614",
        "review": "T222his prodect is very comfortable and stylish. You should buy this prodect .I'm so happy with myntra . Superb febric. 110% setsfid with mynta. ",
        "user_name": "Test User",
        "review_date": "2023-05-27",
        "review_number": 3
    };

    describe('POST /product-review-api/reviews', () => {
        it('should create a new review', async () => {
            const response = await agent
                .post('/product-review-api/reviews')
                .send(testReview)
                .set('Content-Type', 'application/json');
            
            expect(response.status).toBe(201);
            expect(response.body.product_id).toBe(testReview.product_id);
        });
    });

    describe('GET /product-review-api/reviews/product/:product_id', () => {
        it('should get reviews by product ID', async () => {
            await Review.create(testReview);

            const response = await agent
                .get(`/product-review-api/reviews/product/${testReview.product_id}`);
            
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
        });
    });

    describe('GET /product-review-api/reviews/:web_id', () => {
        it('should get reviews by web_id', async () => {
            await Review.create(testReview);

            const response = await agent
                .get(`/product-review-api/reviews/${testReview.web_id}`);
            
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body[0].web_id).toBe(testReview.web_id);
        });
    });

    describe('PUT /product-review-api/reviews/:product_id/:review_number', () => {
        it('should update a review', async () => {
            await Review.create(testReview);

            const updateData = {
                review: 'Updated review content',
                product_id: testReview.product_id,
                web_id: testReview.web_id,
                user_name: testReview.user_name,
                review_number: testReview.review_number
            };

            const response = await agent
                .put(`/product-review-api/reviews/${testReview.product_id}/${testReview.review_number}`)
                .send(updateData);
            
            expect(response.status).toBe(200);
            expect(response.body.review).toBe(updateData.review);
        });
    });

    describe('DELETE /product-review-api/reviews/:product_id/:review_number', () => {
        it('should delete a review', async () => {
            await Review.create(testReview);

            const response = await agent
                .delete(`/product-review-api/reviews/${testReview.product_id}/${testReview.review_number}`);
            
            expect(response.status).toBe(204);
        });
    });
});