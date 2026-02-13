import { useState } from "react";
import Navbar from "../components/Navbar";
import { backendUrl } from "../App";

function TopPicks() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("views");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Please enter a search term");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${backendUrl}/api/search?q=${query}&sort=${sort}`);
      const data = await res.json();
      setVideos(data.items || []);
    } catch (err) {
      setError("Failed to fetch videos. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 font-inter">
      {/* Header */}
      <Navbar />
      <header className="text-center py-24  border-b border-gray-200">
        <h1 className="text-4xl font-bold mb-2">
          <span className="text-red-500">YouTube</span> Top 5 Finder
        </h1>
        <p className="text-gray-500 text-sm">Discover the most popular videos</p>
      </header>

      {/* Search Section */}
      <section className="py-10 px-4 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Search Input */}
          <div className="flex items-center bg-white border border-gray-300 rounded-xl px-4 py-2 w-full shadow-sm focus-within:ring-2 focus-within:ring-red-400">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-gray-500"
            >
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3S3 5.91 3 9.5S5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5z" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search for videos..."
              className="bg-transparent focus:outline-none w-full ml-3 text-gray-800 placeholder-gray-500"
            />
          </div>

          {/* Sort Dropdown */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-white border border-gray-300 px-4 py-2 rounded-xl hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <option value="views">Most Views</option>
            <option value="likes">Most Likes</option>
          </select>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            disabled={loading}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-semibold transition duration-300 disabled:opacity-60"
          >
            {loading ? (
              <>
                <div className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></div>
                Searching...
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3S3 5.91 3 9.5S5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5z" />
                </svg>
                Search
              </>
            )}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-4 flex items-center gap-2 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
            {error}
          </div>
        )}
      </section>

      {/* Results Section */}
      <main className="max-w-6xl mx-auto px-4 pb-20">
        {videos.length > 0 && (
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Top {videos.length} Results</h2>
            <span className="text-gray-500 text-sm">
              Sorted by: {sort === "views" ? "Most Views" : "Most Likes"}
            </span>
          </div>
        )}

        {/* Videos Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((v, index) => (
            <div
              key={v.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-200 hover:shadow-lg hover:border-red-400 transition duration-300"
            >
              <div className="relative">
                <iframe
                  src={v.embedUrl}
                  title={v.title}
                  allowFullScreen
                  className="w-full h-48"
                ></iframe>
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  #{index + 1}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold line-clamp-2">{v.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{v.channel}</p>
                <div className="flex gap-4 text-sm text-gray-700">
                  <span className="flex items-center gap-1">👁 {v.viewCount}</span>
                  <span className="flex items-center gap-1">👍 {v.likeCount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty & Welcome States */}
        {!loading && videos.length === 0 && query && (
          <div className="text-center mt-16 text-gray-500">
            <h3 className="text-xl font-semibold">No videos found 😕</h3>
            <p>Try adjusting your search terms</p>
          </div>
        )}

        {!loading && !query && videos.length === 0 && (
          <div className="text-center mt-20">
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="mx-auto text-red-500 mb-4"
            >
              <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
            </svg>
            <h3 className="text-2xl font-semibold mb-1">Find Top YouTube Videos</h3>
            <p className="text-gray-500">
              Enter a search term above to discover the most popular videos
            </p>
          </div>
        )}
      </main>
      
    </div>
  );
}

export default TopPicks;