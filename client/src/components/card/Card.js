import React from "react";
import { Link } from "react-router-dom";

import "./Card.css";

export default class Card extends React.Component {
    render(){
        const {game} = this.props;
        return (
            <div>
                <Link to={`/detail/${game.id}`} style={{ textDecoration: 'none' }}>
                    <img src={game.img} alt={game.name} className="card-img" />
                    <div className="card-content">
                        <h3 className="card-header">{game.name}</h3>
                        <p className="card-text">{game.genres}</p>
                    </div>
                </Link>
            </div>
        );
    }
}







// import React from 'react';
// import { Link } from 'react-router-dom';


// import './Card.css'

// export default class Card extends React.Component{
//     render(){
//         const {game}=this.props;
//         return(
//             <div>
//                 <Link to={`/detail/${game.id}`} style={{
//                     textDecoration:'none' }}>
//                         <img src={game.img} alt={game.name} className='card-img'/>
//                         <div className='card-content'>
//                             <h3 className='card-header'>{game.name}</h3>
//                             <p className='card-text'>{game.genres}</p>

//                         </div>
//                 </Link>
//             </div>
//         )
//     }
// }