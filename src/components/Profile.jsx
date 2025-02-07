import { FAVORITES, RECENT_ACTIVITY, WANT_TO_READ } from '../constants/index.js'
import { useState, useEffect } from 'react';

const Profile = () => {
    const [favoritesData, setFavoritesData] = useState([]);
    const [recentData, setRecentData] = useState([]);
    const [wantToReadData, setWantToReadData] = useState([]);

    function encode(str) {
        return str.split(' ').join('+')
    }

    const fetchBooks = async (bookList) => {
        try {
            const results = await Promise.all(
                bookList.map(async (bookTitle) => {
                    const response = await fetch(
                        `https://openlibrary.org/search.json?q=${encode(bookTitle)}&lang=en`
                    );
                    const data = await response.json();
                    console.log("data: ", data);
                    return {
                        title: data.docs[0]?.title, 
                        author: data.docs[0]?.author_name?.join(', '), 
                        cover: data.docs[0]?.cover_i
                    };
                })
            );
            return results;
        } catch (error) {
            console.error("Error fetching books:", error);
            return [];
        }
    };

    useEffect(() => {
        const fetchFavorites = async () => {
            const fetchedFavorites = await fetchBooks(FAVORITES);
            setFavoritesData(fetchedFavorites);
        };

        const fetchRecent = async () => {
            const fetchedRecent = await fetchBooks(RECENT_ACTIVITY);
            setRecentData(fetchedRecent);
        };

        const fetchWantToRead = async () => {
            const fetchedWantToRead = await fetchBooks(WANT_TO_READ);
            setWantToReadData(fetchedWantToRead);
        };

        fetchFavorites();
        fetchRecent();
        fetchWantToRead();
    }, []);

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className='text-[#494949] flex flex-col gap-10 items-center'>
                    {/* profile picture, name, and stats */}
                    <div className="flex flex-row gap-75">
                        <div className="flex flex-row items-center gap-10">
                            <img className="rounded-full w-30" src="profile.jpg"/>
                            <p className="text-2xl font-bold">meicib</p>
                        </div>
                        <div className="flex flex-row items-center gap-4">
                            <div className="flex flex-col items-center">
                                <p className="font-bold">{favoritesData.length + recentData.length}</p>
                                <p>novels</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="font-bold">0</p>
                                <p>followers</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="font-bold">0</p>
                                <p>following</p>
                            </div>
                        </div>
                    </div>

                    {/* container for book lists */}
                    <div className="flex flex-row flex-wrap w-2/3 gap-y-10 gap-x-30">

                        {/* favorites section */}
                        <div className='flex flex-col'>
                            <p className='text-sm border-b'>FAVORITES</p>
                            <div className='flex flex-row gap-4'>
                                {favoritesData.map((book, index) => (
                                    <div key={index} className="flex flex-col items-center text-xs group">
                                        {book.cover && (
                                            <div className="relative mt-2">
                                                <img
                                                    src={`https://covers.openlibrary.org/b/id/${book.cover}-M.jpg`}
                                                    alt={book.title}
                                                    className="w-20 h-30 object-cover rounded-sm"
                                                />
                                                <div className="absolute inset-0 bg-[#494949] bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[#FFFDF6] transition-opacity w-20 h-30 rounded-sm">
                                                    <div className="text-center">
                                                        <p className="font-bold">{(book.title).toUpperCase()}</p>
                                                        <p>{book.author}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        

                        {/* want to read section */}
                        <div className='flex flex-col'>
                            <p className='text-sm border-b'>WANT TO READ</p>
                            <div className='flex flex-row gap-4'>
                                {wantToReadData.map((book, index) => (
                                    <div key={index} className="flex flex-col items-center text-xs group">
                                        {book.cover && (
                                            <div className="relative mt-2">
                                                <img
                                                    src={`https://covers.openlibrary.org/b/id/${book.cover}-M.jpg`}
                                                    alt={book.title}
                                                    className="w-20 h-30 object-cover rounded-sm"
                                                />
                                                <div className="absolute inset-0 bg-[#494949] bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[#FFFDF6] transition-opacity w-20 h-30 rounded-sm">
                                                    <div className="text-center">
                                                        <p className="font-bold">{(book.title).toUpperCase()}</p>
                                                        <p>{book.author}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* recent activity section */}
                        <div className='flex flex-col'>
                            <p className='text-sm border-b'>RECENT ACTIVITY</p>
                            <div className='flex flex-row gap-4'>
                                {recentData.map((book, index) => (
                                    <div key={index} className="flex flex-col items-center text-xs group">
                                        {book.cover && (
                                            <div className="relative mt-2">
                                                <img
                                                    src={`https://covers.openlibrary.org/b/id/${book.cover}-M.jpg`}
                                                    alt={book.title}
                                                    className="w-20 h-30 object-cover rounded-sm"
                                                />
                                                <div className="absolute inset-0 bg-[#494949] bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[#FFFDF6] transition-opacity w-20 h-30 rounded-sm">
                                                    <div className="text-center">
                                                        <p className="font-bold">{(book.title).toUpperCase()}</p>
                                                        <p>{book.author}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default Profile;