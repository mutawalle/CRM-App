import React, {useEffect, useState} from 'react'
import { useLocation } from 'react-router'
import axios from 'axios'
import Profile from './Profile'
import Dashboard from './Dashboard'
import Tickets from './Tickets'
import SvgDashboard from '../Atoms/Dashboard'
import SvgProfile from '../Atoms/Profile'
import SvgTickets from '../Atoms/Tickets'

function Home() {
    const [akun, setAkun] = useState({})
    const [tickets, setTickets] = useState([])
    const [konten, setKonten] = useState('Dashboard')
    const location = useLocation()

    const gantiKonten = (e) => {
        setKonten(e.target.innerHTML)
    }

    useEffect(() => {
        Array.from(document.querySelectorAll('.list-navigasi p'))
        .map(item => {
            if(item.innerHTML === konten){
                item.classList.add('aktif')
            }else{
                item.classList.remove('aktif')
            }
        })
    }, [konten])

    useEffect(() => {
        if(location.state !== null){
            setAkun(location.state)
        }
    }, [])

    useEffect(() => {
        if(akun.email !== undefined){
            axios.get(`http://localhost:4000/api/get-ticket?email=${akun.role === 'admin' ? 'admin' : location.state.email}`)
            .then(
                res => {
                    setTickets(res.data)
                }
            )
            .catch(
                err => {
                    console.log(err)
                }
            )
        }
    }, [akun])

    return (
        <>
            <div className='home'>
                <div className='container'>
                    <div className='navigasi'>
                        <div className='logo-company'>
                            <img src={require('../../Images/jatis-logo.png')} />
                            <h2><span>Jatis</span> <span>Corp</span></h2>
                        </div>
                        <div className='list-navigasi'>
                            <span onClick={gantiKonten}>
                                <SvgProfile color="#f9a12a" />
                                <p>Profile</p>
                            </span>
                            <span onClick={gantiKonten}>
                                <SvgDashboard color="#f9a12a"/>
                                <p>Dashboard</p>
                            </span>
                            <span onClick={gantiKonten}>
                                <SvgTickets color="#f9a12a"/>
                                <p>Tickets</p>
                            </span>
                        </div>
                    </div>
                    <div className='konten'>
                        {
                            akun.email === undefined ? 
                            <div style={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                                <h1>Silakan Login</h1><br/>
                                <a href='/login' style={{textDecoration: 'none', color: '#22356b'}}>Login</a>
                            </div>
                            :
                            konten === "Profile" ? 
                                                    <Profile 
                                                        akun={akun}  
                                                    /> 
                            : konten === "Dashboard" ? 
                                                    <Dashboard 
                                                        akun={akun}
                                                        doneTickets={tickets.filter(ticket => ticket.status === 'done')} 
                                                        waitingTickets={tickets.filter(ticket => ticket.status === 'waiting')}
                                                        length={tickets.length}
                                                    /> : 
                                                    <Tickets 
                                                        akun={akun}
                                                    />
                        }
                    </div>
                </div>
            </div>
            <style jsx>{`
                body {
                    background-color: rgb(240, 240, 240);
                }

                .home {
                    padding-top: 1rem;
                    font-family: 'Open Sans', sans-serif;
                    background-color: rgb(240,240,240);
                }
                
                .container {
                    margin: 1rem 1.7rem;
                    display: flex;
                    border-radius: 1rem;
                    background-color: rgb(240,240,240);
                }

                .navigasi {
                    width: 20%;
                    padding: 4rem 0 0 2rem;
                    border-radius: 3rem;
                    display: flex;
                    flex-direction: column;
                    align-items: start;
                    justify-content: start;
                    text-align: left;
                    background-color: rgb(255, 255, 255);
                    box-shadow: 1rem 0 4rem -2rem rgba(0,0,0,.5);
                }

                .navigasi .logo-company {
                    margin-bottom: 2rem;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                }

                .navigasi .logo-company img {
                    width: 50px;
                    margin-right: 1rem;
                }

                .navigasi .logo-company h2 {
                    font-size: 1.5rem;
                    font-weight: bold;
                }

                .navigasi .logo-company h2 span:first-child {
                    color: rgba(249, 161, 42, 1)
                }

                .navigasi .list-navigasi {
                    height: 200px;
                    display: flex;
                    flex-direction: column;
                    color: #f9a12a;
                    font-size: 1rem;
                    justify-content: space-evenly;
                }
                
                .navigasi .list-navigasi span {
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                }

                .navigasi .list-navigasi span:hover, a:hover {
                    opacity: 0.5;
                }

                .navigasi .list-navigasi span p {
                    transform: scaleX(1.2)
                }

                .navigasi .list-navigasi svg {
                    width: 27px;
                    height: 27px;
                    margin-right: 1rem;
                    transform: scaleX(1.1);
                }

                .konten {
                    width: 78%;
                    height: 550px;
                    margin: 0 0 0 1.5rem;
                }

                .aktif {
                    font-weight: 600;
                }
            `}</style>
        </>
    )
}

export default Home

