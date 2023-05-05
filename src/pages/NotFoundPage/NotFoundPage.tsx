import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <>
      <h2>Page not found</h2>
      <p>
        <Link to="/">Go to home page</Link>
      </p>
    </>
  );
}

export default NotFoundPage;
