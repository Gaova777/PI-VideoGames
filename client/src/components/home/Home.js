import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getVideoGames } from "../../actions";
import Card from "../card/Card";
import Spinner from "../spinner/Spinner";
import Paginated from "../paginated/Paginated";
import NotFound from "../notFound/NotFound";

import "./Home.css";
import NavBar from "../navBar/NavBar";

export default function Home() {
    const dispatch = useDispatch();
    const { filteredVideoGames, allVideoGames, page:pagina } = useSelector((state) => state);
    

    const itemsPorPagina = 15;
    const offset = pagina * itemsPorPagina;
    const limit = offset + itemsPorPagina;

    useEffect(() => {
        if (allVideoGames.length === 0) {
            dispatch(getGenres());
            dispatch(getVideoGames());
        }
    }, [dispatch, allVideoGames.length]);

    if (typeof filteredVideoGames === "string") {
        return  (
            <div className="notFound">
                <NavBar />
                <NotFound />
            </div>
        )
    } else {
        const currentGames = filteredVideoGames.slice(offset, limit);//es clave para colocar los 15 cards

        return (
            <div className="home">
                <NavBar />
                {currentGames.length === 0 && <Spinner />}
                <div className="cards">
                    <div className="grid">
                        {currentGames.length > 0 &&
                            currentGames.map((game) => (
                                <div className="grid-item" key={game.id}>
                                    <Card game={game} />
                                </div>
                            ))}
                    </div>
                </div>
                {currentGames.length > 0 && (
                    <Paginated
                        pagina={pagina}
                        totalItems={filteredVideoGames.length}
                        itemsPorPagina={itemsPorPagina}
                    />
                )}
            </div>
        );
    }
}
