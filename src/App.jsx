import { useState, useEffect } from 'react';
import Menu from './components/Menu';
import NewsGrid from './components/NewsGrid';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [active, setActive] = useState(1);
  const [category, setCategory] = useState('general');
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=0c53285ca4174c63866b1f4c449a9e46`)
      .then(res => res.json())
      .then(data => setItems(data.articles));
  }, [category]);

  useEffect(() => {
    document.body.classList.toggle('dark-theme', darkTheme);
  }, [darkTheme]);

  return (
    <div className="App">
      <h1 className="title">See The Latest News</h1>
      <Menu active={active} setActive={setActive} setCategory={setCategory} setDarkTheme={setDarkTheme} darkTheme={darkTheme} />
      <NewsGrid items={items} />
    </div>
  );
}

export default App;
