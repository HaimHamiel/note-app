import { Suspense, lazy } from "react";
import Spinner from "../components/Layout/Spinner";

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<Spinner />}>
      <Component {...props} />
    </Suspense>
  );

export const Home = Loadable(lazy(() => import("../pages/Home")));
export const Login = Loadable(lazy(() => import("../pages/Login")));
export const Register = Loadable(lazy(() => import("../pages/Register")));
export const NewNote = Loadable(lazy(() => import("../pages/NewNote")));
export const Notes = Loadable(lazy(() => import("../pages/Notes")));
export const Note = Loadable(lazy(() => import("../pages/Note")));
export const PrivateRoute = Loadable(lazy(() => import("../components/PrivateRoute")));