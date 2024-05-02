# Simple Interest Calculator

## Overview
This project is a simple interest calculator implemented using HTML, CSS, and JavaScript for the frontend and Express.js for the backend.

### Backend (Express.js):
- Creates a server on port 3000/SimpleInterest.
- Accepts parameters as query from the URL.
- Collects amount, duration, and interest rate from the URL.
- Performs the computation to calculate simple interest.
- Returns the result using `res.send()`.

### Frontend:
- Implements a basic HTML and CSS design.
- Utilizes debouncing logic to prevent sending numerous unnecessary requests.
- Uses `setTimeout` and `clearTimeout` functions to create the logic of debouncing.
- Sets all input fields to `oninput` event listeners, triggering a request whenever there is a change in input.
- Adds an extra layer of debouncing to prevent sending a request if amount, years, and interest fields are not updated.
- Utilizes `fetch()` calls to send a GET request to the Express server.
- Implements async function logic to get response from backend 
- Dynamically update the website with the response.

## Usage
1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies: `npm install`.
4. Start the Express server: `npm start`.
5. Access the calculator via your browser at `http://localhost:3000/SimpleInterest`.
6. Input the amount, duration, and interest rate.
7. View the calculated simple interest.
