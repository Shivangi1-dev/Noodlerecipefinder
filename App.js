import React, { useState, useEffect } from 'react';

const API_KEY = '37fab6ca6dc04f8fa5974748250422f5'; // Get one for free at spoonacular.com/food-api

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('noodles');
  const [loading, setLoading] = useState(false);

  const fetchRecipes = async (searchQuery) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${searchQuery}&number=12`
      );
      const data = await response.json();
      setRecipes(data.results);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRecipes('noodles');
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRecipes(query);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <header className="max-w-6xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold text-orange-600 mb-4">🍜 Noodle Express</h1>
        <form onSubmit={handleSearch} className="flex gap-2 justify-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search noodles (e.g., Ramen, Pad Thai)..."
            className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button type="submit" className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition">
            Search
          </button>
        </form>
      </header>

      <main className="max-w-6xl mx-auto">
        {loading ? (
          <div className="text-center text-xl">Boiling the water... (Loading)</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
                <img 
                  src={recipe.image} 
                  alt={recipe.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 truncate">{recipe.title}</h3>
                  <a 
                    href={`https://spoonacular.com/recipes/${recipe.title.replace(/\s+/g, '-')}-${recipe.id}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-orange-500 font-semibold hover:underline"
                  >
                    View Full Recipe →
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
