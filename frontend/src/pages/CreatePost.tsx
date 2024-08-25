// import React from 'react'

import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { backendURL } from "@/config/backendURL"
import { CreatePostType } from "@rakhshan90/common-app"
import axios from "axios"
import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"


const CreatePost = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [inputs, setInputs] = useState<CreatePostType>({
    title: "",
    content: ""
  });

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        authorization: `Bearer ${token}`
      }
    };
    try {
      setLoading(true)
      const response = await axios.post(`${backendURL}/api/v1/post/create-post`, inputs, config);
      setLoading(false);
      navigate(`/post/${response.data.id}`)
    } catch (error) {
      setError("Failed to publish the post, try again")
    }
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto mt-12 px-4 ">
        {error ? (
          <div className="text-red-500 font-semibold text-xl">{error}</div>
        ) : null}
        <form onSubmit={submitHandler} className="flex flex-col gap-4 w-full">
          <div className="flex flex-col">
            <Input onChange={(e) => {
              setInputs((c) => (
                { ...c, title: e.target.value }
              ))
            }} type="text" placeholder="Title" />
          </div>
          <div className="flex flex-col">
            <Textarea onChange={(e) => {
              setInputs((c) => (
                { ...c, content: e.target.value }
              ))
            }} placeholder="Tell your story..." />
          </div>
          <div className="flex flex-col">
            <Button disabled={loading} className="bg-green-600 text-white">{loading ? "Publishing..." : "Publish"}</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePost