import Footer from "../components/Footer"
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div>
        <h2>This is the about page</h2>
        <Link to='/'>Go Back</Link>
        <Footer />
    </div>
  )
}

export default About