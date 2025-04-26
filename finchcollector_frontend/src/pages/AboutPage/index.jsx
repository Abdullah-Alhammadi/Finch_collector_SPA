import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FinchFlyVideo from '../../assets/Finch_fly.mp4';
import './styles.css';

export default function AboutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="about-fullscreen">
      <video autoPlay muted loop className="background-video">
        <source src={FinchFlyVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay" />
      <section className="page-content">
        <h1>About the Finch Collector</h1>
        <p>This app allows you to keep track of your favorite finches!</p>
        <button className="back-button" onClick={() => navigate('/')}>
          ⬅ Back to Home
        </button>
      </section>
    </div>
  );
}
