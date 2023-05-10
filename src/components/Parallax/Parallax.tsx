import imageOne from '../../assets/bg_1.jpg';
import imageTwo from '../../assets/bg_2.png';
import imageThree from '../../assets/bg_3.png';
import { useState, useEffect, ReactNode } from 'react';
import './Parallax.scss';

type MousePosition = {
  x: number;
  y: number;
};

type ParallaxProps = {
  children: ReactNode;
};

export default function Parallax({ children }: ParallaxProps) {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

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
      {children}
    </div>
  );
}
