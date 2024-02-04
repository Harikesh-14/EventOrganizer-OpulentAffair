import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import './TicketPage.css'
import { UserContext } from '../../UserContent'

function TicketPage() {
    const [ticketInfo, setTicketInfo] = useState(null)
    const { userInfo } = useContext(UserContext)

    const { id } = useParams()

    useEffect(() => {
        fetch(`http://localhost:3000/ticket/${id}`, {
            method: 'GET',
        }).then(response => {
            response.json().then(ticketInfo => {
                setTicketInfo(ticketInfo)
            })
        })
    }, [])

    if (!ticketInfo) {
        return ''
    }

    return (
        <div className='ticketPageContainer'>
            <div className="header">
                <p> {ticketInfo.title} </p>
                <div className="organizer">
                    <p><span>Organizer: </span> {ticketInfo.author.firstName} </p>
                    <p><span>Created: </span>01-02-2024</p>
                </div>
            </div>

            <div className="mainContent">
                <div dangerouslySetInnerHTML={{ __html: ticketInfo.content }} className='contentBody' />
            </div>

            <div className="imagesList">
                <img src={`http://localhost:3000/${ticketInfo.img1Cover}`} alt="Image 1" />
                <img src={`http://localhost:3000/${ticketInfo.img2Cover}`} alt="Image 2" />
                <img src={`http://localhost:3000/${ticketInfo.img3Cover}`} alt="Image 3" />
                <img src={`http://localhost:3000/${ticketInfo.img4Cover}`} alt="Image 4" />
            </div>

            <div className="extraDetails">
                <div className="date box">
                    <span>Date</span>
                    <p>{ticketInfo.date}</p>
                </div>
                <div className="time box">
                    <span>Time</span>
                    <p>{ticketInfo.time}</p>
                </div>
                <div className="dressCode box">
                    <span>Dress Code</span>
                    <p>{ticketInfo.dressCode}</p>
                </div>
                <div className="ticketPrice box">
                    <span>Price</span>
                    <p>RS. {ticketInfo.ticketPrice}</p>
                </div>
                <div className="upi box">
                    <span>To Pay</span>
                    <p>RS. {ticketInfo.upi}</p>
                </div>
            </div>
        </div>
    )
}

export default TicketPage