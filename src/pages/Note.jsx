import { useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { getNote, deleteNote } from "../features/notes/noteSlice";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/Layout/BackButton";
import Spinner from "../components/Layout/Spinner";

function Note() {
  const { note, isLoading, isError, message } = useSelector(
    (state) => state.notes
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { noteId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getNote(noteId));
    // eslint-disable-next-line
  }, [isError, message, noteId]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Somthing Went Wrong</h3>;
  }

  // Delete note
  const onNoteDelete = () => {
    dispatch(deleteNote(noteId));
    toast.success("Note Deleted");
    navigate("/notes");
  };

  return (
    <div className="note-page">
      <header className="note-header">
        <BackButton />
        <h2>Note ID: {note._id}</h2>
        <h3>
          Date Submitted: {new Date(note.createdAt).toLocaleString("en-US")}
        </h3>
        <hr />
        <div className="note-desc">
          <h3>Description of Note</h3>
          <p>{note.description}</p>
        </div>
      </header>
      <button onClick={onNoteDelete} className="btn btn-block btn-danger">
        Delete Note
      </button>
    </div>
  );
}

export default Note;
