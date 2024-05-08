import React, { useState, useMemo } from 'react';
// You have been given a list of items you shopped from the grocery store
// You need to calculate the total amount of money you spent

export const Assignment3 = () => {
    const [items, setItems] = useState([
        { name: 'Chocolates', value: 10 },
        { name: 'Chips', value: 20 },
        { name: 'Onion', value: 30 },
        { name: 'Tomato', value: 30 },
        // Add more items as needed
    ]);
    const [itemName, setItemName] = useState('');
    const [itemValue, setItemValue] = useState(0);

    // Your code starts here
    const totalValue = useMemo(()=>{
        let total = 0;
        items.forEach((item)=>{
            total = total + item.value;
        })
        return total;
    },[items])

    function AddList(){
        setItems([...items,{name: itemName,value: parseInt(itemValue)}])
    }
    // Your code ends here
    return (
        <div>
            <div className="inputs">
                <input type="text" name="" id="" onChange={(e) => setItemName(e.target.value)} />
                <input type="number" name="" id="" onChange={(e) => setItemValue(e.target.value)}/>
                <input type="button" value="add to list" onClick={AddList}/>
            </div>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item.name} - Price: ${item.value}</li>
                ))}
            </ul>
            <p>Total Value: {totalValue}</p>
        </div>
    );
};
