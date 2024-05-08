import { useEffect , useRef} from "react";

// Create a component with a text input field and a button. When the component mounts or the button is clicked, automatically focus the text input field using useRef.

export function Assignment1() {
    const myInput = useRef();
    useEffect(() => {
        myInput.current.focus();
    }, [myInput]);

    const handleButtonClick = () => {
        myInput.current.focus();
    };

    return (
        <div>
            <input ref={myInput} type="text" placeholder="Enter text here" />
            <button onClick={handleButtonClick} >Focus Input</button>
        </div>
    );
};
