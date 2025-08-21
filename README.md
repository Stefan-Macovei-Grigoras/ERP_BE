Below is the proposed README file for Stefan-Macovei-Grigoras/ERP_BE. This document has been composed based entirely on the project’s source code, which includes controllers for batches, ingredients, products, recipes, user authentication, models defined with Sequelize, and supporting configuration and WebSocket integration.

------------------------------------------------------------

# ERP_BE

## Introduction

ERP_BE is a backend service designed for managing enterprise resource planning (ERP) operations. It offers RESTful endpoints to manage production batches, products, ingredients, and recipes, as well as user authentication and real-time notifications through WebSockets. Built using Node.js and Express, the project leverages Sequelize as its ORM to interact with a MySQL (or similar SQL) database. Security and robustness are enhanced with middleware such as Helmet, CORS, and rate limiting.

------------------------------------------------------------

## Features

- **Batch Management:**  
  Provides CRUD operations for managing batches related to product manufacturing processes. The batch functionality includes automatic timestamp management when transitioning through stages like processing, packaging, and completion. Code examples show endpoints for creating, fetching, updating, and deleting batches with detailed logging, along with handling stage changes (e.g., auto-setting startedAt, finishedAt timestamps) fileciteturn0file7.

- **Product Management:**  
  Allows fetching, creating, updating, and deleting products. The routes incorporate logging for every operation and enforce validations to ensure that product data such as name, category, price, and quantity are correctly maintained fileciteturn0file4.

- **Ingredient Management:**  
  Provides endpoints for managing raw ingredients, handling operations such as retrieving all ingredients, adding new ingredients, updating existing ones, and deletion. The ingredient controller enforces quantity and threshold values for proper inventory control fileciteturn0file10.

- **Recipe Handling:**  
  Supports managing product recipes. Recipes are linked to products and can include various steps and ingredient associations. The ORM relationships ensure that recipes are correctly tied to the products they belong to.

- **User Authentication:**  
  Features a login mechanism using JSON Web Tokens (JWT). Upon successful authentication, the API returns a token along with user details. There is also an endpoint to verify tokens, ensuring each request is securely authenticated fileciteturn0file17.

- **WebSocket Integration:**  
  Real-time communication is enabled using WebSockets. The server sets up a WebSocket endpoint to allow clients (for example, ESP32 devices or frontend clients) to connect and receive live updates, with appropriate logging built in to monitor connection status and message broadcasting fileciteturn0file13.

- **Robust Logging:**  
  Uses a custom logger built with picocolors to format messages, ensuring that errors, warnings, and successes are clearly reported across all operations fileciteturn0file14.

------------------------------------------------------------

## Requirements

Before installing and running ERP_BE, ensure that your environment meets the following requirements:

- Node.js (v14 or higher)
- npm (or yarn)
- MySQL or a compatible SQL database (configured via environment variables)
- Internet access to fetch npm dependencies

The project uses several npm packages including Express, Sequelize, MySQL2, Helmet, CORS, jsonwebtoken, socket.io, and more (see the package.json dependencies for a complete list fileciteturn0file18).

------------------------------------------------------------

## Installation

1. **Clone the Repository:**  
   Clone the repository to your local machine using the following git command:
   ```
   git clone https://github.com/Stefan-Macovei-Grigoras/ERP_BE.git
   ```

2. **Install Dependencies:**  
   Navigate to the project directory and install the required packages:
   ```
   cd ERP_BE/Server2
   npm install
   ```

3. **Configure Environment Variables:**  
   Create a `.env` file in the root of the Server2 folder. Define variables such as:
   - DB_NAME – the database name
   - DB_USER – database user
   - DB_PASSWORD – database password
   - DB_HOST – database host
   - DB_DIALECT – database dialect (e.g., mysql)
   - DB_PORT – database port
   - PORT – server port
   - JWT_SECRET – secret key for JWT token signing
   - CORS_ORIGIN – allowed origins (if additional configuration is needed)

   This configuration is used by the database configuration (see configuration in the database.js file fileciteturn0file19).

------------------------------------------------------------

## Usage

1. **Running the Server:**  
   You can run the API server using:
   ```
   npm start
   ```
   or for development with automatic restarts:
   ```
   npm run dev
   ```
   The server listens on the port defined in the environment variables (default is 5000).

2. **API Endpoints:**  
   The backend exposes several RESTful endpoints:
   - **/products** – GET, POST, PUT, DELETE for managing products.
   - **/ingredient** – GET, POST, DELETE, PUT for handling raw ingredients.
   - **/recipes** – GET (and possibly POST/PUT if extended) for managing recipes.
   - **/batches** – GET (all and by ID), POST, PUT, DELETE for handling manufacturing batches.
   - **/login** and **/verifyToken** – Endpoints for user authentication.
   
   Each endpoint includes comprehensive logging for operations. Review the controller files (e.g., batch.controller.js, product.controller.js, ingredient.controller.js) for specific implementation details fileciteturn0file7, fileciteturn0file10.

3. **WebSocket Connection:**  
   To enable real-time communication, connect to the WebSocket server at:
   ```
   ws://<server-ip>:<PORT>/ws
   ```  
   Clients connecting to this endpoint will receive messages broadcasted by the server. Refer to the webSocket.js file for details on the connection process fileciteturn0file13.

------------------------------------------------------------

## Contributing

Contributors are welcome. Here are some guidelines for contributing to ERP_BE:

- **Fork the Repository:** Create your own fork and clone it locally.
- **Branching:** Make your changes on a dedicated feature branch.
- **Code Quality:** Follow the existing code structure and maintain logging consistency.
- **Testing:** Ensure that new changes are tested against existing endpoints.
- **Pull Requests:** Submit a pull request with a clear description of the changes and any issues they address.

Before contributing, please review the coding style and conventions already established in the repository.

------------------------------------------------------------

## Configuration

ERP_BE is heavily configurable via environment variables. You can customize the following settings in your `.env` file:

- **Database Connection:**  
  Variables such as DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT, and DB_PORT are used in the Sequelize configuration to connect to your SQL database fileciteturn0file19.

- **Server Port:**  
  The PORT variable defines on which port the Express server will run.

- **JWT Secret:**  
  JWT_SECRET is used by the authentication routes to sign and verify tokens securely.

- **CORS:**  
  CORS_ORIGIN defines the allowed origins for cross-origin resource sharing. The code defines an array of allowed origins and dynamically validates requests based on that list.

- **Rate Limiting:**  
  The Express rate limit is set within app.js. You can adjust windowMs and max values to suit your traffic requirements.

- **Security Middlewares:**  
  Helmet and CORS are enabled by default in app.js to ensure that the API adheres to best practices for web security.

------------------------------------------------------------

This README provides a comprehensive overview of ERP_BE based on the current codebase and structure. The detailed logging, authentication, database management, and WebSocket integration make it a robust platform for managing ERP operations in an enterprise environment.