import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import your CSS file for styling

function App() {
    const [url, setUrl] = useState('');
    const [slug, setSlug] = useState('');
    const [result, setResult] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const backendUrl =process.env.REACT_APP_BACKEND_URL; // Replace with your actual backend URL
            const response = await axios.post(`${backendUrl}/url`, { url, slug });
            setResult(`${backendUrl}/${response.data.slug}`);
        } catch (error) {
            setResult(`Error: ${error.response ? error.response.data.message : error.message}`);
        }
    };

    return (
        <div className="container">
            <h1>URL Shorty!</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="url">URL:</label>
                    <input
                        type="url"
                        id="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter your URL"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="slug">Custom Slug (Optional):</label>
                    <input
                        type="text"
                        id="slug"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        placeholder="Enter custom slug"
                    />
                </div>
                <button type="submit">Shorten</button>
            </form>
            <div id="result">
                {result && (
                    <p>
                        Shortened URL: <a href={result} target="_blank" rel="noopener noreferrer">{result}</a>
                    </p>
                )}
            </div>
        </div>
    );
}

export default App;
