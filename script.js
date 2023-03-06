const movies = document.querySelector('.movies');
let index = 0
let qtdFilmes = 6
let valorInput = ''
    //consulta valor do input
let body = document.querySelector('body')
const btnTheme = document.querySelector('.btn_theme')
body.addEventListener('click', () => {
    let colorTheme = 0
    if (colorTheme != 0) {
        body.style.backgroundColor = '#FFFFFF'
    } else if (colorTheme === 1) {
        body.style.backgroundColor = '#1B2028'
    }
})


const input = document.querySelector('input')
input.addEventListener('keyup', (evento) => {
        if (evento.key === 'Enter') {
            index = 0
            qtdFilmes = 6
            valorInput = ''
            valorInput = input.value
            input.value = ''
            if (valorInput != '') {
                buscarFilme(valorInput)
            } else {
                api()
            }
        }
    })
    //botao de proximo
const nextButton = document.querySelector('.btn-next')
nextButton.addEventListener('click', () => {
        movies.innerHTML = ""
        if (qtdFilmes < 18) {
            qtdFilmes += 6
        } else {
            qtdFilmes = 6
            index = 0
        }
        if (valorInput != '') {
            buscarFilme(valorInput)
        } else {
            api()
        }
    })
    //botao de retorno
const prevButton = document.querySelector('.btn-prev')
prevButton.addEventListener('click', () => {
    movies.innerHTML = ""
    qtdFilmes -= 6
    index = qtdFilmes - 6
    if (qtdFilmes < 6) {
        qtdFilmes = 18
        index = 12
    }
    if (valorInput != '') {
        buscarFilme(valorInput)
    } else {
        api()
    }
})





const modalClose = document.querySelector('.modal')
const modalCloseBtn = document.querySelector('.modal__close')
modalCloseBtn.addEventListener('click', () => {
    modalClose.classList.add('hidden')
})

const modalPage = document.querySelector('.modal__body')
modalPage.addEventListener('click', () => {
    modalClose.classList.add('hidden')
})

//funcao para o carrosel de filmes
function carroselDeFilmes(apiFilmes) {
    movies.innerHTML = ''

    for (index; index < qtdFilmes; index++) {
        const movie = document.createElement('div')
        const movieInfo = document.createElement('div')
        const movieTitle = document.createElement('span')
        const movieRating = document.createElement('span')
        const starIcon = document.createElement('img')
        movie.classList.add('movie')
        movieInfo.classList.add('movie__info')
        movieTitle.classList.add('movie__title')
        movieRating.classList.add('movie__rating')
        starIcon.classList.add('star__movie')
        movies.appendChild(movie)
        movie.appendChild(movieInfo)
        movieInfo.append(movieTitle, movieRating)
        movie.style.backgroundImage = `url(${apiFilmes.data.results[index].poster_path})`
        movieTitle.textContent = apiFilmes.data.results[index].original_title
        movieRating.textContent = apiFilmes.data.results[index].vote_average
        movieRating.appendChild(starIcon)
        starIcon.src = 'assets/estrela.svg'
        starIcon.alt = 'Estrela'


    }

    function preencherModal(card) {
        const modalTitle = document.querySelector('.modal__title')
        const modalImg = document.querySelector('.modal__img')
        const modalDescription = document.querySelector('.modal__description')
        const modalAverage = document.querySelector('.modal__average')

        modalTitle.textContent = apiFilmes.data.results[card].title
        modalImg.src = apiFilmes.data.results[card].backdrop_path
        modalDescription.textContent = apiFilmes.data.results[card].overview
        modalAverage.textContent = apiFilmes.data.results[card].vote_average.toFixed(2)
        modalTitle.textContent = apiFilmes.data.results[card].title
    }
    let card
    const cardMovie = document.querySelectorAll('.movie')
    const modal = document.querySelector('.modal')

    const movie1 = cardMovie[0]
    const movie2 = cardMovie[1]
    const movie3 = cardMovie[2]
    const movie4 = cardMovie[3]
    const movie5 = cardMovie[4]
    const movie6 = cardMovie[5]
    movie1.addEventListener('click', () => {
        modal.classList.toggle('hidden')
        card = index - 6
        preencherModal(card)
    })
    movie2.addEventListener('click', () => {
        modal.classList.toggle('hidden')
        card = index - 5
        preencherModal(card)

    })
    movie3.addEventListener('click', () => {
        modal.classList.toggle('hidden')
        card = index - 4
        preencherModal(card)

    })
    movie4.addEventListener('click', () => {
        modal.classList.toggle('hidden')
        card = index - 3
        preencherModal(card)

    })
    movie5.addEventListener('click', () => {
        modal.classList.toggle('hidden')
        card = index - 2
        preencherModal(card)

    })
    movie6.addEventListener('click', () => {
        modal.classList.toggle('hidden')
        card = index - 1
        preencherModal(card)

    })
}
async function buscarFilme(input) {
    if (input != '') {
        const pesquisarFilme = await buscaDeFilme.get(`&query=${input}`)
        carroselDeFilmes(pesquisarFilme)
    }

}
async function api() {
    const chamarApi = await filmes.get("/")

    return carroselDeFilmes(chamarApi)
}
async function apiFilmeDoDia() {
    const chamarFilmeDoDia = await filmeDoDia.get("/")
    let generos = ``
    for (let index = 0; index < chamarFilmeDoDia.data.genres.length; index++) {
        if (index != chamarFilmeDoDia.data.genres.length - 1) {
            generos = generos + `${chamarFilmeDoDia.data.genres[index].name}, `
        } else {
            generos = generos + `${chamarFilmeDoDia.data.genres[index].name}`
        }
    }
    const highlightTitle = document.querySelector('.highlight__title')
    const highlightRating = document.querySelector('.highlight__rating')
    const highlightGenres = document.querySelector('.highlight__genres')
    const highlightLaunch = document.querySelector('.highlight__launch')
    const highlightDescription = document.querySelector('.highlight__description')
    const capa = document.querySelector('.highlight__video')
    highlightTitle.textContent = chamarFilmeDoDia.data.title
    highlightRating.textContent = chamarFilmeDoDia.data.vote_average.toFixed(1)
    highlightGenres.textContent = generos
    highlightLaunch.textContent = new Date(chamarFilmeDoDia.data.release_date).toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
    });
    highlightDescription.textContent = chamarFilmeDoDia.data.overview
    capa.style.backgroundImage = `url(${chamarFilmeDoDia.data.backdrop_path})`
    capa.style.backgroundSize = 'cover'
}

async function VideosFilmeDoDia() {
    const chamarApiVideos = await videoDeFilmeDoDia.get("")
    const linkVideo = document.querySelector('.highlight__video-link')
    linkVideo.href = `https://www.youtube.com/watch?v=${chamarApiVideos.data.results[0].key}`
}

api()
buscarFilme(valorInput)
apiFilmeDoDia();
VideosFilmeDoDia();