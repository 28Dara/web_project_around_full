import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  isLoggedIn: boolean;
  children: React.ReactNode;
};

export default function ProtectedRoute(
  props: ProtectedRouteProps
): React.JSX.Element {
  const { isLoggedIn, children } = props;

  if (!isLoggedIn) {
    return <Navigate to='/signin' replace />;
  }

  return <>{children}</>;
}
