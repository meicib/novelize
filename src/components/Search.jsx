import { useState } from "react";
import { useBookContext } from "./BookContext.jsx";
import { IoArrowForward, IoAddCircleOutline, IoAddCircle } from "react-icons/io5";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { GoClock, GoClockFill } from "react-icons/go";

const Search = () => {
    const [books, setBooks] = useState([]); // list of books from api call on search terms
    const [searchTerm, setSearchTerm] = useState("");
    const { addToFavorites, addToRecentActivity, addToWantToRead } = useBookContext();
    
    // separate states for each book's button status
    const [addedStates, setAddedStates] = useState({
        recentAdded: {},
        favAdded: {},
        wantAdded: {}
    });

    function encode(str) {
        return str.split(' ').join('+') // this is specific to open library api
    }

    const getBooks = async (searchTerms) => {
        try {
            const response = await fetch(`https://openlibrary.org/search.json?q=${encode(searchTerms)}&lang=en`);
            const data = await response.json();
            return data.docs.slice(0, 5);
        } catch (error) {
            console.error("error!", error);
            return [];
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent form from reloading
        const booksData = await getBooks(searchTerm); // call api on search term(s)
        setBooks(booksData); // and put the api result in the books list
    };

    const handleAdd = (type, book) => {
        // update the added state based on the button type and book title
        setAddedStates((prevState) => {
            const newState = { ...prevState };
            newState[type][book.title] = true; // mark the book as added for the specific button type
            return newState;
        });

        // call the corresponding function to add the book to the respective list
        if (type === "recentAdded") {
            addToRecentActivity(book.title);
        } else if (type === "favAdded") {
            addToFavorites(book.title);
        } else if (type === "wantAdded") {
            addToWantToRead(book.title);
        }
    };

    return (
        <div className="flex flex-col items-center pt-40 min-h-screen gap-10">
            <form onSubmit={handleSubmit} className="flex flex-row justify-center items-center w-1/2 gap-4">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="search for novels, authors..."
                    className="border-2 border-[#494949] p-2 rounded-md text-[#494949] w-full"
                />
                <button type="submit" className="text-[#494949] text-2xl">
                    <IoArrowForward />
                </button>
            </form>

            {/* displays up to 5 books as a result of search term in a scrollable container */}
            {books.length > 0 && (
                <div className="w-1/2 h-123 overflow-y-auto">
                    <ul className="flex flex-col gap-4">
                        {books.map((book, index) => (
                            <li key={index}>
                                {book.cover_i && book.title && book.author_name && (
                                    <div className="flex flex-row items-start text-sm text-[#494949]">
                                        <img
                                            src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                                            alt={book.title}
                                            className="mt-2 w-20 h-30 object-cover"
                                        />
                                        <div className="pt-4 pl-4">
                                            <h3 className="font-bold">{book.title}</h3>
                                            <p>{book.author_name.join(", ")}</p>

                                            {/* click to add to library, to recent, favorites, and want-to-read shelves respectively*/}
                                            <div className="flex flex-row gap-2">
                                                <button 
                                                    className="text-[25px] mt-9 transition-transform duration-200 hover:scale-110"
                                                    onClick={() => handleAdd("recentAdded", book)}> 
                                                    {addedStates.recentAdded[book.title] ? <IoAddCircle /> : <IoAddCircleOutline />}
                                                </button>
                                                <button 
                                                    className="text-[25px] mt-9 transition-transform duration-200 hover:scale-110"
                                                    onClick={() => handleAdd("favAdded", book)}> 
                                                    {addedStates.favAdded[book.title] ? <IoMdHeart /> : <IoMdHeartEmpty />}
                                                </button>
                                                <button 
                                                    className="text-[23px] mt-9 transition-transform duration-200 hover:scale-110"
                                                    onClick={() => handleAdd("wantAdded", book)}>
                                                    {addedStates.wantAdded[book.title] ? <GoClockFill /> : <GoClock />}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Search;
