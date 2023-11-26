import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getNotes } from '../features/notes/noteSlice'
import Spinner from '../components/Layout/Spinner'
import BackButton from '../components/Layout/BackButton'
import NoteItem from '../components/Layout/NoteItem'

function Notes() {
  const { notes } = useSelector((state) => state.notes)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getNotes())
  }, [dispatch])

  if (!notes) {
    return <Spinner />
  }

  return (
    <>
      <BackButton />
      <h1>Notes</h1>
      <div className='notes'>
        <div className='note-headings'>
          <div>Date</div>
          <div>Description</div>
        </div>
        {notes.map((note) => (
          <NoteItem key={note._id} note={note} />
        ))}
      </div>
    </>
  )
}

export default Notes