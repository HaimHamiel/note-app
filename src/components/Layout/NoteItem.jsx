import { Link } from 'react-router-dom'

function NoteItem({ note }) {
  return (
    <div className='note'>
      <div>{new Date(note.createdAt).toLocaleString('he-IL')}</div>
      <div>{note.description}</div>
      <Link to={`/note/${note._id}`} className='btn btn-reverse btn-sm'>
        View
      </Link>
    </div>
  )
}

export default NoteItem