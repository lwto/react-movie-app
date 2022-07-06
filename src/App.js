import {useEffect,useState} from 'react'
import './App.css'
import SearchIcon from './search.svg'
import Card from './components/Card'

export default function App() {

  const API_URL = "http://www.omdbapi.com?apikey=6507f352"

  const [movies, setMovies] = useState([])

  const [title, setTitle] = useState("")

  function search (event){
    setTitle(event.target.value)
  }

  async function searchMovies(searchTitle){
    const res = await fetch(`${API_URL}&s=${searchTitle}`)
    const data = await res.json()
    
    setMovies(data.Search)
  }

  useEffect(() => {
    searchMovies('batman')
  },[])

  return(
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input 
          type="text" 
          placeholder='Search for movies'
          value={title}
          onChange={search}
        />

        <img 
          src={SearchIcon} 
          alt="Search" 
          onClick= {()=> searchMovies(title)}
        />
        </div>

        {
          movies?.length > 0 
            ? (
                <div className="container">
                  {
                    movies.map((movie,index)  => {
                      return(
                        <Card 
                          key = {index}
                          {...movie}
                        />
                      )
                    })
                  }
                </div>
            ) : (
              <div className="empty">
                <h2>No movies found</h2>
              </div>
            )
        }

      </div>
  )
}