import { createContext, useContext, useState } from "react";

const BookContext = createContext();

export const BookProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([
        "the fall camus",
        "atonement mcewan",
        "pride and prejudice austen",
        "the art of loving"
    ]);

    const [recentActivity, setRecentActivity] = useState([
        "crush siken",
        "requiem for a dream",
        "dune herbert",
        "catch 22"
    ]);

    const [wantToRead, setWantToRead] = useState([
        "wuthering heights bronte",
        "psychology and alchemy jung"
    ]);

    const addToFavorites = (book) => {
        setFavorites((prevFavorites) => {
            return [book, ...prevFavorites]; // adds to beginning
        });
    };

    const addToRecentActivity = (book) => {
        setRecentActivity((prevRecent) => {
            return [book, ...prevRecent];
        }); 
    };

    const addToWantToRead = (book) => {
        setWantToRead((prevWantToRead) => {
            return [...prevWantToRead, book];
        });
    };

    return (
        <BookContext.Provider
            value={{
                favorites,
                recentActivity,
                wantToRead,
                addToFavorites,
                addToRecentActivity,
                addToWantToRead
            }}
        >
            {children}
        </BookContext.Provider>
    );
};

export const useBookContext = () => useContext(BookContext);