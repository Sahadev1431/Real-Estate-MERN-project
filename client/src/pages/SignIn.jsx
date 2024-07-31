import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import {useDispatch ,useSelector} from 'react-redux'
import {signInStart,signInFaliure,signInSuccess,setNull} from '../redux/user/userSlice.js'
import OAuth from "../Components/OAuth.jsx";


export default function SignIn() {
  const navigateTo = useNavigate()
  const [formData, setFormData] = useState({email : "",password:""});
  const {loading,error} = useSelector((state) => state.user)
  const dispatch = useDispatch()


  const handleChange = (e) => {
    dispatch(setNull())
    const { id, value } = e.target;
    setFormData(oldData => ({
      ...oldData,
      [id] : value
    }))
  };
  
  // console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(signInStart())
      const res = await fetch("/api/auth/signin",
        {
          method : "POST",
          headers:{
            "Content-Type":"application/json"
          },
          body : JSON.stringify(formData)
        }
      )
      const data = await res.json()
      // console.log(data);
      if (data.success === false) {
        dispatch(signInFaliure(data.message))
        return
      }
      dispatch(signInSuccess(data))
      navigateTo("/")
    } catch (error) {
      dispatch(signInFaliure(error.message))
    }
  }


  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <input
          type="text"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button disabled = {loading}className="bg-slate-700 p-3 rounded text-white uppercase hover:opacity-85">
          {loading ? "loading..." : "Sign in"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont Have An Account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}