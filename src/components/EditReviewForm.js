import { useState } from 'react'

const EditReviewForm = ({ onSubmitReview }) => {

  const [title, setTitle] = useState(localStorage.getItem('review-title'))
  const [rating, setRating] = useState(localStorage.getItem('review-rating'))
  const [text, setText] = useState(localStorage.getItem('review-text'))

  const onSubmit = (e) => {
    e.preventDefault()

    onSubmitReview(rating, title, text)
  }


  return (
    <form className='new-review-form' onSubmit={onSubmit}>
        <h2>EDIT REVIEW</h2>
        <div className='form-control'>
            <label>*Rating (1-5) :</label>
            <input type='number' required value={rating} onChange={(e) => setRating(e.target.value)}/>
        </div>
        <div className='form-control'>
            <label>*Review Title:</label>
            <input type='text' required value={title} onChange={(e) => setTitle(e.target.value)}/>
        </div>
        <div className='form-control'>
            <label>*Text:</label>
            <textarea type='text' required value={text} onChange={(e) => setText(e.target.value)}/>
        </div>

        <div className="buttonHolderDiv">
            <input className="submit" type='submit' value='Update' />
        </div>
    </form>
  )
}

export default EditReviewForm