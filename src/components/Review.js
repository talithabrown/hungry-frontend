import { useNavigate } from 'react-router-dom'
import RatingStars from './RatingStars'

const Review = ({ review, edit }) => {

    let navigate = useNavigate()

    const navigateToEditReviewForm = (id, title, rating, text, post) => {
        localStorage.setItem('review-id', id)
        localStorage.setItem('review-title', title)
        localStorage.setItem('review-rating', rating)
        localStorage.setItem('review-text', text)
        localStorage.setItem('review-post-id', post)
        navigate('/edit-review')
    }

    const navigateToDeleteReview = (id) => {
        localStorage.setItem('review-id', id)
        navigate('/delete-review')
    }

    const getDate = (date) => {
        const reviewDate = new Date(date);
        let short_date = reviewDate.toString().substring(4, 15)
        return short_date
    }

  
    if (review && edit === true) {
        return (
            <>
                <div className='review-div'>
                        <p className='review-post-title-p'>Review of: {review.post_title}</p>
                        <h3>{review.title}</h3>
                        <RatingStars rating={review.rating} />
                        <p className='review-text-p'>{review.text}</p>
                        <p>Written by: {review.username}</p>
                        <p>Date: {getDate(review.created)}</p>
                        <div className='edit-review-button-holder-div'>
                            <button className='edit-review-button' onClick={() => navigateToEditReviewForm(review.id, review.title, review.rating, review.text, review.post)}>Edit</button>
                            <button className='delete-review-button' onClick={() => navigateToDeleteReview(review.id)}>Delete</button>
                        </div>
                </div>
                <hr></hr>
            </>
        )
    }
    else if (review && edit === false) {
        return (
            <>
                <div className='review-div'>
                        <p className='review-post-title-p'>Review of: {review.post_title}</p>
                        <h3>{review.title}</h3>
                        <RatingStars rating={review.rating} />
                        <p className='review-text-p'>{review.text}</p>
                        <p>Written by: {review.username}</p>
                        <p>Date: {getDate(review.created)}</p>
                </div>
                <hr></hr>
            </>
        )
    }
}

export default Review