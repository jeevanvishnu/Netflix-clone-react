import {useRef , useEffect, useState} from 'react'
import "./TitleCard.css"
import { Link } from 'react-router-dom';
// import card_data from '../../assets/cards/Cards_data'

const TitleCard = ({title , category}) => {

  const cardsRef = useRef();
  const [apiData , SetApiData] = useState([])

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjNmMTlhM2Q2ZTVmOTQ3NmE3ZjIzMTA5YzMzZGNmNCIsIm5iZiI6MTcxNDIyNjIzNy42NTc5OTk4LCJzdWIiOiI2NjJkMDQzZDYwYzc1MTAxMjM2NDY3ZWQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.TJ_AxnMxeP2JGqHqjfJ0aVbsAEaB3MF-GqQaSUrYmXo'
  }
};


  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category ? category : 'now_playing'}?language=en-RS&page=1`, options)
  .then(res => res.json())
  .then(res => SetApiData(res.results))
  .catch(err => console.error(err));

    const currentRef = cardsRef.current;
    if (currentRef) {
      currentRef.addEventListener('wheel', handleWheel);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  return (
    <div className='titlecards'>
      <h2>{title ? title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className='card' key={index}>
              <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default TitleCard