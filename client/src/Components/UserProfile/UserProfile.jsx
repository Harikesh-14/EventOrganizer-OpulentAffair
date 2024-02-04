import React, { useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '../../UserContent'
import './UserProfile.css'

function UserProfile() {
    const img1 = '../../../public/cat.jpg'
    const img2 = '../../../public/koala.jpg'
    const img3 = '../../../public/panda.jpeg'
    const img4 = '../../../public/Pug.jpg'
    const img5 = '../../../public/tiger.jpg'

    const [oldPassword, setOldPassword] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const { userInfo, setUserInfo } = useContext(UserContext)

    const picArr = [img1, img2, img3, img4, img5]

    const randomPicIndexRef = useRef(null);

    if (randomPicIndexRef.current === null) {
        randomPicIndexRef.current = Math.floor(Math.random() * picArr.length);
    }

    useEffect(() => {
        fetch('http://localhost:3000/user-profile', {
            method: 'GET',
            credentials: 'include',
        }).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo)
            })
        })
    }, [])

    const fullName = `${userInfo?.firstName} ${userInfo?.lastName}`
    const emailID = userInfo?.username
    const number = userInfo?.number

    return (
        <div className='userProfileContainer'>
            <h1>See your details</h1>
            <div className="profileDetails">
                <div className="imageAvatar">
                    <img src={picArr[randomPicIndexRef.current]} alt="Avatar" />
                </div>

                <div className="userDetails">
                    <span className='oneDetail'>
                        <label>Full Name </label>
                        <p>{fullName}</p>
                    </span>
                    <span className='oneDetail'>
                        <label>Email ID </label>
                        <p>{emailID}</p>
                    </span>
                    <span className='oneDetail'>
                        <label>Phone Number </label>
                        <p>{number}</p>
                    </span>

                    <div className="changePassword">
                        <h3>To change password</h3>
                        <span className='oneDetail'>
                            <label>Old Password </label>
                            <input
                                type="password"
                                value={oldPassword}
                                onChange={e => setOldPassword(e.target.value)}
                            />
                        </span>
                        <span className='oneDetail'>
                            <label>New Password </label>
                            <input
                                type="password"
                                value={currentPassword}
                                onChange={e => setCurrentPassword(e.target.value)}
                            />
                        </span>
                        <span className='oneDetail'>
                            <label>Confirm Password </label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                            />
                        </span>
                        <button type='button'>Change Password</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile