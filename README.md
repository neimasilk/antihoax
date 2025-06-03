# AntiHoax Cerdas AI

## Overview
**AntiHoax Cerdas AI** is a web-based application designed to combat misinformation in Indonesia by providing tools to verify the authenticity of news articles. The app leverages AI-based text analysis, a verified hoax database, crowdsourced reporting, and an interactive digital literacy module to empower users to distinguish between facts and hoaxes. It is tailored for the Indonesian context, supporting local languages and addressing region-specific misinformation challenges.

## Features
- **News Verification**: Users can input news text, URLs, or images for verification using AI and a hoax database.
- **Crowdsourced Reporting**: Users can report suspected hoaxes, contributing to a community-driven verification process.
- **Clear Verification Results**: Displays results with a trust score and explanations (e.g., "Hoax," "Fact," or "Needs Further Review").
- **Digital Literacy Module**: Interactive quizzes and educational content to improve users' ability to identify misinformation.
- **Multi-language Support**: Supports Bahasa Indonesia and regional languages (e.g., Javanese, Sundanese) with automatic language detection.

## Tech Stack
- **Frontend**: React.js with Vite for fast development and Tailwind CSS for styling.
- **Backend**: (Planned) Node.js with Express for API, MongoDB for storing hoax data and user reports.
- **AI/NLP**: (Planned) IndoBERT or similar models for text analysis, Tesseract.js for OCR (image text extraction).
- **Deployment**: Vercel or AWS for scalable hosting.

## Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)
- Git

## Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/antihoax-cerdas-ai.git
   cd antihoax-cerdas-ai
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Tailwind CSS**:
   Ensure Tailwind CSS is configured by initializing it:
   ```bash
   npx tailwindcss init -p
   ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

## Usage
1. **Verify News**:
   - Navigate to the homepage.
   - Enter news text or a URL in the provided textarea.
   - Click "Verifikasi Berita" to see the verification result, including a trust score and explanation.

2. **Report a Hoax**:
   - (Planned) Use the "Laporkan Hoaks" button to submit suspected hoaxes for community or moderator review.

3. **Learn Digital Literacy**:
   - Access the "Pelajari Literasi Digital" link for interactive quizzes and educational content.

## Project Structure
```
antihoax-cerdas-ai/
├── public/
│   └── index.html         # Main HTML file
├── src/
│   ├── App.jsx            # Main React component
│   ├── main.jsx           # Entry point for React
│   ├── index.css          # Tailwind CSS styles
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
├── package.json           # Project dependencies and scripts
└── README.md              # This file
```

## Planned Features
- Backend API for integrating with a hoax database (e.g., Mafindo).
- OCR support for extracting text from images using Tesseract.js.
- Enhanced AI verification with IndoBERT for local language processing.
- Gamification for crowdsourced reporting (e.g., badges for active users).
- Mobile app versions for Android and iOS.

## Contributing
We welcome contributions! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

Please ensure your code follows the project's coding standards and includes tests where applicable.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
For questions or feedback, reach out via:
- Email: your-email@example.com
- GitHub Issues: [Create an Issue](https://github.com/your-username/antihoax-cerdas-ai/issues)

## Acknowledgments
- Inspired by the need to combat misinformation in Indonesia.
- Thanks to open-source communities like React, Tailwind CSS, and Vite.
- Future integrations planned with Mafindo and Kominfo for verified hoax data.

*Last Updated: June 3, 2025*
