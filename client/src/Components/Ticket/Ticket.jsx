import React from 'react'
import { Link } from 'react-router-dom'

import './Ticket.css'

function Ticket({ _id, title, summary }) {
    return (
        <div className="ticket">
            <div className="randomColor">

            </div>
            <div className="ticketDetails">
                <Link to={`/ticket/${_id}`} className='ticketLink'> <h2> {title} </h2> </Link>
                <p className='summary'>
                    {summary}
                </p>
                <div className="buttonList">
                    <button type='button'>Register</button>
                    <button type='button'>Know more</button>
                </div>
            </div>
        </div>
    )
}

export default Ticket