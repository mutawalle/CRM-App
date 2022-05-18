import axios from 'axios'
import React, { useEffect, useState} from 'react'

export default function Dashboard(props) {
    const [subject, setSubject] = useState('')
    const [description, setDescription] = useState('')

    const handleSubject = (e) => {
        setSubject(e.target.value)
    }

    const handleDescription = (e) => {
        setDescription(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(subject+"     "+description);
        toggleHilang()
    }

    const toggleHilang = () => {
        const createTicket = document.querySelector('.penambah')
        createTicket.classList.toggle('hilang')
    }

    const updateTicket = (e) => {
        if(props.akun.role === 'admin'){
            axios.post(`http://localhost:4000/api/update-ticket`, {
                status: 'processing',
                admin: props.akun.email,
                _id: props.waitingTickets[e.target.getAttribute('number')]._id
            })
            .then(
                props.waitingTickets.splice(e.target.getAttribute('number'), 1)
            )
            .catch(
                err => {
                    console.log(err)
                }
            )
        }
    }

    // animasi
    const handleOver = (e) => {
        e.target.querySelector('p').classList.toggle('tinggiNol')
    }

    const handleOut = (e) => {
        e.target.querySelector('p').classList.toggle('tinggiNol')
    }

    return (
        <>
            <div className='dashboard'>
                <div className='dashboard-top'>
                    <h1>Welcome Back, <span>{props.akun.fullName}</span></h1>
                    <div className='button-profile'>
                        <p>{props.akun.email}</p>
                        <img src={`http://localhost:4000/${props.akun.photoProfile}`} alt=""/>
                    </div>
                </div>
                <div className='status-tickets'>
                    <div>
                        <h2>Waiting Tickets</h2>
                        <div>
                            <span>{props.waitingTickets.length}</span>
                            <span>{Math.round(props.waitingTickets.length/props.length*100)}%</span>
                        </div>
                    </div>
                    <div>
                        <h2>Done Tickets</h2>
                        <div>
                            <span>{props.doneTickets.length}</span>
                            <span>{Math.round(props.doneTickets.length/props.length*100)}%</span>
                        </div>
                    </div>
                    <div onClick={toggleHilang}>
                        <span>+</span>
                        <h2>Add Ticket</h2>
                    </div>
                </div>
                <div className='list-tickets'>
                    <div>
                    </div>
                    <div>
                        <div className='list-waiting'>
                            <h2>Waiting Lists</h2>
                            {
                                props.waitingTickets.map((ticket, index) => {
                                    return (
                                        <div key={index} onMouseOver={handleOver} onMouseOut={handleOut}>
                                            <div className='ticket-bagian-atas'>
                                                <div>
                                                    <h3>{ticket.subject}</h3>
                                                    <span>{ticket.date}</span>
                                                </div>
                                                <span onClick={updateTicket} number={index}>{props.akun.role === 'admin' ? 'process' : 'waiting'}</span>
                                            </div>
                                            <p className='tinggiNol'>{ticket.description}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='list-done'>
                            <h2>Done Lists</h2>
                            {
                                props.doneTickets.map((ticket, index) => {
                                    return (
                                        <div key={index} onMouseOver={handleOver} onMouseOut={handleOut}>
                                            <div className='ticket-bagian-atas'>
                                                <div>
                                                    <h3>{ticket.subject}</h3>
                                                    <span>{ticket.date}</span>
                                                </div>
                                            </div>
                                            <p className='tinggiNol'>{ticket.description}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className='penambah hilang' style={{borderRadius: '20px', transition: '.5s'}}>
                    <h2>Create Ticket</h2>
                    <input type="text" placeholder="Subject" onChange={handleSubject}/>
                    <input type="text" placeholder="Description" onChange={handleDescription}/>
                    <span style={{width: '80px', display: 'block', margin: '0.5rem auto', backgroundColor: 'lightgreen', padding: '5px', borderRadius: '5px', cursor: 'pointer'}} onClick={handleSubmit}>
                        Create
                    </span>
                </div>
            </div>
            <style jsx>{`
                .dashboard {
                    width: 100%;
                    height: 100%;
                    box-sizing: border-box;
                    padding: 1rem 1rem;
                }

                .dashboard-top {
                    margin-right: 2rem;
                    display: flex;
                    justify-content: space-between;
                }

                .button-profile {
                    display: flex;
                    align-items: center;
                }

                .button-profile p {
                    font-weight: 500;
                }

                .button-profile img {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    margin-left: .5rem;
                    background-color: white;
                }

                h1 {
                    font-size: 2.5rem;
                    font-weight: bold;
                    margin-bottom: 1rem;
                }

                h1 span {
                    color: rgba(34, 53, 107, 1)
                }

                .status-tickets {
                    width: 100%;
                    display: flex;
                    justify-content: space-evenly;
                }

                .status-tickets h2 {
                    font-size: 1.5rem;
                    font-weight: bold;
                    margin-bottom: 1rem;
                }

                .status-tickets div {
                    width: 250px;
                    height: 250px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    border-radius: 3rem;
                }

                .status-tickets > div:first-child {
                    background-color: rgba(151, 39, 91, 0.1);
                    color: rgba(151, 39, 91, 1);
                }

                .status-tickets > div:nth-child(2) {
                    background-color: rgba(26, 120, 60, 0.1);
                    color: rgba(26, 120, 60, 1);
                }

                .status-tickets > div:last-child {
                    color: rgba(34, 53, 107, 1);
                    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='48' ry='48' stroke='rgba(34, 53, 107, .5)' stroke-width='7' stroke-dasharray='1.2rem' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
                    transition: .2s;
                }

                .status-tickets > div:last-child span {
                    color: rgba(34, 53, 107, .5);
                    display: block;
                    font-size: 4rem;
                }

                .status-tickets > div:last-child:hover{
                    opacity: .5;
                    cursor: pointer;
                }

                .status-tickets div div {
                    width: 100%;
                    height: max-content;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-evenly;
                    align-items: center;
                }
                
                .status-tickets div div span {
                    font-size: 2rem;
                    font-weight: bold;
                    display: flex;
                    width: 80px;
                    height: 80px;
                    justify-content: center;
                    align-items: center;
                    background-color: white;
                    border-radius: .5rem;
                }

                .penambah {
                    border: 5px solid #041b37;
                    position: absolute;
                    background-color: #f5f5f5;
                    top: 35%;
                    left: 35%;
                    width: 400px;
                    height: 250px;
                }

                .penambah input {
                    width: 85%;
                    height: 30px;
                    box-sizing: border-box;
                    border: none;
                    border-bottom: 1px solid lightblue;
                }
                
                .penambah input:focus {
                    outline: none;
                    border-bottom: 3px solid #00bcd4;
                }
                .penambah input::placeholder {
                    color: grey;
                    font-family: 'Fredoka One', cursive;
                }
                
                .penambah input:focus::placeholder {
                    color: white;
                }
                
                div.hilang {
                    width: 0;
                    height: 0;
                    display: none;
                }

                .list-tickets {
                    width: 90%;
                    padding: 1rem;
                    margin: 2rem auto;
                    color: #111;
                    border: 2px solid rgba(34, 53, 107, .2);
                    border-radius: 2rem;
                }

                .list-tickets > div:first-child {
                    content: '';
                    display: block;
                    width: 90%;
                    height: 120px;
                    margin: 1rem auto;
                    background-image: url(${require('../../Images/img-dashboard.jpg')});
                    background-size: cover;
                    background-position: 50% 70%;
                    border-radius: 2rem;
                }
                
                .list-tickets > div:last-child {
                    display: flex;
                    justify-content: space-evenly;
                    color: rgba(40, 40, 40, 1);
                }

                .list-waiting h2 {
                    color: rgba(249, 161, 42, 1);
                }

                .list-done h2 {
                    color: rgba(34, 53, 107, 1);
                }

                .list-tickets h2 {
                    font-size: 1.5rem;
                    font-weight: bold;
                    margin-bottom: 1rem;
                }

                .list-tickets div > div {
                    width: 350px;
                    padding: .5rem;
                    border-bottom: 2px solid rgba(34, 53, 107, .2);
                }

                .list-tickets div > div:last-child {
                    border-bottom: none;
                }

                .list-tickets .ticket-bagian-atas {
                    border: none;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                }

                .list-tickets .ticket-bagian-atas div {
                    border: none;                    
                }

                .list-tickets .ticket-bagian-atas > span {
                    display: block;
                    padding: .3rem;
                    font-size: .9rem;
                    border-radius: 7px;
                    color: white;
                    background-color: rgba(26, 120, 60, 0.7);;
                }

                .list-tickets div div h3 {
                    font-weight: 600;
                    font-size: 1.2rem;
                }

                .ticket-bagian-atas div span {
                    font-weight: 600;
                    color: rgba(0, 0, 0, .5);
                    font-size: .8rem;
                }

                .list-tickets div div p {
                    overflow: hidden;
                    transition: .5s;
                    height: 0;
                }

                .list-tickets div div:hover > p {
                    height: 20px;
                }
            `}</style>
        </>
    )
}
