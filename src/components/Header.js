import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Header = ({ text, imgSrc, imgFunction }) => {

  return (
    <header>
        <h1>{text}</h1>
        <img src={imgSrc} alt="" onClick={imgFunction}></img>
        {/* <object type="image/svg+xml" data="./images/shopping-cart.svg">shopping cart icon</object> */}
    </header>
  )
}

// Header.defaultProps = {
//   text: 'Hungry',

// }

// Header.propTypes = {
// text: PropTypes.string,
// buttonLink: PropTypes.string,
// buttonSrc: PropTypes.string
// }

export default Header