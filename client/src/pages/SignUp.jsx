import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigateTo = useNavigate()
  const [formData, setFormData] = useState({username : "",email : "",password:""});
  const [error,setError] = useState(null)
  const [loading,setLoading] = useState(false)  
  const handleChange = (e) => {
    setError(null)
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
      setLoading(true)
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
      // console.log(data);
      if (data.success === false) {
        setError(data.message)
        setLoading(false)
        return
      }
      setLoading(false)
      setError(null)
      navigateTo("/sign-in")
    } catch (error) {
      setLoading(false)
      setError(error.message)
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
        <button disabled = {loading}className="bg-slate-700 p-3 rounded text-white uppercase hover:opacity-85">
          {loading ? "loading..." : "Sign up"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have An Account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
