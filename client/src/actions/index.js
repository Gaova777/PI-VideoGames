import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const baseURL = process.env.REACT_APP_API || "http://localhost:3001";

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_DETAIL_VIDEOGAME = "GET_DETAIL_VIDEOGAME";
export const EMPTY_DETAIL_VIDEOGAME = "EMPTY_DETAIL_VIDEOGAME";
export const GET_GENRES = "GET_GENRES";
export const ORDER_VIDEOGAMES = "ORDER_VIDEOGAMES";
export const FILTER_VIDEOGAMES = "FILTER_VIDEOGAMES";
export const SEARCH_VIDEOGAMES = "SEARCH_VIDEOGAMES";
export const EMPTY_FILTERED_VIDEOGAMES = "EMPTY_FILTERED_VIDEOGAMES";
export const CREATE_VIDEOGAME = "CREATE_VIDEOGAME";
export const CHANGE_PAGE = "CHANGE_PAGE";
export const ORIGEN_FILTER_VIDEOGAMES = "ORIGEN_FILTER_VIDEOGAMES";
export const DELETE_VIDEOGAME = "DELETE_VIDEOGAME";
export const FILTER_PLATAFORM = "FILTER_PLATAFORM";

export function getVideoGames() {
    return function (dispatch) {
        return axios
            .get(`/videogames`)
            .then(({ data }) => {
                dispatch({ type: GET_VIDEOGAMES, payload: data });
            });
    };
}

export function getDetailVideoGame(id) {
    return function (dispatch) {
        return axios
            .get(`/videogame/${id}`)
            .then(({ data }) => {
                dispatch({ type: GET_DETAIL_VIDEOGAME, payload: data });
            });
    };
}

export function emptyDetailVideoGame() {
    return function (dispatch) {
        dispatch({ type: EMPTY_DETAIL_VIDEOGAME });
    };
}

export function getGenres() {
    return function (dispatch) {
        return axios.get(`/genres`).then(({ data }) => {
            dispatch({ type: GET_GENRES, payload: data });
        });
    };
}

export function orderVideoGames(order) {
    return function (dispatch) {
        dispatch({ type: ORDER_VIDEOGAMES, payload: order });
    };
}

export function filterVideoGames(filter) {
    return function (dispatch) {
        dispatch({ type: FILTER_VIDEOGAMES, payload: filter });
    };
}

export function searchVideoGames(name) {
    return function (dispatch) {
        return axios
            .get(`/videogames?name=${name}`)
            .then(({ data }) => {
                dispatch({ type: SEARCH_VIDEOGAMES, payload: data });
            });
    };
}

export function emptyFilteredVideoGames() {
    return function (dispatch) {
        dispatch({ type: EMPTY_FILTERED_VIDEOGAMES });
    };
}

// export function createVideogame(obj) {
//     return (dispatch) =>
//         fetch(`${baseURL}/videogames`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(obj),
//         })
//             .then((resp) => resp.json())
//             .then((json) => {
//                 dispatch({ type: CREATE_VIDEOGAME, payload: json });
//             });
// }

export function createVideogame(payload){
    return async function(dispatch){
        let json= await axios.post(`${baseURL}/videogames`, payload)
        return dispatch({
            type: CREATE_VIDEOGAME,
            payload: json.data,
        })
    }
}

export function changePage(page) {
    return function (dispatch) {
        dispatch({ type: CHANGE_PAGE, payload: page });
    };
}

export function origenFilterVideoGames(origen) {
    return function (dispatch) {
        dispatch(emptyFilteredVideoGames());
        dispatch({ type: ORIGEN_FILTER_VIDEOGAMES, payload: origen });
    };
}

export function deleteVideoGame(id) {
    return function (dispatch) {
        return axios
            .delete(`/videogame/${id}`)
            .then(({ data }) => {
                dispatch({ type: DELETE_VIDEOGAME, payload: data });
            });
    };
}

export function filterPlataform(plataforma) {
    return function (dispatch) {
        dispatch({ type: FILTER_PLATAFORM, payload: plataforma });
    };
}