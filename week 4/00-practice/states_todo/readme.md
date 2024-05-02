# States Todo

## Overview

"States Todo" is a todo list application designed to demonstrate the concept of states in web development. In today's multi-user friendly applications, changes made by one user should be reflected in real-time across all other users' devices. Understanding states is crucial for achieving this synchronization.

## Purpose

The purpose of the "States Todo" project is to provide a foundational understanding of states in web development, particularly in the context of building real-time applications where data needs to be synchronized across multiple devices. By grasping the concept of states, developers can create efficient and responsive applications that deliver a seamless user experience.

## File Structure

The project consists of the following files and directories:

- `index.html`: The main HTML file containing the structure of the todo list and script logic.
- `styles.css`: The CSS file containing styles for the todo list.
- `express.js`: The backend of the application. It utilizes `data.js` and randomizing logic to pick a subset of todo tasks and return them to the frontend.
- `data.js`: A JavaScript file containing an array of 50+ objects, each representing a todo task.
- `frontend`: This directory contains the frontend logic. Each time the sync button is used, a request is sent to the backend, which returns a new state of the todo list. The old contents of the list are then cleared, and using logic similar to "Dumb Todo", the array of objects is used to repopulate the list.

## Technologies Used

- **HTML, CSS, JavaScript**: Used for building the frontend structure, styles, and logic.
- **Express.js**: Used as the backend framework to handle requests and responses.
- **Data.js**: Provides dummy data for the application.
- **React**: Although not used in this project, it is mentioned as a future direction for heavily utilizing states.

## Future Directions

While the current project demonstrates the manual handling of states using vanilla JavaScript and Express.js, future iterations may incorporate React to leverage its efficient state management capabilities. React is not just a frontend framework; it is essentially a difference calculating framework, which efficiently updates the UI based on changes in state. This allows frontend developers to focus more on the application logic rather than worrying about repopulating the UI.
