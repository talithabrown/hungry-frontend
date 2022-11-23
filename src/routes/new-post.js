import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react"
import Header from '../components/Header'
import Footer from '../components/Footer'
import Alert from '../components/Alert'
import NewPostForm from '../components/NewPostForm'

const NewPost = () => {

    const [alertType, setAlertType] = useState([ 'hideAlert' ])
    const [alertMessage, setAlertMessage] = useState([ '' ])
    //const [postId, setpostId] = useState([ '' ])

    const newPost = async (title, description, price, servings, datetime, delivery, 
                          location, ingredientsArray, postImage, latitude, longitude) => {
        
        if (!location || !latitude || !longitude) {
          setAlertType('errorAlert')
          setAlertMessage('Location is required.')
          window.scrollTo(0,0)
          return
        }

        let pickUp = false

        if (delivery === 'both') {
            delivery = true
            pickUp = true
        }
        else if (delivery === 'deliveryOnly') {
            delivery = true
            pickUp = false
        }
        else if (delivery === 'pickupOnly') {
            delivery = false
            pickUp = true
        }

        const postInfo = {
            "title": title,
            "description": description,
            "delivery": delivery,
            "pick_up": pickUp,
            "price": price,
            "ready_date_time": datetime,
            "servings_available": servings,
            "location": location,
            "user": localStorage.getItem('profile_id'),
            "latitude": latitude,
            "longitude": longitude
        }


        const res1 = await fetch('https://hungry-backend-api.herokuapp.com/main/posts/', 
        {
            method: 'POST',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify(postInfo)
        })

        let response1 = await res1

        if (response1.status === 400) {
            const data = await response1.json()
            console.log(data)
            setAlertType('errorAlert')
            if (data.title) {
              setAlertMessage(data.title)
              window.scrollTo(0,0)
              return
            }
            else if (data.description) {
              setAlertMessage(data.description)
              window.scrollTo(0,0)
              return
            }
            else if (data.price) {
              setAlertMessage(data.price)
              window.scrollTo(0,0)
              return
            }
            else if (data.ready_date_time) {
                setAlertMessage('Date and Time are required')
                window.scrollTo(0,0)
                return
              }
            else if (data.servings_available) {
                setAlertMessage(data.servings_available)
                window.scrollTo(0,0)
                return
            }
            else if (data.delivery) {
                setAlertMessage(data.delivery)
                window.scrollTo(0,0)
                return
              }
            else if (data.location) {
            setAlertMessage(data.location)
            window.scrollTo(0,0)
            return
            }
            else {
              setAlertMessage('Invalid data, please try again. Make sure all required fields are completed')
              window.scrollTo(0,0)
              return
            }
        } else if (response1.ok){
          const data = await response1.json()
          console.log(data)
          //setpostId(data.id)
          localStorage.setItem('postId', data.id)
          console.log(`status code is ${response1.status}`)
        }

        if (ingredientsArray.length > 0) {
            for (let i = 0; i < ingredientsArray.length; i++) {
                const res3 = await fetch(`https://hungry-backend-api.herokuapp.com/main/posts/${localStorage.getItem('postId')}/ingredients/`, 
                {
                    method: 'POST',
                    headers: {
                      'Content-type': 'application/json'
                    },
                    body: JSON.stringify({ "name": ingredientsArray[i]})
                })

                let response3 = await res3
                if (response3.ok) {
                  
                }
                else {
                    let data = response3.json()
                    console.log(data)
                    window.scrollTo(0,0)
                    setAlertType('errorAlert')
                    setAlertMessage('Something went wrong, please try again')
                }

            }
        }


        if (postImage) {
          const postImageFormData = new FormData();
          postImageFormData.append('image', postImage)

          const res2 = await fetch(`https://hungry-backend-api.herokuapp.com/main/posts/${localStorage.getItem('postId')}/images/`, 
          {
              method: 'POST',
              body: postImageFormData
          })

          let response2 = await res2
          if (response2.ok) {
              window.scrollTo(0,0)
              setAlertType('successAlert')
              setAlertMessage('Successfully Posted!')
          }
          else {
              let data = response2.json()
              console.log(data)
              window.scrollTo(0,0)
              setAlertType('errorAlert')
              setAlertMessage('Something went wrong, please try again')
          }
        } 
        else {
            window.scrollTo(0,0)
            setAlertType('successAlert')
            setAlertMessage('Successfully Posted!')
        }
        
    }

    const closeAlert = () => {
      setAlertType('hideAlert')
    }

    return (
      <div>
          <Header text="Hungry" imgSrc="" />
          <main className="login-main">
            <Alert message={alertMessage} type={alertType} closeAlert={closeAlert}/>
            <NewPostForm onSubmitPost={newPost}/>
          </main>
          <Footer />
      </div>
    )
  }
  
  export default NewPost