import React, {useState, useEffect} from 'react'
import Email from '../Atoms/Email'
import Password from '../Atoms/Password'
import axios from 'axios'
import { useNavigate } from 'react-router'


export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        if(email !== "" && password !== "") {
          document.querySelector("input[type='submit']").disabled = false
          document.querySelector("input[type='submit']").style.backgroundColor = "#041b37"
        }else{
          document.querySelector("input[type='submit']").disabled = true
          document.querySelector("input[type='submit']").style.backgroundColor = "lightblue"
        }
    })

    const handleFocus = (e) => {
        let x = e.target.previousSibling
        x.querySelectorAll("path")[0].style.fill = "#041b37"
        if(x.querySelectorAll("path")[1]){
          x.querySelectorAll("path")[1].style.fill = "#041b37"
        }
    }
    
    const handleBlur = (e) => {
        let x = e.target.previousSibling
        x.querySelectorAll("path")[0].style.fill = "lightblue"
        if(x.querySelectorAll("path")[1]){
          x.querySelectorAll("path")[1].style.fill = "lightblue"
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.get(`http://localhost:4000/api/login/?email=${email}&password=${password}`)
        .then(res => {
            navigate('/', {state: res.data})
        }).catch(err => {
            setError("Email atau Password salah")
        })
    }

    return (
      <>
        <div className='containerAuth'>
            <div className='bagianKiriAuth'>
                <img src={require('../../Images/vektor.jpg')}/>
            </div>
            <div className='bagianKananAuth'>
                 <div className='logoAuth'>
                    <img src={require('../../Images/user.jpg')}/>
                 </div>
                 <h1>Welcome</h1>
                 <p style={{color: 'red'}}>{error}</p>
                 <form className='formAuth'>
                     <div className='inputForm'>
                        <label for="email">
                            <Email warna="blue"/>
                        </label>
                        <input type="text" name="email" placeholder="Email" onChange={ e => setEmail(e.target.value)} onFocus={handleFocus} onBlur={handleBlur}/>
                     </div>
                     <div className='inputForm'>
                        <label for="password">
                            <Password warna="blue"/>
                        </label>
                        <input type="password" name="password" placeholder="Password" onChange={ e => setPassword(e.target.value)} onFocus={handleFocus} onBlur={handleBlur}/>
                     </div>
                     <input className="submitAuth" type="submit" value="Login" onClick={handleSubmit}/>
                </form>
                <a href='/register' style={{fontSize: "12px", marginTop: '5px'}}>Registrasi</a>
            </div>
        </div>
        <style jsx>{`
            .containerAuth {
                width: 100%;
                height: 100vh;
                display: flex;
                flex-direction: row;
                align-items: center;
                text-align: center;
                font-family: 'Fredoka One', cursive;
                color: #041b37;
            }
            .bagianKiriAuth {
                flex: 1;
            }
            .bagianKiriAuth img {
                width: 80%;
            }
            .bagianKananAuth {
                flex: 1;
            }
            .logoAuth img {
                width: 100px;
                heigth: 100px;
                border-radius: 50%;
            }
            .formAuth {
                width: 450px;
                margin: auto;
                display: flex;
                flex-direction: column;
            }
            .inputForm {
                display: flex;
                flex-direction: row;
                margin-bottom: 20px;
            }
            .inputForm input{
                width: 85%;
                height: 30px;
                box-sizing: border-box;
                border: none;
                border-bottom: 1px solid grey;
                font-family: 'Fredoka One', cursive;
            }
            .inputForm input:focus{
                outline: none;
                border-bottom: 3px solid #00bcd4;
            }
            .inputForm input:focus::placeholder{
               color: white;
            }
            .inputForm label{
                width: 15%;
            }
            .inputForm label svg {
                width: 30px;
                height: 30px;
            }
            .submitAuth {
                width: 100px;
                height: 40px;
                margin: auto;
                border: none;
                color: white;
                border-radius: 10px;
                cursor: pointer;
                font-family: 'Fredoka One', cursive;
                letter-spacing: 1px;
            }
        `}</style>
      </>
    )
}
