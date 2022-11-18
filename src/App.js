import { useState, useEffect } from "react"
import Header from './components/Header'
import Footer from './components/Footer'
import Posts from './components/Posts'
import Home from './routes/home.js'
import LoginForm from "./components/LoginForm"

function App() {
  // const [posts, setPosts] = useState([])

  // useEffect(() => {
  //   const getPosts = async () => {
  //     const postsFromServer = await fetchPosts()
  //     setPosts(postsFromServer)
  //   }

  //   getPosts()
  // }, [])

  // //Fetch posts
  // const fetchPosts = async () => {
  //   const res = await fetch('https://hungry-backend-api.herokuapp.com/main/posts/')
  //   const data = await res.json()

  //   //console.log(data)
  //   return data.results
  // }

  // // fetch single post
  // const fetchPost = async (id) => {
  //   const res = await fetch(`https://hungry-backend-api.herokuapp.com/main/posts/${id}/`)
  //   const data = await res.json()

  //   //console.log(data)
  //   return data
  // }


  // const updatePost = async (id) => {
  //   const post = await fetchPost(id)
  //   const updatePost = { ...post, servings_available: post.servings_available -= 1 }
  //   const res = await fetch(`https://hungry-backend-api.herokuapp.com/main/posts/${id}/`,
  //   {
  //     method: 'PUT',
  //     headers: {
  //       'Content-type': 'application/json'
  //     },
  //     body: JSON.stringify(updatePost)
  //   })
  //   const data = await res.json

  //   setPosts(
  //     posts.map((post) => 
  //       post.id === id ? { ...post, servings_available: data.servings_available} : post
  //     )
  //   )
  // }

  return (
      <Home />
  );
}

export default App;
