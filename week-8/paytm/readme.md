# Payment App

## Overview

This payment app is designed to provide users with a seamless way to manage their accounts, transfer money, and keep track of their transactions. The application features both backend and frontend components, leveraging modern technologies such as Node.js, Express, MongoDB, React, and Tailwind CSS.

## Backend

### Database
- **Users DB**: Stores user information including personal details and authentication credentials.
- **Accounts DB**: Maintains account balances and transaction history.

### Features
1. **User Management**:
    - Create, update, and verify users.
    - Login functionality.
    - Filter users based on specific criteria.

2. **Account Management**:
    - Maintain account balances.
    - Transfer money between accounts.

### Important/New Implementations

#### 1. Filtering Users

To filter and find a subset of users based on their first or last name using regex and `$or`:

```javascript
const filterUsers = await User.find({
    $or: [
        { firstname: { $regex: filter } },
        { lastname: { $regex: filter } }
    ]
});
```

#### 2. Maintaining Atomic Properties in DB

To ensure atomicity during transactions and avoid issues if the server crashes, sessions are used:

```javascript
const transferSession = await mongoose.startSession();
transferSession.startTransaction();

try {
    // All DB fetches happen in this session
    const fromUserId = await User.findOne({ username: req.userid }).session(transferSession);
    const toUserId = await User.findOne({ username: to }).session(transferSession);

    // Updating the account also happens in this session
    await Bank.updateOne({ _id: fromBank._id }, { $inc: { balance: -amount } }).session(transferSession);
    await Bank.updateOne({ _id: toBank._id }, { $inc: { balance: amount } }).session(transferSession);

    await transferSession.commitTransaction();
} catch (error) {
    await transferSession.abortTransaction();
    throw error;
} finally {
    transferSession.endSession();
}
```

## Frontend

### Technologies
- **React**: For building the user interface.
- **Tailwind CSS**: For styling the application.

### Learning/Practicing
- Implementing Tailwind CSS within a React application.

### Features to Add
1. **Frontend**:
    - Update account logic.
    - Use custom hooks and Recoil for state management to prevent unnecessary re-renders and enhance efficiency.

2. **Backend**:
    - Implement password hashing to store passwords securely in the database.

3. **Both Frontend and Backend**:
    - Keep track of all transactions and display transaction history on the send page.

## Future Enhancements
- Improve the frontend by completing the account update logic.
- Secure the backend by hashing passwords before storing them.
- Optimize the React application using custom hooks and Recoil for better state management.
- Track and display all transactions as a history log for users.

## Installation and Setup

### Backend
1. Clone the repository.
2. Navigate to the backend directory.
3. Install dependencies: `npm install`
4. Start the server: `npm start`

### Frontend
1. Navigate to the frontend directory.
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

## Conclusion

This payment app provides a solid foundation for managing user accounts and transactions. With the planned enhancements, it will offer a more secure, efficient, and user-friendly experience.