// App.js

import { useState, useEffect } from 'react';
import Menu from './components/Menu';
import NewsGrid from './components/NewsGrid';
import './App.css';
import Aos from 'aos';
import 'aos/dist/aos.css';

function App() {
  const [items, setItems] = useState([]);
  const [active, setActive] = useState(1);
  const [category, setCategory] = useState('general');
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=09c225d2b55c4c8badb91bcb645b6425`)
      .then(res => res.json())
      .then(data => setItems(data.articles));
  }, [category]);

  useEffect(() => {
    document.body.classList.toggle('dark-theme', darkTheme);
  }, [darkTheme]);

  useEffect(() => {
    const scrollButton = document.createElement('div');
    scrollButton.className = 'scroll-to-top';
    scrollButton.innerText = '↑';
    document.body.appendChild(scrollButton);

    const handleScroll = () => {
      scrollButton.style.display = window.scrollY > 200 ? 'block' : 'none';
    };

    scrollButton.addEventListener('click', () => {
      scrollToTop(2000);
    });

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.removeChild(scrollButton);
    };
  }, []);

  const scrollToTop = (duration) => {
    const start = window.scrollY;
    const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
  
    const animateScroll = () => {
      const currentTime = 'now' in window.performance ? performance.now() : new Date().getTime();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
  
      window.scrollTo(0, start + progress * (0 - start));
  
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };
  
    requestAnimationFrame(animateScroll);
  };

  return (
    <div className="App" data-aos="fade-up">
      <h1 className="title">See The Latest News</h1>
      <Menu active={active} setActive={setActive} setCategory={setCategory} setDarkTheme={setDarkTheme} darkTheme={darkTheme} />
      <NewsGrid items={items} />
    </div>
  );
}

export default App;
