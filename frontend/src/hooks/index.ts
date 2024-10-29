import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export interface Blog {
  "title": string;
  "content": string;
  "id": string,
  "author": {
    "name": string;
  }

}

export const useBlog = ({id} : {id : string}) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState <Blog> ()

  useEffect(()=>{
    try{
      axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }
      )
      .then (response => {
        setBlog(response.data.post);
        setLoading(false);
      })
    }
    catch(e){
      alert(e);
    }
  },[id])

  return {
    loading,
    blog
  }
}
export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState <Blog[]> ([])

  useEffect(()=>{
    try{
      axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }
      )
      .then (response => {
        setBlogs(response.data.posts);
        setLoading(false);
      })
    }
    catch(e){
      console.log(e);
    }
  },[])

  return {
    loading,
    blogs
  }
}