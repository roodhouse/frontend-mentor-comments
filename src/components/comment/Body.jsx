import React from 'react'

function Body({record}) {
  return (
    <>
        <div id="bodyContainer">
            <p>{record.content}</p>
        </div>
    </>
  )
}

export default Body