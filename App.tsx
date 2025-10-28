import React, { useState, useCallback } from 'react';
import { analyzeNewsArticle, analyzeImageNews } from './services/geminiService.js';
import Header from './components/Header.jsx';
import AnalysisResultCard from './components/AnalysisResultCard.jsx';
import Spinner from './components/Spinner.jsx';
import ImageUploader from './components/ImageUploader.jsx';

const App = () => {
  const [analysisMode, setAnalysisMode] = useState('text');
  const [articleText, setArticleText] = useState('');
  const [image, setImage] = useState(null);
  const [imageContext, setImageContext] = useState('');
  
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleModeChange = (mode) => {
    if (mode === analysisMode) return;
    
    setAnalysisMode(mode);
    // Clear inputs and results when switching modes
    setArticleText('');
    setImage(null);
    setImageContext('');
    setAnalysis(null);
    setError(null);
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (analysisMode === 'text' && !articleText.trim()) {
      setError("Please paste an article text to analyze.");
      return;
    }
    if (analysisMode === 'image' && !image) {
      setError("Please upload an image to analyze.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      let result;
      if (analysisMode === 'text') {
        result = await analyzeNewsArticle(articleText);
      } else if (image) {
        result = await analyzeImageNews(image.base64, image.file.type, imageContext);
      }
      setAnalysis(result);
    } catch (err) {
      console.error(err);
      setError("Failed to analyze the content. The input might be invalid, or an API error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [analysisMode, articleText, image, imageContext]);
  
  const isSubmitDisabled = isLoading || (analysisMode === 'text' && !articleText.trim()) || (analysisMode === 'image' && !image);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col items-center">
      <Header />
      <main className="w-full max-w-4xl mx-auto p-4 md:p-8 flex-grow">
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-700">
          
          <div className="flex justify-center items-center gap-2 mb-6">
            <button
              type="button"
              onClick={() => handleModeChange('text')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                analysisMode === 'text'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Text Analysis
            </button>
            <button
              type="button"
              onClick={() => handleModeChange('image')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                analysisMode === 'image'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Image Analysis
            </button>
          </div>

          <p className="text-gray-400 mb-4 text-center">
            {analysisMode === 'text'
              ? 'Paste the full text of a news article below to check for signs of misinformation.'
              : 'Upload an image to check for signs of manipulation or out-of-context use.'
            }
          </p>

          <form onSubmit={handleSubmit}>
            {analysisMode === 'text' ? (
              <textarea
                value={articleText}
                onChange={(e) => setArticleText(e.target.value)}
                placeholder="Paste news article text here..."
                className="w-full h-64 p-4 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow duration-300 resize-y text-gray-200"
                disabled={isLoading}
              />
            ) : (
              <div className="flex flex-col gap-4">
                <ImageUploader onImageChange={setImage} disabled={isLoading} />
                 <textarea
                  value={imageContext}
                  onChange={(e) => setImageContext(e.target.value)}
                  placeholder="Optional: Add any context about the image (e.g., where you saw it, the headline it was with)..."
                  className="w-full h-28 p-4 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow duration-300 resize-y text-gray-200"
                  disabled={isLoading}
                />
              </div>
            )}
            <button
              type="submit"
              disabled={isSubmitDisabled}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-blue-500/50"
            >
              {isLoading ? (
                <>
                  <Spinner />
                  Analyzing...
                </>
              ) : (
                analysisMode === 'text' ? 'Analyze Article' : 'Analyze Image'
              )}
            </button>
          </form>
        </div>

        <div className="mt-8">
          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
          {!isLoading && !error && !analysis && (
             <div className="text-center text-gray-500 py-10">
                <p>Your analysis results will appear here.</p>
             </div>
          )}
          
          {analysis && <AnalysisResultCard result={analysis} />}
        </div>
      </main>
      <footer className="w-full text-center p-4 text-gray-600 text-sm">
       Created By Soumyajeet Das
      </footer>
    </div>
  );
};

export default App;