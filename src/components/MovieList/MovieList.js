import React, { useState } from 'react';

import './MovieList.css';

function MovieList( {title, items} ) {
  const [ scrollList, setScrollList ] = useState(0);
  const windowWidth = window.innerWidth;

  function handleLeftList() {
    let scrollValue = scrollList + Math.round( windowWidth / 2 );
    if(scrollValue > 0) scrollValue = 0;
    setScrollList(scrollValue);
  }

  function handleRightList() {
    let scrollValue = scrollList - Math.round( windowWidth / 2 );
    let listLength = items.results.length * 150;
    if( (windowWidth - listLength) > scrollValue ) scrollValue = (windowWidth - listLength) - 60;
    setScrollList(scrollValue);
  }

  return (
    <div className="movie-list">
      <h2>{title}</h2>

      <div className="list-left" onClick={handleLeftList} > {`<`} </div>
      <div className="list-right" onClick={handleRightList} > {`>`} </div>
      
      <div className="list-area">
        <div className="list-row" style={{ 
          marginLeft: scrollList, 
          width: items.results.length * 150
        }}>
          {items.results.length > 0 && items.results.map( (item, key) => (
            <div key={key} className="list-item">
              <img alt={item.name} src={
                item.poster_path ? `https://image.tmdb.org/t/p/w300${item.poster_path}` : ``
              } />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MovieList;