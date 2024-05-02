# Todo List Application with State Comparison

## Overview

This project is a simple todo list application that demonstrates efficient state comparison to update the DOM without clearing it unnecessarily. The application fetches the new state of the todo list from an API endpoint and updates the DOM by identifying added, updated, and deleted tasks.

## Features

- Fetches the new state of the todo list from an API endpoint.
- Compares the new state with the old state to identify added, updated, and deleted tasks.
- Updates the DOM to reflect the changes in the todo list without clearing the entire DOM.
- Allows marking tasks as done.

## How to Use

1. Clone or download the repository to your local machine.
2. Set up the backend server by navigating to the project directory in your terminal and running the following command:

```
node express.js
```

3. Open the `index.html` file in your web browser.
4. Click the "Sync" button to fetch the new state of the todo list from the API endpoint.
5. The application will compare the new state with the old state and update the DOM accordingly. If there are no changes in the state, the DOM will not be cleared and updated unnecessarily.

## File Structure

The project consists of the following files:

- `index.html`: The main HTML file containing the structure of the todo list and script logic.
- `script.js`: The JavaScript file containing the logic for comparing states and updating the DOM.
- `styles.css`: The CSS file containing styles for the todo list.
- `data.js`: A JavaScript file containing dummy data for the todo list.
- `express.js`: The backend server file providing the API endpoint to fetch the new state of the todo list.

## Technologies Used

- **HTML, CSS, JavaScript**: Used for building the frontend structure, styles, and logic.
- **Express.js**: Used as the backend framework to provide the API endpoint.
- **Fetch API**: Used to make HTTP requests to the backend server and fetch the new state of the todo list.

## Approach

Unlike the sibling project "State_todo" where the entire DOM was cleared and reloaded with new content, this project adopts a more efficient approach. It compares the new state with the old state to identify differences, such as added, updated, and deleted tasks. By only updating the parts of the DOM that have changed, the application ensures optimal performance, especially when there are minimal changes in the state.

This approach mimics the behavior of React, which efficiently updates the UI by only re-rendering the components that have changed. It highlights the importance of using efficient state management techniques to enhance the performance and responsiveness of web applications.
