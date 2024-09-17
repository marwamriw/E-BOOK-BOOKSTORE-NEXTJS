"use client";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import axios from "axios";
import { bookType } from "@/types/book";
import LoadingSpinners from "../LoadingSpinners";

// Define props for Search component
interface SearchProps {
  onSearch: (results: bookType[]) => void; // Function to handle search results
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [query, setQuery] = useState("");
  const router = useRouter();

  const { data, isLoading } = useQuery<bookType[]>({
    queryKey: ["search", query],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:4000/api/book/search?title=${query}`
      );
      return response.data.data; // Ensure data structure matches expectations
    },
    enabled: !!query,
    retry: 1,
    onSuccess: (data) => {
      onSearch(data); // Pass the search results back to parent component
    },
  });

  const handleSearch = () => {
    setQuery(searchQuery);
    router.push(`/allBooks?query=${searchQuery}`);
  };

  return (
    <div>
      <div className="flex-1 flex justify-center mx-4 mb-12">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-3 border border-gray-300 rounded-l-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-white-500"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="absolute inset-y-0 right-0 px-4 py-3 text-white bg-orange-600 rounded-r-lg hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <FaSearch className="text-xl text-gray-400" />
          </button>
        </div>
      </div>
      {isLoading && <p><LoadingSpinners/></p>}
    </div>
  );
};

export default Search;
