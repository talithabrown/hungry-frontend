import { useState } from "react"
import Header from '../components/Header'
import Footer from '../components/Footer'
import Alert from '../components/Alert'
import EditPostForm from '../components/EditPostForm'

const EditPost = () => {

    const [alertType, setAlertType] = useState([ 'hideAlert' ])
    const [alertMessage, setAlertMessage] = useState([ '' ])


    const editPost = async (title, description, price, servings, datetime, delivery, location, ingredientsArray, originalIngredients, postImage, postImageId) => {
        
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
            "user": localStorage.getItem('profile_id')
        }


        const res1 = await fetch(`https://hungry-backend-api.herokuapp.com/main/posts/${localStorage.getItem('post-detail-id')}`, 
        {
            method: 'PUT',
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
        }

        if (ingredientsArray.length > 0) {

          let deleteIngredientsIdArray = []
          let deleteIngredientsNameArray = []
          let unchangedIngredientsArray = []
          let addIngredientsArray = []

          for (let i = 0; i < originalIngredients.length; i++) {
            if (ingredientsArray.includes(originalIngredients[i].name)) {
              unchangedIngredientsArray.push(originalIngredients[i].name)
            }
            else {
              deleteIngredientsIdArray.push(originalIngredients[i].id)
              deleteIngredientsNameArray.push(originalIngredients[i].name)
            }
          }

          for (let i = 0; i < ingredientsArray.length; i++) {
            if (deleteIngredientsNameArray.includes(ingredientsArray[i]) === false && unchangedIngredientsArray.includes(ingredientsArray[i]) === false) {
              addIngredientsArray.push(ingredientsArray[i])
            }
          }


          for (let i = 0; i < addIngredientsArray.length; i++) {
              const res3 = await fetch(`https://hungry-backend-api.herokuapp.com/main/posts/${localStorage.getItem('post-detail-id')}/ingredients/`, 
              {
                  method: 'POST',
                  headers: {
                    'Content-type': 'application/json'
                  },
                  body: JSON.stringify({ "name": addIngredientsArray[i]})
              })

              let response3 = await res3
              if (!response3.ok) {
                  let data = response3.json()
                  console.log(data)
                  window.scrollTo(0,0)
                  setAlertType('errorAlert')
                  setAlertMessage('Something went wrong, please try again')
              }
          }

          for (let i = 0; i < deleteIngredientsIdArray.length; i++) {
            const res4 = await fetch(`https://hungry-backend-api.herokuapp.com/main/posts/${localStorage.getItem('post-detail-id')}/ingredients/${deleteIngredientsIdArray[i]}/`, 
            {
                method: 'DELETE'
            })

            let response4 = await res4
              if (!response4.ok) {
                  let data = response4.json()
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

          const res2 = await fetch(`https://hungry-backend-api.herokuapp.com/main/posts/${localStorage.getItem('post-detail-id')}/images/${postImageId}/`, 
          {
              method: 'PUT',
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
            <EditPostForm onSubmitPost={editPost}/>
          </main>
          <Footer />
      </div>
    )
  }
  
  export default EditPost