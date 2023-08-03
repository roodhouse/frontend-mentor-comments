import React from 'react'

function Header({record}) {
    console.log(record)
  return (
    <>
        <div id="headerContainer">
            <div id="commentAvatar">
                <img src={record.user.image.webp} alt="comment avatar" />
            </div>
            <div id="commentName">
                <p>{record.user.username}</p>
            </div>
            <div id="commentTime">
                <p>{record.createdAt}</p>
            </div>
        </div>
    </>
  )
}

export default Header