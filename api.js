const filmes = axios.create({
    baseURL: 'https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?page=1&language=pt-BR&include_adult=false',
    timeout: 10000,
    headers: { 'Content-Type': 'Aplication/json' }
});

const filmeDoDia = axios.create({
    baseURL: 'https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969?language=pt-BR',
    timeout: 10000,
    headers: { 'Content-Type': 'Aplication/json' }
});
const videoDeFilmeDoDia = axios.create({
    baseURL: 'https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969/videos?language=pt-BR',
    timeout: 10000,
    headers: { 'Content-Type': 'Aplication/json' }
});
const buscaDeFilme = axios.create({
    baseURL: `https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?language=pt-BR&include_adult=false`,
    timeout: 10000,
    headers: { 'Content-Type': 'Aplication/json' }
});