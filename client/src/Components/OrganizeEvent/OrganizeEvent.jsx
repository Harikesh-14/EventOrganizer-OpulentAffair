import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import './OrganizeEvent.css'

const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
    ],
};

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
]

function OrganizeEvent() {
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [img1, setImg1] = useState('')
    const [img2, setImg2] = useState('')
    const [img3, setImg3] = useState('')
    const [img4, setImg4] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [ticket, setTicket] = useState('')
    const [dressCode, setDressCode] = useState('')
    const [ticketPrice, setTicketPrice] = useState('')
    const [upi, setUpi] = useState('')
    const [redirect, setRedirect] = useState(false)

    const createEventFunc = async (e) => {
        e.preventDefault()

        const data = new FormData()
        data.set('title', title)
        data.set('summary', summary)
        data.set('content', content)
        data.set('img1', img1[0])
        data.set('img2', img2[0])
        data.set('img3', img3[0])
        data.set('img4', img4[0])
        data.set('date', date)
        data.set('time', time)
        data.set('ticket', ticket)
        data.set('dressCode', dressCode)
        data.set('ticketPrice', ticketPrice)
        data.set('upi', upi)

        const response = await fetch('http://localhost:3000/tickets', {
            method: 'POST',
            credentials: 'include',
            body: data
        })

        if(response.ok) {
            setRedirect(true)
        }
    }

    if(redirect){
        return <Navigate to='/' />
    }

    return (
        <form className='organizeContainer' onSubmit={createEventFunc} enctype="multipart/form-data">
            <p className='heading'>Create, invite, and orchestrate moments</p>

            <div className="inputFields">
                <div className="oneField">
                    <label>Event Name: </label>
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        name='title'
                    />
                </div>
                <div className="oneField">
                    <label>Summary: </label>
                    <input
                        type="text"
                        value={summary}
                        onChange={e => setSummary(e.target.value)}
                        name='summary'
                    />
                </div>
                <div className="oneField">
                    <label>Write in detail about your event </label>
                    <ReactQuill
                        className='textEditor'
                        value={content}
                        modules={modules}
                        formats={formats}
                        onChange={newValue => setContent(newValue)}
                    />
                </div>
                <div className="oneField">
                    <label>Add some photos related to your event </label>
                    <div className="photos">
                        <input
                            type="file"
                            onChange={e => setImg1(e.target.files)}
                        />
                        <input
                            type="file"
                            onChange={e => setImg2(e.target.files)}
                        />
                        <input
                            type="file"
                            onChange={e => setImg3(e.target.files)}
                        />
                        <input
                            type="file"
                            onChange={e => setImg4(e.target.files)}
                        />
                    </div>
                </div>
                <div className="oneField">
                    <label>Date and Time of the event </label>
                    <div className="timeAndDate">
                        <input
                            type="date"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                        />
                        <input
                            type="time"
                            value={time}
                            onChange={e => setTime(e.target.value)}
                        />
                    </div>
                </div>
                <div className="oneField">
                    <label>Maximum Tickets </label>
                    <input
                        type="number"
                        value={ticket}
                        onChange={e => setTicket(e.target.value)}
                    />
                </div>
                <div className="oneField">
                    <label>Dress Code </label>
                    <input
                        type="text"
                        value={dressCode}
                        onChange={e => setDressCode(e.target.value)}
                    />
                </div>
                <div className="oneField">
                    <label>Price of one ticket </label>
                    <input
                        type="number"
                        value={ticketPrice}
                        onChange={e => setTicketPrice(e.target.value)}
                    />
                </div>
                <div className="oneField">
                    <label>Your UPI ID </label>
                    <input
                        type="text"
                        value={upi}
                        onChange={e => setUpi(e.target.value)}
                    />
                </div>

                <button className='submitBtn' type="submit">Create Event</button>
            </div>
        </form>
    )
}

export default OrganizeEvent