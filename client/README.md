# Digital Diner Client README

## Overview
The Digital Diner is a mini restaurant ordering system that allows users to browse the menu and place pickup orders online. This client-side application is built using React and Vite, providing a user-friendly interface for customers to interact with the restaurant's offerings.

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the client directory:
   ```
   cd digital-diner/client
   ```
3. Install the dependencies:
   ```
   npm install
   ```

### Running the Application
To start the development server, run:
```
npm run dev
```
This will start the application on `http://localhost:3000` (or another port if specified).

### Building for Production
To create a production build of the application, run:
```
npm run build
```
The build files will be generated in the `dist` directory.

## Features
- **Menu Display**: Users can view categorized menu items.
- **Shopping Cart**: Users can add items to a cart, view cart contents, and see the total price.
- **Order Placement**: Users can submit their contact information and order details.
- **Order Confirmation**: Users receive a confirmation message after placing an order.
- **Order History**: Users can view past orders associated with their phone number.

## API Integration
The client communicates with the backend API to fetch menu items and submit orders. Ensure the backend server is running and accessible for the client to function correctly.

## Deployment
The frontend application is deployed on Netlify. Ensure that the backend API is accessible from the deployed frontend.

## Assumptions
- The backend API is properly set up and running.
- Users have a stable internet connection to access the application.

## Challenges Faced
- Integrating the frontend with the backend API required careful handling of asynchronous requests and state management.
- Ensuring a responsive design that works well on various devices.

## Acknowledgments
Thanks to the open-source community for providing the tools and libraries that made this project possible.