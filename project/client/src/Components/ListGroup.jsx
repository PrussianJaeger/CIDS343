import { useState } from 'react';

function ListGroup() {

    let items = [
        'Account',
        'Saving',
        'Spending',
        'Learn More',
        'Settings'
    ];

    // Mock data for item details
    const itemDetails = {
        Account: 'Account details: This is your main account.',
        Saving: 'Saving details: This is your savings account.',
        Spending: 'Spending details: This is your spending account.',
        'Learn More': 'Learn More: Here you can find additional resources.',
        Settings: 'Settings: Manage your preferences here.'
    };

    //hook
    const [selectedIndex, setSelectedIndex] = useState(-1);


    return (
        <>
            <h1>Navigation</h1>
            <ul className="list-group">
                {items.map((item, index) => ( //return the items and their index
                    <li
                        key={index}
                        // click on an item and highlight it
                        className={
                            selectedIndex === index ? 'list-group-item active' : 'list-group-item'}
                        onClick={() => { setSelectedIndex(index); }}
                        style={{ cursor: 'pointer' }}
                    >
                        {item}
                    </li>
                ))}
            </ul>

            {/* Display details of the selected item */}
            {selectedIndex !== -1 && (
                <div className="item-details">
                    <h2>{items[selectedIndex]}</h2>
                    <p>{itemDetails[items[selectedIndex]]}</p>
                </div>
            )}
        </>
    )
}

export default ListGroup;