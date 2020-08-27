import React, { useEffect, useState } from 'react';

import Api from './Api';

import MovieList from './components/MovieList/MovieList';
import FeaturedMovie from './components/FeaturedMovie/FeaturedMovie';
import Header from './components/Header/Header';

import './App.css';

function App() {

  const [ movieList, setMovieList ] = useState([]);
  const [ featuredData, setFeaturedData ] = useState(null);
  const [ blackHeader, setBlackHeader ] = useState(false);

  async function loadAll(){
    let list = await Api.getHomeList();
    setMovieList(list);
    //console.log(list);

    // Utilizando a lista c/ slug desejado para escolher um item aleatório
    let featuredList = list.filter( i => i.slug === 'originals');
    let randomChosen = Math.floor(Math.random() * (featuredList[0].items.results.length -1));
    let chosenOne = featuredList[0].items.results[randomChosen];
    // Obtendo infos do item escolhido acima
    let chosenInfo = await Api.getMovieInfo(chosenOne.id, 'tv');
    setFeaturedData(chosenInfo);
    //console.log(chosenInfo);
  }

  useEffect( () => {
    loadAll();
  }, []);

  function scrollListener(){
    window.scrollY > 10 ? setBlackHeader(true) : setBlackHeader(false);
  }

  useEffect( () => {
    window.addEventListener('scroll', scrollListener);
  }, []);

  return (
    <div className="container">
      
      <Header black={blackHeader} />

      { featuredData && <FeaturedMovie item={featuredData} /> }

      <div className="lists">

        { movieList.map( (item, key) => ( <MovieList key={key} title={item.title} items={item.items} /> ) ) }

      </div>

      <footer>
        Desenvolvido por Lucas Becker e utilizando a The Movie Database API.<br/>
        Todos os direitos reservados aos seus proprietários.<br/> 
      </footer>

      {movieList <= 0 &&
        <div className="loading">
          <img src="http://cdn.lowgif.com/small/0534e2a412eeb281-the-counterintuitive-tech-behind-netflix-s-worldwide.gif" alt="Carregando" />
        </div>
      }
    </div>
  )
}

export default App;