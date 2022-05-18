import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Send from '../Atoms/Send'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:3001')

export default function Tickets(props) {
    const arrCoba = [{nama: 'tes'}]
    const [processingTickets, setProcessingTickets] = useState([{}])
    const [indeksChatAktif, setIndeksChatAktif] = useState(0)
    const [pesans, setPesans] = useState([])
    const [pesanBaru, setPesanBaru] = useState('')

    const handlePesanBaru = (e) => {
        setPesanBaru(e.target.value)
    }

    socket.on('receive-message', data => {
        if(!(pesans.includes(data))){
            setPesans([...pesans, data])
        }
    })

    const handleKirim = (e) => {
        e.preventDefault()
        if(pesanBaru !== ''){
            socket.emit('send-message', 
                pesanBaru, 
                processingTickets[indeksChatAktif]._id, 
                props.akun.email, 
                props.akun.role === 'user' ? processingTickets[indeksChatAktif].admin : processingTickets[indeksChatAktif].user
            )
        }
    }

    useEffect(() => {
        axios.get(`http://localhost:4000/api/get-ticket?email=${props.akun.role === 'admin' ? 'admin' : props.akun.email}`)
        .then(
            res => {
                setProcessingTickets(arrCoba.concat(res.data.filter(item => item.status === 'processing')))
            }
        )
        .catch(
            err => {
                console.log(err)
            }
        )
    }, [])

    useEffect(() => {
        processingTickets.map((item, index) => {
            if(index !== 0){
                axios.get(`http://localhost:4000/api/get-pesan?room=${item._id}`)
                .then(
                    res => {
                        setPesans([...res.data])
                    }
                )
                .catch(
                    err => {
                        console.log(err)
                    }
                )
            }
        })
    }, [processingTickets])

    useEffect(() => {
        console.log(indeksChatAktif);
        if(indeksChatAktif){
            console.log(indeksChatAktif, processingTickets[indeksChatAktif]._id);
            axios.get(`http://localhost:4000/api/get-pesan?room=${processingTickets[indeksChatAktif]._id}`)
            .then(
                res => {
                    setPesans([...res.data])
                    socket.emit('join-room', processingTickets[indeksChatAktif]._id)
                })
            .catch(
                err => {
                    console.log(err)
                }
            )
        }
    }, [indeksChatAktif])

    return (
        <>
            <div className='tickets'>
                <h1>Tickets</h1>
                <div className='konten-chat'>
                    <div className='list-tickets'>
                        {
                            processingTickets.map((ticket, index) => {
                                if(index !==0 ){
                                    return (
                                        <div className='ticket' key={index} onClick={() => setIndeksChatAktif(index)}>
                                            <div>
                                                <p>{ticket.subject}</p>
                                                <span>{props.akun.role === 'admin' ? ticket.user : ticket.admin}</span>
                                            </div>
                                            <span>{ticket.date.substring(0,6)}</span>
                                        </div>
                                    )
                                }
                            }
                        )}
                    </div>
                    <div className='chat'>
                        <div className='chat-header'>
                            {
                                processingTickets.length > 0 ?
                                <div>
                                    <h2>{processingTickets[indeksChatAktif].subject}</h2>
                                    <span>to: {props.akun.role === 'user' ? processingTickets[indeksChatAktif].admin : processingTickets[indeksChatAktif].user}</span> 
                                </div>
                                :
                                ''
                            }
                            <span>Set as Done</span>
                        </div>
                        <div className='chat-body'>
                            {
                                pesans.filter((pesan) => {
                                    return pesan.room === processingTickets[indeksChatAktif]._id
                                }).map((pesan, index) => {
                                    return (
                                        props.akun.email === pesan.sender ? 

                                        <div className='chat-message sender' key={index}>
                                            <span>you</span>
                                            <p>{pesan.pesan}</p>
                                            <span>{pesan.date}</span>
                                        </div>

                                        :

                                        <div className='chat-message receiver' key={index}>
                                            <span>{pesan.sender}</span>
                                            <p>{pesan.pesan}</p>
                                            <span>{pesan.date}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='chat-footer'>
                            <input type='text' placeholder='Type a message' onChange={handlePesanBaru}/>
                            <div onClick={handleKirim}>
                                <Send/>    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .tickets {
                    width: 100%;
                    height: 100%;
                    box-sizing: border-box;
                    padding: 2rem 1rem;
                }

                h1 {
                    color: rgba(151, 39, 91, 1);
                    font-size: 2rem;
                    font-weight: bold;
                    margin-bottom: 1rem;
                }

                .konten-chat {
                    display: flex;
                }

                .list-tickets {
                    width: 30%;
                    height: max-content;
                    overflow: hidden;
                    border-radius: 1rem;
                }
                
                .ticket {
                    width: 100%;
                    height: 70px;
                    background-color: white;
                    padding: 1rem;
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    transition: all .3s;
                }

                .ticket:hover {
                    background-color: rgba(34, 53, 107, 0.1);
                }

                .ticket div {
                    display: flex;
                    flex-direction: column;
                }

                .ticket p {
                    font-size: 1rem;
                    font-weight: 600;
                    margin-bottom: .5rem;
                }

                .ticket > span {
                    font-size: .8rem;
                    font-weight: 500;
                    color: #222;
                }

                .ticket div span {
                    font-size: .8rem;
                    color: #aaa;
                }

                .chat {
                    width: 70%;
                    margin-left: 1rem;
                    padding: 1rem;
                    background-color: white;
                    border-radius: 1rem;
                }

                .chat-header {
                    width: 100%;
                    height: 50px;
                    text-align: center;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                }

                h2 {
                    font-size: 1.5rem;
                    color: rgba(151, 39, 91, 1);
                }

                .chat-header > span {
                    font-size: .9rem;
                    padding: .7rem;
                    border-radius: .6rem;
                    color: white;
                    background-color: rgba(26, 120, 60, 1);
                }

                .chat-header > span:hover {
                    background-color: rgba(26, 120, 60, .5);
                    cursor: pointer;
                }

                .chat-body {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    height: 400px;
                    overflow-y: scroll;
                }
                .chat-body::-webkit-scrollbar {
                    display: none;
                }

                .chat-message {
                    min-width: max-content;
                    max-width: 400px;
                    color: #111;
                }

                .chat-message.sender {
                    align-self: flex-end;
                }

                .chat-message.sender p {
                    color: white;
                    background-color: rgba(34, 53, 107, 1);
                    padding: 1rem .5rem 1rem 1rem;
                    border-radius: 1rem 0 1rem 1rem;
                }

                .chat-message.receiver {
                    align-self: flex-start;
                }

                .chat-message.receiver p {
                    color: rgba(34, 53, 107, 1);
                    background-color: rgb(235, 235,235);
                    padding: 1rem 1rem 1rem .5rem;
                    border-radius: 0 1rem 1rem 1rem;
                    margin-top: .5rem;
                }

                .chat-message p {
                    font-size: 1.2rem;
                }

                .chat-message span:first-child {
                    margin-left: .5rem;
                }

                .chat-message span:last-child {
                    font-size: .8rem;
                    color: #9a9a9a;
                }

                .chat-footer {
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                }

                .chat-footer input {
                    width: 87%;
                    height: 30px;
                    border-radius: 1rem;
                    border: none;
                    padding: .5rem;
                    background-color: #ddd;
                }

                .chat-footer input:focus {
                    outline: none;
                }

                .chat-footer div {
                    width: 40px;
                    height: 40px;
                    padding: .5rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: rgba(26, 120, 60, 1);
                    border-radius: 50%;
                }

                .chat-footer div:hover {
                    opacity: .6;
                    cursor: pointer;
                }

                .chat-footer div svg {
                    width: 28px;
                    height: 28px;
                }

            `}</style>
        </>
    )
}
