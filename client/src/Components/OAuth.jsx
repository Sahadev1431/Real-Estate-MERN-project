import React from 'react'
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase'
import {useDispatch} from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice.js'
import { useNavigate } from 'react-router-dom'

export default function OAuth
() {
    const navigateTo = useNavigate()
    const dispatch = useDispatch()
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)

            const result = await signInWithPopup(auth,provider)

            // console.log(result);
            const res = await fetch("/api/auth/google",{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({name : result.user.displayName,email : result.user.email,photo:result.user.photoURL})
            })
            const data = await res.json()
            dispatch(signInSuccess(data))
            navigateTo("/")
        } catch (error) {
            console.log("Error while connectiong to google",error);
        }
    }
  return (
    <button onClick={handleGoogleClick}type ="button"className='bg-red-700 p-3 rounded-md text-white uppercase hover:opacity-90'>
        Continue with Google
    </button>
  )
}
