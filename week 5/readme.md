# MERN TodoList

This repository contains the code for a TodoList application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The application allows users to manage their todos efficiently.

## Backend Setup

Follow these steps to set up the backend of the application:

1. Create a folder called "backend" using the following command:
   ```bash
   mkdir backend
   ```

2. Navigate to the backend directory:
   ```bash
   cd backend
   ```

3. Initialize a new Node.js project by running:
   ```bash
   npm init
   ```
   The `package.json` file created here is crucial as it contains metadata about the project, including dependencies. This file helps manage project dependencies efficiently.

   Importance of `package.json` file:
   - The `package.json` file lists all the dependencies required by the project, making it easier to manage and install them.
   - It enables others to replicate the project environment by installing the dependencies listed in the file.

4. Install Express.js to set up the server and routing logic:
   ```bash
   npm install express
   ```

5. Create an `index.js` file which contains the Express logic and routing for the application.

6. Create a `db.js` file to define the database schema.

7. Install Mongoose, a MongoDB object modeling tool designed to work in an asynchronous environment:
   ```bash
   npm install mongoose
   ```

8. Use Mongoose to define the schema in `db.js`. For this TodoList application, a single table is needed to store the title, description, and completion status of each todo item.

9. Create a file that contains input verification logic using Zod or any other validation library.

10. Test the backend using Postman requests and MongoDB Compass to confirm that GET, POST, and PUT logic are functioning correctly.

## Frontend Setup

Follow these steps to set up the frontend of the application:

1. Go to the root directory of the project.

2. Use the following command to create the boilerplate code for a React.js application:
   ```bash
   npm create vite@latest
   ```

3. Name the folder as "frontend" and choose React.js as the language.

4. The `app.jsx` file contains the main logic of the React application.

5. Create a folder named "components" to organize and structure the components of the application.
