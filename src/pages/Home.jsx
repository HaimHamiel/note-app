import { Link } from 'react-router-dom'
import { FaQuestionCircle, FaStickyNote } from 'react-icons/fa'

function Home() {
  return (
    <>
      <section className='heading'>
        <h1>What do you need help with?</h1>
        <p>Please choose from an option below</p>
      </section>

      <Link to='/new-note' className='btn btn-reverse btn-block'>
        <FaQuestionCircle /> Create New Note
      </Link>

      <Link to='/notes' className='btn btn-block'>
        <FaStickyNote /> View My Notes
      </Link>
    </>
  )
}

export default Home