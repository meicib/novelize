import { useState } from "react";
import { IoArrowForward, IoAddCircleOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { GoClock } from "react-icons/go";

const Search = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    function encode(str) {
        return str.split(' ').join('+')
    }

    const getBooks = async (searchTerms) => {
        try {
            const response = await fetch(`https://openlibrary.org/search.json?q=${encode(searchTerms)}&lang=en`);
            const data = await response.json();
            console.log("data: ", data)
            return data.docs.slice(0, 5);
        } catch (error) {
            console.error("Error getting books:", error);
            return [];
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const booksData = await getBooks(searchTerm);
        setBooks(booksData);
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
                                            <p className="">{book.author_name.join(", ")}</p>
                                            <div className="flex flex-row gap-2">
                                                <button className="text-[25px] mt-9"> <IoAddCircleOutline /> </button>
                                                <button className="text-[25px] mt-9"> <IoMdHeartEmpty /> </button>
                                                <button className="text-[23px] mt-9"> <GoClock /> </button>
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

    )
}

export default Search;