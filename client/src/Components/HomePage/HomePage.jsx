import React, { useEffect, useState } from 'react';
import './HomePage.css';
import Ticket from '../Ticket/Ticket';

function HomePage() {
    const [search, setSearch] = useState("");
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/tickets').then(response => {
            response.json().then(tickets => {
                console.log('Tickets:', tickets); // Add this line for debugging
                setTickets(tickets);
            });
        });
    }, []);


    return (
        <div className='homepageContainer'>
            <div className="searchAndFilter">
                <div className="searchbox">
                    <label>Search your events here</label>
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>

                <div className="filterBtns">
                    <select>
                        <option value="price">Price</option>
                        <option value="low_high">Low to High</option>
                        <option value="high_low">High to Low</option>
                    </select>
                    <select>
                        <option value="date">Date</option>
                        <option value="low_high">Low to High</option>
                        <option value="high_low">High to Low</option>
                    </select>
                </div>
            </div>

            <div className="ticketsList">
                {tickets.length > 0 && tickets.map(tick => (
                    <Ticket key={tick._id} {...tick} />
                ))}
            </div>
        </div>
    );
}

export default HomePage;
