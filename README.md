# Product Review API

## Overview
The Product Review API is a Node.js application that provides a RESTful API for managing product reviews. It allows users to perform CRUD operations on reviews stored in a PostgreSQL database.
This project is fully built using the recent trend of Vibe Coding. No code is manually written. LLM Used is Claude Sonnet 3.7 in Github Copilot Workspace
## Features
- Fetch reviews by product number or web ID
- Create, update, and delete reviews
- Swagger API documentation
- Error handling middleware
- Unit tests with Jest
- Docker support

## Project Structure
```
product-review-api
├── src/
│   ├── config/
│   │   ├── database.js          # Database configuration
│   │   ├── database.test.js     # Test database configuration
│   │   └── swagger.js           # Swagger documentation config
│   ├── controllers/
│   │   └── reviewController.js  # Controller for review operations
│   ├── models/
│   │   └── reviewModel.js       # Review model schema
│   ├── routes/
│   │   └── reviewRoutes.js      # API routes for reviews
│   ├── middleware/
│   │   └── errorHandler.js      # Error handling middleware
│   └── app.js                   # Express application setup
├── tests/
│   ├── review.test.js          # Integration tests
│   └── setup.js                # Test setup configuration
└── [other configuration files]
```

## Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn
- Docker & Docker Compose (optional)

## Environment Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd product-review-api
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   - Update the `.env` file with your database credentials:
   ```
   DATABASE_URL=postgres://username:password@localhost:5432/product_review_db
   PORT=3000
   NODE_ENV=development
   SECRET_KEY=your_secret_key
   ```

4. Database Setup:
   - Create PostgreSQL database:
   ```sql
   CREATE TABLE commerce_product_review
      ( product_id TEXT NOT NULL,
      web_id TEXT NOT NULL, 
      review TEXT NOT NULL,
      user_name TEXT , 
      review_date DATE , 
      review_number INTEGER NOT NULL,
      CONSTRAINT commerce_product_reviews_pkey PRIMARY KEY (product_id, review_number)
   );

   ```
   - The tables will be created automatically when you start the application (using Sequelize sync)

## Running the Application

### Local Development
```bash
# Start in development mode with nodemon
npm run dev

# Start in production mode
npm start
```

### Using Docker
```bash
# Build and start containers
docker-compose up --build

# Stop containers
docker-compose down
```

The API will be available at: `http://localhost:3000`
Swagger Documentation: `http://localhost:3000/api-docs`

## API Endpoints

### Reviews API
- `GET /product-review-api/reviews/product/:review_product_id` - Get reviews by product ID
- `GET /product-review-api/reviews/:web_id` - Get reviews by web ID
- `POST /product-review-api/reviews` - Create a new review
- `PUT /product-review-api/reviews/:review_product_id/:review_number` - Update a review
- `DELETE /product-review-api/reviews/:review_product_id/:review_number` - Delete a review

### Request & Response Examples

#### Create Review
```json
POST /product-review-api/reviews
{
        "product_id": "XXXX08831",
        "web_id": "99998614",
        "review": "T222his prodect is very comfortable and stylish. You should buy this prodect .I'm so happy with myntra . Superb febric. 110% setsfid with mynta. ",
        "user_name": "Test User",
        "review_date": "2023-05-27",
        "review_number": 3
}
```

## Testing

### Running Tests
```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch
```

### Test Database
Tests use a separate database configuration. Create a `.env.test` file:
```
DATABASE_URL=postgres://username:password@localhost:5432/product_review_test_db
NODE_ENV=test
PORT=3001
```

## Troubleshooting

### Common Issues
1. Database Connection Failed
   - Check if PostgreSQL is running
   - Verify database credentials in `.env`
   - Ensure database exists

2. Port Already in Use
   - Change PORT in `.env`
   - Check for other running processes

### SSL Configuration
If you're connecting to a remote database with SSL:
```javascript
// SSL configuration is already handled in database.js
dialectOptions: {
  ssl: {
    require: true,
    rejectUnauthorized: false
  }
}
```

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License.
