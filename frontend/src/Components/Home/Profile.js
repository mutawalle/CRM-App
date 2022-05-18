import React from 'react'

export default function Profile(props) {
  return (
      <>
        <div className='profile'>
            <div className='profile-bg'>
            </div>
            <div className='profile-header'>
                <img src={`http://localhost:4000/${props.akun.photoProfile}`} alt='profile' />
                <div>
                    <h1>Your Profile</h1>
                    <span>edit</span>
                </div>
            </div>
            <div className='list-detail'>
                <div>
                    <p>full name</p>
                    <p>{props.akun.fullName}</p>
                </div>
                <div>
                    <p>company name</p>
                    <p>{props.akun.companyName}</p>
                </div>
                <div>
                    <p>email</p>
                    <p>{props.akun.email}</p>
                </div>
                <div>
                    <p>service group</p>
                    <p>{props.akun.serviceGroup}</p>
                </div>
                <div>
                    <p>service type</p>
                    <p>{props.akun.serviceType}</p>
                </div>
                <div>
                    <p>channels</p>
                    <p>{props.akun.channels.map( item => <><span>{item}</span><br/></>)}</p>
                </div>
                <div>
                    <p>password</p>
                    <p>********</p>
                </div>
            </div>
        </div>
        <style jsx>{`
            .profile {
                width: 100%;
                height: 100%;
                box-sizing: border-box;
                padding: 1rem 4rem;
            }

            .profile-bg {
                width: 100%;
                height: 150px;
                background: linear-gradient(0deg, rgba(151,39,91,.2) 0%, rgba(151,39,91,0.1) 100%);
                border-radius: 3rem 0 0 0;
            }

            .profile-header {
                height: 100px;
                position: relative;
            }

            .profile-header img {
                width: 130px;
                height: 130px;
                border-radius: 50%;
                border: 2px solid white;
                position: absolute;
                left: 1rem;
                top: -3rem;
            }

            .profile-header div {
                height: 80px;
                margin: 1rem 0 0 170px;
            }

            .profile-header h1 {
                font-size: 2rem;
                font-weight: bold;
                color: rgba(0, 0, 0, .9);
                margin-bottom: .6rem;
            }

            .profile-header span:last-child {
                font-size: .9rem;
                padding: .3rem .7rem;
                color: white;
                background-color: rgba(26, 120, 60, 1);
                border-radius: .3rem;
            }

            .profile-header div span:hover {
                background-color: rgba(26, 120, 60, .5);
                cursor: pointer;
            }

            .list-detail {
                padding: 1rem;
                background-color: white;
                border-radius: 0 0 0 3rem;
            }

            .list-detail div {
                margin: 1rem 0 0 1rem; 
                display: flex;
                flex-direction: row;
                align-items: start;
                color: rgba(0, 0, 0, .9);
                font-weight: 400;
            }

            .list-detail div p {
                width: 50%;
            }

        `}</style>
      </>
  )
}
