import React from 'react'

function Task(props) {
  const handleClick = (e) => {
    props.handel(props.tugas)
  }

  return (
    <>
      <label style={{width: '400px', marginTop: '.8rem', padding: '0 1rem', backgroundColor: 'yellow', fontSize: '1.5rem', borderRadius: '8px', boxShadow: '3px 3px 6px -1px rgba(0,0,0,0.58)', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <p style={{margin: '1rem .5rem'}}>{props.tugas}</p>
        <div style={{cursor: 'pointer', display: 'flex', flexDirection: 'row'}} onClick={handleClick}>
          <p style={{fontSize: '.8rem', marginRight: '.5rem'}}>tandai selesai</p>
          <span className='check' style={{width: '23px', height: '23px', borderRadius: '50%', border: '4px solid #2196f3'}}></span>
        </div>
      </label>
      <style jsx>{`
        span {
          background-color: white;
        }
        label div:hover span {
          background-color: #c9c6c0;
        }
        label div:hover p {
          text-decoration: underline;
        }
      `}</style>
    </>
  )
}

export default Task