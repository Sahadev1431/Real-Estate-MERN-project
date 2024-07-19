import React, { useState } from "react";
import { Link,useNavigate,Navigate } from "react-router-dom";
import {toast} from 'react-toastify'

export default function SignUp() {
  const navigateTo = useNavigate()
  const [formData, setFormData] = useState({username : "",email : "",password:""});
  const handleChange = (e) => {
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
      const res = await fetch("/api/auth/signup",
        {
          method : "POST",
          headers:{
            "Content-Type":"application/json"
          },
          body : JSON.stringify(formData)
        }
      )
      const data = await res.json()
      console.log(data);
      // toast.success(data.message)
      if (res.ok) {
        toast.success(data.message);
        // navigateTo("/")
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  }


  return (
    <div className="p-3 max-w-xl mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
          id="username"
          value={formData.username}
          onChange={handleChange}
        />
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
        <button className="bg-slate-700 p-3 rounded text-white uppercase hover:opacity-85">
          Sign up
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have An Account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
    </div>
  );
}
