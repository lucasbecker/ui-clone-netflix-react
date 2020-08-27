import React from 'react';
import './FeaturedMovie.css';

function FeaturedMovie( {item} ) {

  // Extraindo data de lançamento do item para depois exibir o ano
  let releaseDate = new Date(item.first_air_date);

  // Reduzindo o tamanho da descrição para não interferir no layout
  let description = item.overview;
  if(description.length > 200 ) description = description.substring(0, 150)+"...";

  // Extraindo gêneros do item
  let genres = [];
  for(let i in item.genres) genres.push( item.genres[i].name );

  return (
    <div className="featured" style={{
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
    }}>
      <div className="fade-vertical">
        <div className="fade-horizontal">
          <div className="featured-name">
            { item.name }
          </div>
          <div className="featured-info">
            <div className="info-points">
              { item.vote_average } pontos
            </div>
            <div className="info-year">
              { releaseDate.getFullYear() }
            </div>
            <div className="info-seasons">
              { item.number_of_seasons }
              { item.number_of_seasons !== 1 ? ' temporadas' : ' temporada'}
            </div>
          </div>
          <div className="featured-description">
            { description }
          </div>
          <div className="featured-buttons">
            <a className="button-watch" href={`/watch/${item.id}`} >Assistir</a>
            <a className="button-addlist" href={`/list/add/${item.id}`} >+ Minha Lista</a>
          </div>
          <div className="featured-genres">
            <strong>Gêneros: </strong> 
            { genres.join(', ') }
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturedMovie;