import "./App.css";
import { useForm } from "react-hook-form";
import { useDebounce } from "@uidotdev/usehooks";
import { useQuery } from "@tanstack/react-query";

type SearchFormData = {
  search: string;
};

// Add this search function outside the component
const searchItems = async (searchTerm: string) => {
  // Mock API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Return mock data based on search term
  return {
    results: [
      {
        id: 1,
        title: `Result 1 for "${searchTerm}"`,
        description: "This is a detailed description for result 1",
        price: 29.99,
        rating: 4.5,
      },
      {
        id: 2,
        title: `Result 2 for "${searchTerm}"`,
        description: "This is a detailed description for result 2",
        price: 19.99,
        rating: 4.2,
      },
      {
        id: 3,
        title: `Result 3 for "${searchTerm}"`,
        description: "This is a detailed description for result 3",
        price: 39.99,
        rating: 4.8,
      },
    ],
  };
};

// Add this interface at the top with other types
interface SearchResult {
  id: number;
  title: string;
  description?: string;
  price?: number;
  rating?: number;
}

function App() {
  const { register, watch } = useForm<SearchFormData>({
    defaultValues: {
      search: "",
    },
  });

  const searchValue = watch("search");
  const debouncedSearch = useDebounce(searchValue, 500);

  // Replace the useEffect with useQuery
  const { data, isLoading, error } = useQuery<{ results: SearchResult[] }>({
    queryKey: ["search", debouncedSearch],
    queryFn: () => searchItems(debouncedSearch),
    enabled: Boolean(debouncedSearch), // Only run query if search term exists
  });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label htmlFor="search" className="block text-gray-700 text-sm font-bold mb-2">
              Search
            </label>
            <input
              {...register("search")}
              id="search"
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter search term..."
            />
          </div>

          {/* Add loading and error states */}
          {isLoading && <p className="text-gray-600">Loading...</p>}
          {error && <p className="text-red-500">Error: {(error as Error).message}</p>}
        </form>

        {data?.results && data.results.length > 0 && (
          <div className="space-y-4">
            {data.results.map((item: SearchResult) => (
              <div
                key={item.id}
                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                <h3 className="font-semibold text-lg text-gray-800">{item.title}</h3>
                <p className="text-gray-600 mt-2">{item.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500">${item.price}</span>
                  <span className="text-sm text-gray-500">Rating: {item.rating}/5</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
