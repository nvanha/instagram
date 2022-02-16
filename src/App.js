import Loading from "components/Loading";
import UserContext from "context/user";
import IsUserLoggedIn from "helpers/isUserLoggedIn";
import ProtectedRoute from "helpers/protected.route";
import useAuthListener from "hooks/useAuthListener";
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const DashBoardPage = lazy(() => import("./pages/DashBoardPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

export default function App() {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<Loading />}>
          <Switch>
            <IsUserLoggedIn
              user={user}
              loggedInPath={ROUTES.DASHBOARD}
              path={ROUTES.LOGIN}
            >
              <LoginPage />
            </IsUserLoggedIn>
            <IsUserLoggedIn
              user={user}
              loggedInPath={ROUTES.DASHBOARD}
              path={ROUTES.SIGN_UP}
            >
              <SignUpPage />
            </IsUserLoggedIn>
            <Route path={ROUTES.PROFILE} component={ProfilePage} />
            <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
              <DashBoardPage />
            </ProtectedRoute>
            <Route component={NotFoundPage} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}
