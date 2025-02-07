import { useState } from "react";
import { Link } from "react-router-dom";
import { IoClose, IoAdd } from "react-icons/io5";

const Menu = () => {
    const [isOpen, setIsOpen] = useState(false); // is the menu open?

    return (
        <>
            <div 
                className={`fixed top-0 right-0 h-full w-90 bg-[#FAF6E9] shadow-xl text-[#494949] transform transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}>
                    
                {/* menu content */}
                <ul className="pt-15 font-[HeadingNow] text-[40px]">
                    <li>
                        <div className="w-full hover:bg-[#494949] hover:text-[#FAF6E9] transition duration-250">
                            {/* closes the menu after you click something */}
                            <Link className="pl-10" to="/profile" onClick={() => setIsOpen(false)}>
                                PROFILE
                            </Link>
                        </div>
                    </li>
                    <li>
                    <div className="w-full hover:bg-[#494949] hover:text-[#FAF6E9] transition duration-250">
                            <Link className="pl-10" to="/search" onClick={() => setIsOpen(false)}>
                                SEARCH
                            </Link>
                        </div>
                    </li>
                </ul>
            </div>

            {/* button to open and close menu manually */}
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="text-[#494949] absolute top-4 right-4">
                {isOpen ? (
                    <div className="flex flex-row items-center gap-1">
                        close
                        <IoClose />
                    </div>
                ) : (
                    <div className="flex flex-row items-center gap-1">
                        menu
                        <IoAdd />
                    </div>
                )}
            </button>
        </>
    )
}

export default Menu;