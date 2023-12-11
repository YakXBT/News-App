import React from 'react';

function Menu({ active, setActive, setCategory, setDarkTheme, darkTheme }) {
  const categories = ['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'];

  const handleCategoryChange = (category) => {
    setCategory(category);
    setActive(categories.indexOf(category) + 1);
  };

  const toggleTheme = () => {
    setDarkTheme((prevDarkTheme) => !prevDarkTheme);
  };

  return (
    <div className="menu">
      <ul>
        {categories.map((cat, index) => (
          <li key={index} className={index + 1 === active ? 'active' : ''} onClick={() => handleCategoryChange(cat)}>
            {cat}
          </li>
        ))}
      </ul>
      <button onClick={toggleTheme}>{darkTheme}</button>
    </div>
  );
}

export default Menu;
