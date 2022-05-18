import React from 'react'

function IconUser(props) {
    const handleClick = (e) => {
        document.querySelector('.detail').classList.toggle('slideDown')
    }

    return (
        <>
            <div className='iconUser' style={{borderRadius: '50%', cursor: 'pointer'}} onClick={handleClick}>
                <img src={require('../../Images/user.jpg')} alt='todo list' style={{width: '80px', borderRadius: '50%', boxSizing: 'border-box', transition: '.2s'}}/>
                <span>detail</span>
            </div>
            <div className='detail'>
                <p>nama: {props.nama}</p>
                <p>email: {props.email}</p>
                <p>no hp: 0817263487</p>
            </div>
            <style jsx>{`
                .iconUser span {
                    position: absolute;
                    transition: .2s;
                    transform: scale(0);
                }

                .iconUser:hover span {
                    transform: scale(1);
                }

                .iconUser:hover img {
                    filter: grayscale(100%);
                    border: 3px solid #041b37;
                }

                .detail {
                    width: 0;
                    height: 0;
                    position: absolute;
                    top: 280px;
                    overflow: hidden;
                    background-color: #ddd;
                    border-radius: 10px;
                    transition: .5s;
                }

                div.slideDown {
                    width: 200px;
                    height: 200px;
                }
            `}</style>
        </>
    )
}

export default IconUser