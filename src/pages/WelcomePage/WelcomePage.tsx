import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthProvider';
import ROUTES from '../../constants/routes';
import './Welcome.scss';
import { useState, useEffect } from 'react';
import imageOne from '../../assets/bg_1.jpg';
import imageTwo from '../../assets/bg_2.png';
import imageThree from '../../assets/bg_3.png';

function WelcomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleMouseMove(event: { clientX: number; clientY: number }) {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    }

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    // <>
    //   <div className="welcome_content container">
    //     <h2>This is Welcome Page</h2>
    //     {user ? (
    //       <p>Hello {user.email}</p>
    //     ) : (
    //       <>
    //         <p>Hello unknown user.</p>
    //         <p>
    //           <Link to={ROUTES.signIn}>Sign in</Link> or <Link to={ROUTES.signUp}>Sign up</Link>{' '}
    //           please
    //         </p>
    //       </>
    //     )}
    //   </div>
    //   <div className="parallax" onMouseMove={handleMouseMove}>
    //     <div className="parallax__item">
    //       <div className="parallax__item__background"></div>
    //     </div>
    //     <div className="parallax__item">
    //       <div className="parallax__item__waves"></div>
    //     </div>
    //     <div className="parallax__item">
    //       <div className="parallax__item__logotypes"></div>
    //     </div>
    //   </div>
    // </>
    <div className="parallax">
      <div
        className="layer back"
        style={{
          backgroundImage: `url(${imageOne})`,
        }}
      ></div>
      <div
        className="layer base"
        style={{
          backgroundImage: `url(${imageTwo})`,
          transform: `translate(-${mousePosition.x / 70}px, -${mousePosition.y / 70}px)`,
        }}
      ></div>
      <div
        className="layer logotypes"
        style={{
          backgroundImage: `url(${imageThree})`,
          transform: `translate(${mousePosition.x / 50}px, ${mousePosition.y / 50}px)`,
        }}
      ></div>
      <div className="content">
        <h1>Welcome to my website</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
  );
}

export default WelcomePage;
