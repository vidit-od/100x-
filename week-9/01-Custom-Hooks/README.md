# React Components and Custom Hooks

## Class-Based Components

### Writing a Class-Based Component

Class-based components were widely used in React before functional components with hooks became the standard. Here's an example of how to write a class-based component:

```javascript
import React from 'react';
import './App.css';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  incrementCount = () => {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <br />
        <button onClick={this.incrementCount}>Increment</button>
      </div>
    );
  }
}

export default MyComponent;
```

While class-based components are still supported, functional components are now preferred due to their simplicity and the power of hooks.

## Functional Components and Lifecycle Events

Functional components use hooks to manage state and lifecycle events. The `useEffect` hook is used to handle side effects such as data fetching, subscriptions, or manually changing the DOM.

### Accessing Lifecycle Events in Functional Components

In class-based components, lifecycle events were handled with specific methods like `componentDidMount` and `componentWillUnmount`. In functional components, you achieve this with the `useEffect` hook:

```javascript
import React, { useEffect, useState } from 'react';

function MyFunctionalComponent() {
  const [variable, setVariable] = useState(null);

  useEffect(() => {
    // This is the mounting logic

    return () => {
      // This is the unmounting logic
    };
  }, [variable]); // This effect runs when 'variable' changes

  return <div>{/* Component JSX */}</div>;
}
```

Upon mounting, the first part of the `useEffect` hook runs. When `variable` changes, the cleanup function (return) runs first, followed by the new effect logic.

## Custom Hooks

Custom hooks are a way to reuse stateful logic across different components. They are essentially functions that can use React hooks internally.

### Examples of Custom Hooks

- **Data fetching hooks**
- **Browser functionality related hooks** (e.g., `useOnlineStatus`, `useWindowSize`, `useMousePosition`)
- **Performance/Timer based hooks** (e.g., `useInterval`, `useDebounce`)

### Creating a Custom Data Fetching Hook

Here's an example of a custom hook to fetch data:

```javascript
import { useState, useEffect } from 'react';
import axios from 'axios';

function useTodo() {
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    axios.get('url').then(res => {
      setTodo(res.data.todo);
    });
  }, []);

  return todo;
}

export default useTodo;
```

You can use this custom hook in any functional component:

```javascript
import React from 'react';
import useTodo from './useTodo';

function TodoList() {
  const todos = useTodo();

  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </div>
  );
}
```

### Auto-Refreshing Hook

This custom hook implements polling to fetch data periodically:

```javascript
import { useState, useEffect } from 'react';
import axios from 'axios';

function useTodo() {
  const [todo, setTodo] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = () => {
    axios.get('http://localhost:3000/api/v1/user/bulk?filter=').then(res => {
      setTodo(res.data.users);
      setLoading(false);
    });
  };

  useEffect(() => {
    getData();
    const timer = setInterval(() => {
      getData();
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return {
    todo,
    loading
  };
}

export default useTodo;
```

This hook fetches data every second and returns both the data and the loading state, which can be used in a component as follows:

```javascript
import React from 'react';
import useTodo from './useTodo';

function AutoRefreshingTodoList() {
  const { todo, loading } = useTodo();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {todo.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

By using custom hooks, you can encapsulate and reuse logic across multiple components, making your code more modular and easier to maintain.