
# Week 7 Class 2

## Recoil as State Management Tool

Recoil is introduced as a state management library that offers syntactic improvements and optimizations to prevent unnecessary rerenders in React applications. It addresses the need for efficient state management, particularly in scenarios where Context API might lead to unnecessary rerenders.

### Need of Recoil

1. **Syntactic Improvements**: Recoil enhances code readability and maintainability by providing a cleaner syntax compared to traditional state management approaches.

2. **Optimizations**: Recoil offers optimizations to prevent unnecessary rerenders, improving the performance of React applications.

### Recoil vs. Context API

In Context API, even if intermediate components don't utilize state variables, they will still rerender when the state changes. Recoil helps prevent this by optimizing component rendering, making applications more efficient.

### Things Learned in Recoil

- **RecoilRoot**: Similar to `Component.provider` in Context API, `RecoilRoot` is wrapped around the `App.js` file to enable the use of Recoil throughout the application.

- **Atom**: Recoil utilizes the concept of an atom, which represents the smallest possible state. It's recommended to organize atoms in a directory like `root/store/atom`.

  - Syntax to declare an atom:
    ```javascript
    import { atom } from 'recoil';

    export const countAtom = atom({
        key: 'countAtom',
        default: 0
    });
    ```

  - The `key` attribute uniquely identifies an atom.

- **useRecoilState**: 
  - Syntax:
    ```javascript
    const [count, setCount] = useRecoilState(countAtom);
    ```
  - Object destructuring syntax to access state variables.

- **useRecoilValue**: 
  - Syntax:
    ```javascript
    const count = useRecoilValue(countAtom);
    ```
  - Returns only the value.

- **useSetRecoilState**: 
  - Syntax:
    ```javascript
    const setCount = useSetRecoilState(countAtom);
    ```
  - Returns the setting function.

### Optimizations with Recoil Functions

A common question arises regarding the need for `useRecoilValue` and `useSetRecoilState` when `useRecoilState` provides both value and setting function. In scenarios where a component only needs to display the state (like a counter display component), separating value and setting functions avoids unnecessary rerenders triggered by state changes in unrelated components.

For example, if a component only needs to display the state (like a counter display component), separating value and setting functions avoids unnecessary rerenders triggered by state changes in unrelated components.

### Selector

Selectors allow for derived state management in Recoil.

- Define a selector in the `store/atom` directory:
  ```javascript
  export const countSelector = selector({
      key: 'countSelector',
      get: ({ get }) => {
          const count = get(countAtom);
          return count % 2;
      }
  });
  ```

- Use `useRecoilValue` to get the selector value.

  The functionality provided by selectors can also be implemented using `useMemo` hook, but the Recoil syntax offers improved code readability.

### Implementation in Application

To use Recoil in your React application, wrap your root component (e.g., `App.js`) with the `RecoilRoot` component:

```jsx
import React from 'react';
import { RecoilRoot } from 'recoil';
import PropDrill from './PropDrill'; // Assuming this is the component where you want to use Recoil

const App = () => {
  return (
    <RecoilRoot>
      <PropDrill />
    </RecoilRoot>
  );
};

export default App;
```

This allows the Recoil state to be available throughout the application, enabling components to use Recoil for state management.
