import Parallax from '../../components/Parallax/Parallax';
import { Link } from 'react-router-dom';
import Button from '../../components/Buttons/Button';
import './NotFound.scss';

function NotFoundPage() {
  return (
    <Parallax color="light">
      <h2 className="not-found_text">Page not found</h2>
      <p className="not-found_error">404</p>
      <p>
        <Link to="/">
          <Button buttonType="solid" size="large" className="welcome_content__button">
            Go to home page
          </Button>
        </Link>
      </p>
    </Parallax>
  );
}

export default NotFoundPage;
