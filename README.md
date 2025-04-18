# Digital Diner - Mini Restaurant Ordering System

## Project Overview
"The Digital Diner" is a full-stack web application designed to enhance the customer experience by allowing users to browse the menu and place pickup orders online. The application is built using the MERN stack (MongoDB, Express, React, Node.js) with PostgreSQL integrated for specific data management.

## Features
- **Menu Display**: Users can view a categorized list of available menu items.
- **Shopping Cart**: Users can add items to a cart, view cart contents, and see the total price.
- **Order Placement**: Users can submit their contact information and cart contents to place an order.
- **Order Confirmation/History**: Users receive a confirmation message after placing an order and can view past orders associated with their phone number.

## Technology Stack
- **Frontend**: React, Vite
- **Backend**: Node.js, Express
- **Databases**: MongoDB (for menu items), PostgreSQL (for user and order information)

## Database Design
- **MongoDB**: Used for storing menu items due to its flexible schema, allowing for potentially nested details and varying item attributes.
- **PostgreSQL**: Used for structured data related to users and orders, leveraging its relational capabilities for managing relationships between users and their orders.

## API Endpoints
- `GET /api/menu`: Fetch all menu items.
- `GET /api/menu/:id`: Fetch a single menu item's details.
- `POST /api/orders`: Create a new order with cart data and user info.
- `GET /api/orders/:phone`: Fetch orders based on user phone number.
- (Bonus) Additional endpoints for adding/editing menu items.

## Setup Instructions
### Backend
1. Navigate to the `server` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Set up your PostgreSQL database and MongoDB connection as specified in the `.env.example` file.
4. Start the server:
   ```
   node server.js
   ```

### Frontend
1. Navigate to the `client` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the React application:
   ```
   npm run dev
   ```

## Deployment
The frontend application is deployed on Netlify. Ensure that the backend API is accessible for the frontend to function correctly. Configure CORS on the backend to allow requests from the deployed Netlify URL.

## Challenges and Assumptions
- The project assumes a basic understanding of full-stack development and familiarity with the MERN stack.
- Challenges may include managing state effectively in React and ensuring smooth communication between the frontend and backend.

## Links
- [Deployed Frontend Application](#) (insert your Netlify link here)
- [GitHub Repository](#) (insert your GitHub repository link here)

## Conclusion
This project aims to provide a seamless online ordering experience for customers of "The Digital Diner," showcasing the capabilities of modern web technologies.