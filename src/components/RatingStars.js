const RatingStars = ({ rating }) => {

    if (rating === 0 ) {
        return (
            <div className="rating-stars-div">
                <img src='images/star-line.svg' alt='star'></img>
                <img src='images/star-line.svg' alt='star'></img>
                <img src='images/star-line.svg' alt='star'></img>
                <img src='images/star-line.svg' alt='star'></img>
                <img src='images/star-line.svg' alt='star'></img>
            </div>
        )
    }
    else if (rating === 1 ) {
        return (
            <div className="rating-stars-div">
                <img src='images/star-fill.svg' alt='star'></img>
                <img src='images/star-line.svg' alt='star'></img>
                <img src='images/star-line.svg' alt='star'></img>
                <img src='images/star-line.svg' alt='star'></img>
                <img src='images/star-line.svg' alt='star'></img>
            </div>
        )
    }
    else if (rating === 1.5 ) {
        return (
            <div className="rating-stars-div">
                <img src='images/star-fill.svg' alt='star'></img>
                <img src='images/star-half-line.svg' alt='star'></img>
                <img src='images/star-line.svg' alt='star'></img>
                <img src='images/star-line.svg' alt='star'></img>
                <img src='images/star-line.svg' alt='star'></img>
            </div>
        )
    }
    else if (rating === 2 ) {
        return (
            <div className="rating-stars-div">
                <img src='images/star-fill.svg' alt='star'></img>
                <img src='images/star-fill.svg' alt='star'></img>
                <img src='images/star-line.svg' alt='star'></img>
                <img src='images/star-line.svg' alt='star'></img>
                <img src='images/star-line.svg' alt='star'></img>
            </div>
        )
    }
    else if (rating === 2.5 ) {
        return (
            <div className="rating-stars-div">
                <img src='images/star-fill.svg' alt='star'></img>
                <img src='images/star-fill.svg' alt='star'></img>
                <img src='images/star-half-line.svg' alt='star'></img>
                <img src='images/star-line.svg' alt='star'></img>
                <img src='images/star-line.svg' alt='star'></img>
            </div>
        )
    }
    else if (rating === 3 ) {
        return (
            <div className="rating-stars-div">
                <img src='images/star-fill.svg' alt='star'></img>
                <img src='images/star-fill.svg' alt='star'></img>
                <img src='images/star-fill.svg' alt='star'></img>
                <img src='images/star-line.svg' alt='star'></img>
                <img src='images/star-line.svg' alt='star'></img>
            </div>
        )
    }
    else if (rating === 3.5 ) {
        return (
            <div className="rating-stars-div">
                <img src='images/star-fill.svg' alt='star'></img>
                <img src='images/star-fill.svg' alt='star'></img>
                <img src='images/star-fill.svg' alt='star'></img>
                <img src='images/star-half-line.svg' alt='star'></img>
                <img src='images/star-line.svg' alt='star'></img>
            </div>
        )
    }
    else if (rating === 4 ) {
        return (
            <div className="rating-stars-div">
                <img src='images/star-fill.svg' alt='star'></img>
                <img src='images/star-fill.svg' alt='star'></img>
                <img src='images/star-fill.svg' alt='star'></img>
                <img src='images/star-fill.svg' alt='star'></img>
                <img src='images/star-line.svg' alt='star'></img>
            </div>
        )
    }
    else if (rating === 4.5 ) {
        return (
            <div className="rating-stars-div">
                <img src='images/star-fill.svg' alt='star'></img>
                <img src='images/star-fill.svg' alt='star'></img>
                <img src='images/star-fill.svg' alt='star'></img>
                <img src='images/star-fill.svg' alt='star'></img>
                <img src='images/star-half-line.svg' alt='star'></img>
            </div>
        )
    }
    else if (rating === 5 ) {
        return (
            <div className="rating-stars-div">
                <img src='images/star-fill.svg' alt='star'></img>
                <img src='images/star-fill.svg' alt='star'></img>
                <img src='images/star-fill.svg' alt='star'></img>
                <img src='images/star-fill.svg' alt='star'></img>
                <img src='images/star-fill.svg' alt='star'></img>
            </div>
        )
    }
  }
  
  export default RatingStars