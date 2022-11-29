import {
    GET_VIDEOGAMES,
    GET_DETAIL_VIDEOGAME,
    EMPTY_DETAIL_VIDEOGAME,
    GET_GENRES,
    ORDER_VIDEOGAMES,
    FILTER_VIDEOGAMES,
    SEARCH_VIDEOGAMES,
    EMPTY_FILTERED_VIDEOGAMES,
    CREATE_VIDEOGAME,
    CHANGE_PAGE,
    ORIGEN_FILTER_VIDEOGAMES,
    DELETE_VIDEOGAME,
    FILTER_PLATAFORM,
} from "../actions/index";

const initialState = {
    allVideoGames: [],
    filteredVideoGames: [],
    detailVideoGame: {},
    allGenres: [],
    page: 0,
    orderState: "",
    filterState: "",
    origenState: "",
    platformState: "",
};

function rootReducer(state = initialState, action) {
    if (action.type === GET_VIDEOGAMES) {
        return {
            ...state,
            allVideoGames: action.payload,
            filteredVideoGames: action.payload,
        };
    }

    if (action.type === GET_DETAIL_VIDEOGAME) {
        return {
            ...state,
            detailVideoGame: action.payload,
        };
    }
    if (action.type === EMPTY_DETAIL_VIDEOGAME) {
        return {
            ...state,
            detailVideoGame: {},
        };
    }
    if (action.type === GET_GENRES) {
        return {
            ...state,
            allGenres: action.payload,
        };
    }
    if (action.type === ORDER_VIDEOGAMES) {
        if (typeof state.filteredVideoGames === "string") {
            return {
                ...state,
                filteredVideoGames: state.filteredVideoGames,
                orderState: action.payload,
            };
        }
        if (action.payload === "abc-asc") {
            return {
                ...state,
                filteredVideoGames: [...state.filteredVideoGames].sort((a, b) =>
                    a.name.localeCompare(b.name)
                ),
                orderState: action.payload,
            };
        }
        if (action.payload === "abc-desc") {
            return {
                ...state,
                filteredVideoGames: [...state.filteredVideoGames].sort((a, b) =>
                    b.name.localeCompare(a.name)
                ),
                orderState: action.payload,
            };
        }
        if (action.payload === "rating-desc") {
            return {
                ...state,
                filteredVideoGames: [...state.filteredVideoGames].sort(
                    (a, b) => a.rating - b.rating
                ),
                orderState: action.payload,
            };
        }
        if (action.payload === "rating-asc") {
            return {
                ...state,
                filteredVideoGames: [...state.filteredVideoGames].sort(
                    (a, b) => b.rating - a.rating
                ),
                orderState: action.payload,
            };
        }
    }
    if (action.type === FILTER_VIDEOGAMES) {
        const filtered =
            typeof state.filteredVideoGames !== "string"
                ? state.filteredVideoGames.filter((game) =>
                    game.genres.includes(action.payload)
                )
                : [];
        return {
            ...state,
            filteredVideoGames: filtered.length > 0 ? filtered : "No games",
            filterState: action.payload,
        };
    }

    if (action.type === FILTER_PLATAFORM) {
        const filtered =
            typeof state.filteredVideoGames !== "string"
                ? state.filteredVideoGames.filter((game) =>
                    game.platforms.toLowerCase().includes(action.payload)
                )
                : [];
        return {
            ...state,
            filteredVideoGames: filtered.length > 0 ? filtered : "No games",
            platformState: action.payload,
        };
    }

    if (action.type === SEARCH_VIDEOGAMES) {
        const filtered = action.payload;
        return {
            ...state,
            filteredVideoGames: filtered.length > 0 ? filtered : "No games",
        };
    }
    if (action.type === EMPTY_FILTERED_VIDEOGAMES) {
        return {
            ...state,
            filteredVideoGames: [],
            filterState: "",
            orderState: "",
            origenState: "",
            platformState: "",
            page: 0,
        };
    }
    if (action.type === CREATE_VIDEOGAME) {
        return {
            ...state,
            filteredVideoGames: [...state.filteredVideoGames, action.payload],
            allVideoGames: [...state.allVideoGames, action.payload],
        };
    }
    if (action.type === CHANGE_PAGE) {
        return {
            ...state,
            page: action.payload,
        };
    }
    if (action.type === ORIGEN_FILTER_VIDEOGAMES) {
        if (action.payload === "api") {
            const filtered = state.allVideoGames.filter(
                (game) => typeof game.id === "number"
            );
            return {
                ...state,
                filteredVideoGames: filtered.length > 0 ? filtered : "No games",
                origenState: action.payload,
            };
        }
        if (action.payload === "db") {
            const filtered = state.allVideoGames.filter(
                (game) => typeof game.id === "string"
            );
            return {
                ...state,
                filteredVideoGames: filtered.length > 0 ? filtered : "No games",
                origenState: action.payload,
            };
        }
        return {
            ...state,
            filteredVideoGames: state.allVideoGames,
            origenState: action.payload,
        };
    }
    if (action.type === DELETE_VIDEOGAME) {
        const filtered = state.filteredVideoGames.filter(
            (game) => game.id !== action.payload
        );

        return {
            ...state,
            filteredVideoGames: filtered.length > 0 ? filtered : "No games",
            allVideoGames: state.allVideoGames.filter(
                (game) => game.id !== action.payload
            ),
        };
    }

    return state;
}

export default rootReducer;
