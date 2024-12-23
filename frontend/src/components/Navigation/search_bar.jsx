import { SearchIcon } from "lucide-react";
import React from "react";

function SearchBar({ handleSearch }) {
    return (
        <div className="w-full sm:w-auto flex justify-start items-center my-5">
            <SearchIcon className="mr-2 text-gray-500" size={20} />
            <input
                className="rounded-lg border border-gray-300 h-10 text-sm w-full sm:w-60 px-3 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="text"
                onChange={handleSearch}
                placeholder="Buscar"
            />
        </div>
    );
}

export default SearchBar;
