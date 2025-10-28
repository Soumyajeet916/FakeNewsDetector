# Fake News Detector

A React-based web application that uses Google's Gemini AI to detect and analyze potential fake news from text and images.

## Features

- Text-based fake news detection
- Image analysis for potential manipulation
- Real-time analysis using Gemini AI
- User-friendly interface
- Detailed analysis results

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- A Google Cloud API key with Gemini API access

## Dependencies

```json
{
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "@google/genai": "^1.27.0",
    "lucide-react": "^0.417.0"
  },
  "devDependencies": {
    "@types/node": "^22.14.0",
    "@vitejs/plugin-react": "^5.0.0",
    "typescript": "~5.8.2",
    "vite": "^6.2.0"
  }
}
```

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Soumyajeet916/FakeNewsDetector.git
   cd FakeNewsDetector
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your Gemini API key:
   ```
   API_KEY=your_gemini_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to the URL shown in the terminal 

## Usage

1. Enter the text you want to analyze in the text input field, or
2. Upload an image that you want to analyze for potential manipulation
3. Click the "Analyze" button
4. View the detailed analysis results:
   - Credibility score
   - Potential misinformation flags
   - Source verification
   - Context analysis

## Build for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Environment Variables

- `API_KEY`: Your Google Gemini API key (required)

## Tech Stack

- React
- TypeScript
- Vite
- Google Gemini AI
- Lucide React (for icons)

## Project Structure

```
├── components/
│   ├── AnalysisResultCard.tsx
│   ├── Header.tsx
│   ├── ImageUploader.tsx
│   └── Spinner.tsx
├── services/
│   └── geminiService.ts
├── App.tsx
├── index.tsx
├── vite.config.ts
└── tsconfig.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
