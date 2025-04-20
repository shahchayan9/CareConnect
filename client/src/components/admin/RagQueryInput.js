import React, { useState } from 'react';
import api from '../../services/api';

function RagQueryInput() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.post('/admin/rag-query', { query });
      setResults(response.data);
    } catch (err) {
      console.error('Error querying RAG system:', err);
      setError('Failed to process your query. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const exampleQueries = [
    "Who's trained in Peer-to-Peer program and available next weekend?",
    "Which region has the lowest volunteer engagement?",
    "Summarize feedback from last month's sessions"
  ];

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about volunteers, trainings, or regions..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {/* Example queries */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Try asking:</p>
        <div className="flex flex-wrap gap-2">
          {exampleQueries.map((exampleQuery, index) => (
            <button
              key={index}
              onClick={() => setQuery(exampleQuery)}
              className="text-xs bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1 text-gray-700"
            >
              {exampleQuery}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {error && (
        <div className="p-4 bg-red-50 text-red-500 rounded-md mb-4">
          {error}
        </div>
      )}
      
      {results && (
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="font-medium mb-2">Results:</h3>
          <div className="text-gray-700">
            {Array.isArray(results.volunteers) ? (
              <div>
                <p>{results.summary}</p>
                <div className="mt-2">
                  <h4 className="font-medium text-sm">Matching Volunteers:</h4>
                  <ul className="list-disc list-inside">
                    {results.volunteers.map((volunteer, index) => (
                      <li key={index}>
                        {volunteer.name} - {volunteer.skills.join(', ')}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <p>{results.response}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default RagQueryInput;
