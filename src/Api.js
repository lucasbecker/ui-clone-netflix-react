const API_KEY = 'fe8707dbed0ef16b33eb9b3440190bc5';
const API_URL = 'https://api.themoviedb.org/3';

/* 

Requisições:
 - Originais da Netflix
 - Recomendados (Trending)
 - Em Alta (Top Rated)
 - Ação
 - Comédia
 - Terror
 - Romance
 - Documentários

*/

async function basicFetch (endpoint){
  const requisition = await fetch(`${API_URL}${endpoint}`);
  const json = await requisition.json();
  return json;
}

async function getHomeList() {
  return [
    {
      slug: 'originals',
      title: 'Originais Netflix',
      items: await basicFetch(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`),
    },
    {
      slug: 'trending',
      title: 'Recomendados',
      items: await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`),
    },
    {
      slug: 'toprated',
      title: 'Em Alta',
      items: await basicFetch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`),
    },
    {
      slug: 'action',
      title: 'Ação',
      items: await basicFetch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`),
    },
    {
      slug: 'comedy',
      title: 'Comédia',
      items: await basicFetch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`),
    },
    {
      slug: 'horror',
      title: 'Terror',
      items: await basicFetch(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`),
    },
    {
      slug: 'romance',
      title: 'Romance',
      items: await basicFetch(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`),
    },
    {
      slug: 'documentary',
      title: 'Documentário',
      items: await basicFetch(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`),
    },
  ];
}

async function getMovieInfo( itemId, type ){
  let info = {};

  if(itemId && type){
    switch (type) {
      case 'movie':
        info = await basicFetch(`/movie/${itemId}?language=pt-BR&api_key=${API_KEY}`);
        break;
      case 'tv':
        info = await basicFetch(`/tv/${itemId}?language=pt-BR&api_key=${API_KEY}`);
        break;
      default:
        info = await basicFetch(`/movie/${itemId}?language=pt-BR&api_key=${API_KEY}`);
        break;
    }
  }

  return info;
}

export default { getHomeList, getMovieInfo };