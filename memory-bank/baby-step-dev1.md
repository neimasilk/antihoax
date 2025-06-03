# Baby-Step Development Guide: Frontend Developer (Dev1)

**Role:** Frontend Developer - UI/UX and React Components
**Timeline:** Week 1-2 (Parallel with Backend and Data teams)
**Prerequisites:** Basic knowledge of React.js, Tailwind CSS, and modern JavaScript

## CRITICAL RULE: DO NOT PROCEED TO NEXT STEP UNTIL ALL TESTS PASS

Each step must be completed and tested thoroughly before moving to the next step. This ensures code quality and prevents cascading issues.

## Phase 1: Project Setup and Environment (Day 1)

### Step 1.1: Initialize React Project with Tailwind CSS

**Objective:** Set up a clean React project with Tailwind CSS for styling

**Tasks:**
1. Create new React project using Create React App:
   ```bash
   npx create-react-app antihoax-frontend
   cd antihoax-frontend
   ```

2. Install and configure Tailwind CSS:
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

3. Configure `tailwind.config.js`:
   ```javascript
   module.exports = {
     content: [
       "./src/**/*.{js,jsx,ts,tsx}",
     ],
     theme: {
       extend: {
         colors: {
           'hoax-red': '#ef4444',
           'fact-green': '#22c55e',
           'neutral-yellow': '#eab308',
         }
       },
     },
     plugins: [],
   }
   ```

4. Update `src/index.css` with Tailwind directives:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

**Validation Criteria:**
- [ ] React app starts successfully with `npm start`
- [ ] Tailwind CSS classes work (test with a simple colored div)
- [ ] No console errors in browser
- [ ] Custom colors (hoax-red, fact-green, neutral-yellow) are accessible

**Testing:**
```javascript
// Add this to App.js temporarily to test Tailwind
<div className="bg-hoax-red text-white p-4">Hoax Red Test</div>
<div className="bg-fact-green text-white p-4">Fact Green Test</div>
<div className="bg-neutral-yellow text-white p-4">Neutral Yellow Test</div>
```

### Step 1.2: Create Project Structure

**Objective:** Establish a clean and scalable folder structure

**Tasks:**
1. Create folder structure in `src/`:
   ```
   src/
   ├── components/
   │   ├── common/
   │   ├── forms/
   │   └── results/
   ├── pages/
   ├── hooks/
   ├── utils/
   ├── services/
   └── constants/
   ```

2. Create index files for each component folder:
   ```javascript
   // src/components/common/index.js
   // src/components/forms/index.js
   // src/components/results/index.js
   ```

**Validation Criteria:**
- [ ] All folders are created correctly
- [ ] Index files exist and can be imported without errors
- [ ] Project structure follows React best practices

## Phase 2: Core UI Components (Day 2-3)

### Step 2.1: Create Input Component

**Objective:** Build a reusable text input component for news verification

**Tasks:**
1. Create `src/components/forms/NewsInput.jsx`:
   ```javascript
   import React, { useState } from 'react';
   
   const NewsInput = ({ onSubmit, isLoading = false }) => {
     const [inputText, setInputText] = useState('');
     const [inputType, setInputType] = useState('text'); // text, url
   
     const handleSubmit = (e) => {
       e.preventDefault();
       if (inputText.trim()) {
         onSubmit({
           text: inputText.trim(),
           type: inputType
         });
       }
     };
   
     return (
       <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
         {/* Input type selector */}
         <div className="mb-4">
           <div className="flex space-x-4">
             <label className="flex items-center">
               <input
                 type="radio"
                 value="text"
                 checked={inputType === 'text'}
                 onChange={(e) => setInputType(e.target.value)}
                 className="mr-2"
               />
               Teks Berita
             </label>
             <label className="flex items-center">
               <input
                 type="radio"
                 value="url"
                 checked={inputType === 'url'}
                 onChange={(e) => setInputType(e.target.value)}
                 className="mr-2"
               />
               URL Berita
             </label>
           </div>
         </div>
   
         {/* Text input area */}
         <div className="mb-4">
           <textarea
             value={inputText}
             onChange={(e) => setInputText(e.target.value)}
             placeholder={inputType === 'text' ? 
               'Masukkan teks berita yang ingin diverifikasi...' : 
               'Masukkan URL berita yang ingin diverifikasi...'}
             className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
             disabled={isLoading}
           />
         </div>
   
         {/* Submit button */}
         <div className="text-center">
           <button
             type="submit"
             disabled={!inputText.trim() || isLoading}
             className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
           >
             {isLoading ? 'Memverifikasi...' : 'Verifikasi Berita'}
           </button>
         </div>
       </form>
     );
   };
   
   export default NewsInput;
   ```

2. Create `src/components/forms/index.js`:
   ```javascript
   export { default as NewsInput } from './NewsInput';
   ```

**Validation Criteria:**
- [ ] Component renders without errors
- [ ] Radio buttons switch between text and URL modes
- [ ] Placeholder text changes based on input type
- [ ] Submit button is disabled when input is empty
- [ ] Loading state disables input and shows loading text
- [ ] onSubmit callback receives correct data format

**Testing:**
```javascript
// Test in App.js
import { NewsInput } from './components/forms';

function App() {
  const handleSubmit = (data) => {
    console.log('Submitted:', data);
  };

  return (
    <div className="p-8">
      <NewsInput onSubmit={handleSubmit} />
    </div>
  );
}
```

### Step 2.2: Create Result Display Component

**Objective:** Build a component to display verification results clearly

**Tasks:**
1. Create `src/components/results/VerificationResult.jsx`:
   ```javascript
   import React from 'react';
   
   const VerificationResult = ({ result }) => {
     if (!result) return null;
   
     const getStatusConfig = (status) => {
       switch (status?.toLowerCase()) {
         case 'hoaks':
         case 'hoax':
           return {
             color: 'hoax-red',
             bgColor: 'red-50',
             borderColor: 'red-200',
             icon: '⚠️',
             label: 'TERINDIKASI HOAKS'
           };
         case 'fakta':
         case 'fact':
           return {
             color: 'fact-green',
             bgColor: 'green-50',
             borderColor: 'green-200',
             icon: '✅',
             label: 'KEMUNGKINAN FAKTA'
           };
         case 'meragukan':
         case 'perlu_verifikasi':
         default:
           return {
             color: 'neutral-yellow',
             bgColor: 'yellow-50',
             borderColor: 'yellow-200',
             icon: '❓',
             label: 'PERLU VERIFIKASI LEBIH LANJUT'
           };
       }
     };
   
     const config = getStatusConfig(result.status);
   
     return (
       <div className={`w-full max-w-4xl mx-auto mt-8 p-6 border-2 border-${config.borderColor} bg-${config.bgColor} rounded-lg`}>
         {/* Status Header */}
         <div className="flex items-center mb-4">
           <span className="text-2xl mr-3">{config.icon}</span>
           <h2 className={`text-xl font-bold text-${config.color}`}>
             {config.label}
           </h2>
         </div>
   
         {/* Confidence Score */}
         {result.confidence && (
           <div className="mb-4">
             <div className="flex justify-between items-center mb-2">
               <span className="text-sm font-medium text-gray-700">Tingkat Keyakinan:</span>
               <span className="text-sm font-bold">{Math.round(result.confidence * 100)}%</span>
             </div>
             <div className="w-full bg-gray-200 rounded-full h-2">
               <div 
                 className={`bg-${config.color} h-2 rounded-full transition-all duration-300`}
                 style={{ width: `${result.confidence * 100}%` }}
               ></div>
             </div>
           </div>
         )}
   
         {/* Explanation */}
         {result.explanation && (
           <div className="mb-4">
             <h3 className="font-semibold text-gray-800 mb-2">Penjelasan:</h3>
             <p className="text-gray-700 leading-relaxed">{result.explanation}</p>
           </div>
         )}
   
         {/* Red Flags */}
         {result.redFlags && result.redFlags.length > 0 && (
           <div className="mb-4">
             <h3 className="font-semibold text-gray-800 mb-2">Indikator yang Ditemukan:</h3>
             <ul className="list-disc list-inside space-y-1">
               {result.redFlags.map((flag, index) => (
                 <li key={index} className="text-gray-700">{flag}</li>
               ))}
             </ul>
           </div>
         )}
   
         {/* Sources */}
         {result.sources && result.sources.length > 0 && (
           <div>
             <h3 className="font-semibold text-gray-800 mb-2">Sumber Referensi:</h3>
             <ul className="space-y-1">
               {result.sources.map((source, index) => (
                 <li key={index}>
                   <a 
                     href={source.url} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="text-blue-600 hover:text-blue-800 underline"
                   >
                     {source.title || source.url}
                   </a>
                 </li>
               ))}
             </ul>
           </div>
         )}
       </div>
     );
   };
   
   export default VerificationResult;
   ```

2. Update `src/components/results/index.js`:
   ```javascript
   export { default as VerificationResult } from './VerificationResult';
   ```

**Validation Criteria:**
- [ ] Component renders different styles for each status (hoaks, fakta, meragukan)
- [ ] Confidence score displays correctly with progress bar
- [ ] Explanation text renders properly
- [ ] Red flags list displays when available
- [ ] Sources links are clickable and open in new tab
- [ ] Component handles missing data gracefully

**Testing:**
```javascript
// Test data for different scenarios
const testResults = {
  hoax: {
    status: 'hoaks',
    confidence: 0.85,
    explanation: 'Berita ini mengandung klaim yang tidak didukung bukti dan menggunakan bahasa sensasional.',
    redFlags: ['Tidak ada sumber yang kredibel', 'Bahasa sensasional', 'Klaim tidak terverifikasi'],
    sources: []
  },
  fact: {
    status: 'fakta',
    confidence: 0.92,
    explanation: 'Informasi ini didukung oleh sumber-sumber terpercaya dan data yang dapat diverifikasi.',
    redFlags: [],
    sources: [
      { title: 'Kompas.com', url: 'https://kompas.com' },
      { title: 'Detik.com', url: 'https://detik.com' }
    ]
  }
};
```

### Step 2.3: Create Loading Component

**Objective:** Build a loading indicator for better user experience

**Tasks:**
1. Create `src/components/common/LoadingSpinner.jsx`:
   ```javascript
   import React from 'react';
   
   const LoadingSpinner = ({ message = 'Memproses...', size = 'medium' }) => {
     const sizeClasses = {
       small: 'w-4 h-4',
       medium: 'w-8 h-8',
       large: 'w-12 h-12'
     };
   
     return (
       <div className="flex flex-col items-center justify-center p-8">
         <div className={`${sizeClasses[size]} border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin`}></div>
         <p className="mt-4 text-gray-600 text-center">{message}</p>
       </div>
     );
   };
   
   export default LoadingSpinner;
   ```

2. Update `src/components/common/index.js`:
   ```javascript
   export { default as LoadingSpinner } from './LoadingSpinner';
   ```

**Validation Criteria:**
- [ ] Spinner animates smoothly
- [ ] Different sizes work correctly
- [ ] Message displays properly
- [ ] Component is reusable across the app

## Phase 3: Main Page Layout (Day 4)

### Step 3.1: Create Main Application Layout

**Objective:** Integrate all components into a cohesive main page

**Tasks:**
1. Create `src/pages/HomePage.jsx`:
   ```javascript
   import React, { useState } from 'react';
   import { NewsInput } from '../components/forms';
   import { VerificationResult } from '../components/results';
   import { LoadingSpinner } from '../components/common';
   
   const HomePage = () => {
     const [isLoading, setIsLoading] = useState(false);
     const [result, setResult] = useState(null);
     const [error, setError] = useState(null);
   
     const handleVerification = async (inputData) => {
       setIsLoading(true);
       setError(null);
       setResult(null);
   
       try {
         // TODO: Replace with actual API call when backend is ready
         // Simulate API call for now
         await new Promise(resolve => setTimeout(resolve, 2000));
         
         // Mock result for testing
         const mockResult = {
           status: 'meragukan',
           confidence: 0.65,
           explanation: 'Sistem sedang menganalisis konten ini. Hasil sementara menunjukkan perlu verifikasi lebih lanjut.',
           redFlags: ['Konten belum diverifikasi', 'Memerlukan analisis lebih mendalam'],
           sources: []
         };
         
         setResult(mockResult);
       } catch (err) {
         setError('Terjadi kesalahan saat memverifikasi berita. Silakan coba lagi.');
       } finally {
         setIsLoading(false);
       }
     };
   
     return (
       <div className="min-h-screen bg-gray-50">
         {/* Header */}
         <header className="bg-white shadow-sm border-b">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
             <div className="text-center">
               <h1 className="text-3xl font-bold text-gray-900">AntiHoax Cerdas AI</h1>
               <p className="mt-2 text-lg text-gray-600">
                 Verifikasi berita dengan teknologi AI untuk melawan hoaks
               </p>
             </div>
           </div>
         </header>
   
         {/* Main Content */}
         <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
           {/* Input Section */}
           <section className="mb-8">
             <NewsInput 
               onSubmit={handleVerification} 
               isLoading={isLoading}
             />
           </section>
   
           {/* Loading Section */}
           {isLoading && (
             <section>
               <LoadingSpinner 
                 message="Menganalisis berita dengan AI..." 
                 size="large"
               />
             </section>
           )}
   
           {/* Error Section */}
           {error && (
             <section>
               <div className="max-w-4xl mx-auto p-4 bg-red-50 border border-red-200 rounded-lg">
                 <p className="text-red-700">{error}</p>
               </div>
             </section>
           )}
   
           {/* Result Section */}
           {result && !isLoading && (
             <section>
               <VerificationResult result={result} />
             </section>
           )}
         </main>
   
         {/* Footer */}
         <footer className="bg-white border-t mt-16">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
             <div className="text-center text-gray-500">
               <p>&copy; 2024 AntiHoax Cerdas AI. Membantu melawan disinformasi.</p>
             </div>
           </div>
         </footer>
       </div>
     );
   };
   
   export default HomePage;
   ```

2. Update `src/App.js`:
   ```javascript
   import React from 'react';
   import HomePage from './pages/HomePage';
   import './App.css';
   
   function App() {
     return (
       <div className="App">
         <HomePage />
       </div>
     );
   }
   
   export default App;
   ```

**Validation Criteria:**
- [ ] Page layout is responsive and looks good on desktop
- [ ] Header displays correctly with title and description
- [ ] Input form works and triggers loading state
- [ ] Loading spinner shows during mock API call
- [ ] Mock result displays correctly after loading
- [ ] Error handling works (test by modifying code to throw error)
- [ ] Footer displays at bottom of page

## Phase 4: API Integration Preparation (Day 5)

### Step 4.1: Create API Service Layer

**Objective:** Prepare service layer for backend integration

**Tasks:**
1. Create `src/services/api.js`:
   ```javascript
   const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
   
   class ApiService {
     async verifyNews(inputData) {
       try {
         const response = await fetch(`${API_BASE_URL}/api/verify`, {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify(inputData),
         });
   
         if (!response.ok) {
           throw new Error(`HTTP error! status: ${response.status}`);
         }
   
         const data = await response.json();
         return data;
       } catch (error) {
         console.error('API Error:', error);
         throw new Error('Gagal menghubungi server. Silakan coba lagi.');
       }
     }
   
     // Method for health check
     async healthCheck() {
       try {
         const response = await fetch(`${API_BASE_URL}/api/health`);
         return response.ok;
       } catch (error) {
         return false;
       }
     }
   }
   
   export default new ApiService();
   ```

2. Create `src/hooks/useVerification.js`:
   ```javascript
   import { useState } from 'react';
   import ApiService from '../services/api';
   
   export const useVerification = () => {
     const [isLoading, setIsLoading] = useState(false);
     const [result, setResult] = useState(null);
     const [error, setError] = useState(null);
   
     const verifyNews = async (inputData) => {
       setIsLoading(true);
       setError(null);
       setResult(null);
   
       try {
         const response = await ApiService.verifyNews(inputData);
         setResult(response);
       } catch (err) {
         setError(err.message);
       } finally {
         setIsLoading(false);
       }
     };
   
     const reset = () => {
       setResult(null);
       setError(null);
       setIsLoading(false);
     };
   
     return {
       isLoading,
       result,
       error,
       verifyNews,
       reset
     };
   };
   ```

3. Update `src/pages/HomePage.jsx` to use the new hook:
   ```javascript
   import React from 'react';
   import { NewsInput } from '../components/forms';
   import { VerificationResult } from '../components/results';
   import { LoadingSpinner } from '../components/common';
   import { useVerification } from '../hooks/useVerification';
   
   const HomePage = () => {
     const { isLoading, result, error, verifyNews } = useVerification();
   
     return (
       // ... same JSX as before, but replace handleVerification with verifyNews
       <NewsInput 
         onSubmit={verifyNews} 
         isLoading={isLoading}
       />
       // ... rest of the component
     );
   };
   ```

**Validation Criteria:**
- [ ] API service can be imported without errors
- [ ] useVerification hook works with mock data
- [ ] Error handling works for network failures
- [ ] Environment variable for API URL is configurable
- [ ] Code is ready for backend integration

### Step 4.2: Add Environment Configuration

**Objective:** Set up environment variables for different deployment stages

**Tasks:**
1. Create `.env.development`:
   ```
   REACT_APP_API_URL=http://localhost:3001
   REACT_APP_ENV=development
   ```

2. Create `.env.production`:
   ```
   REACT_APP_API_URL=https://your-backend-url.com
   REACT_APP_ENV=production
   ```

3. Update `.gitignore` to include:
   ```
   # Environment variables
   .env.local
   .env.development.local
   .env.test.local
   .env.production.local
   ```

**Validation Criteria:**
- [ ] Environment variables load correctly
- [ ] API URL changes based on environment
- [ ] Sensitive data is not committed to git

## Phase 5: Testing and Documentation (Day 6)

### Step 5.1: Component Testing

**Objective:** Ensure all components work correctly

**Tasks:**
1. Test each component individually:
   - NewsInput with different input types
   - VerificationResult with different status types
   - LoadingSpinner with different sizes
   - HomePage with different states

2. Create `src/utils/testData.js` for consistent test data:
   ```javascript
   export const mockResults = {
     hoax: {
       status: 'hoaks',
       confidence: 0.85,
       explanation: 'Berita ini mengandung klaim yang tidak didukung bukti.',
       redFlags: ['Tidak ada sumber kredibel', 'Bahasa sensasional'],
       sources: []
     },
     fact: {
       status: 'fakta',
       confidence: 0.92,
       explanation: 'Informasi didukung sumber terpercaya.',
       redFlags: [],
       sources: [
         { title: 'Kompas.com', url: 'https://kompas.com' }
       ]
     },
     uncertain: {
       status: 'meragukan',
       confidence: 0.45,
       explanation: 'Perlu verifikasi lebih lanjut.',
       redFlags: ['Informasi tidak lengkap'],
       sources: []
     }
   };
   
   export const mockInputs = {
     textNews: {
       text: 'Contoh berita untuk diverifikasi...',
       type: 'text'
     },
     urlNews: {
       text: 'https://example.com/news-article',
       type: 'url'
     }
   };
   ```

**Validation Criteria:**
- [ ] All components render without errors
- [ ] User interactions work as expected
- [ ] Different data scenarios display correctly
- [ ] Responsive design works on different screen sizes

### Step 5.2: Create Documentation

**Objective:** Document the frontend implementation for team collaboration

**Tasks:**
1. Create `frontend/README.md`:
   ```markdown
   # AntiHoax Frontend
   
   React.js frontend for the AntiHoax AI application.
   
   ## Setup
   
   1. Install dependencies:
      ```bash
      npm install
      ```
   
   2. Start development server:
      ```bash
      npm start
      ```
   
   3. Build for production:
      ```bash
      npm run build
      ```
   
   ## Environment Variables
   
   - `REACT_APP_API_URL`: Backend API URL
   - `REACT_APP_ENV`: Environment (development/production)
   
   ## Components
   
   ### Forms
   - `NewsInput`: Main input component for news verification
   
   ### Results
   - `VerificationResult`: Displays verification results
   
   ### Common
   - `LoadingSpinner`: Loading indicator
   
   ## API Integration
   
   The frontend is ready to integrate with the backend API:
   - `POST /api/verify`: Verify news content
   - `GET /api/health`: Health check
   
   ## Testing
   
   Use the mock data in `src/utils/testData.js` for testing components.
   ```

2. Update component files with JSDoc comments:
   ```javascript
   /**
    * NewsInput Component
    * 
    * Handles user input for news verification
    * 
    * @param {Function} onSubmit - Callback when form is submitted
    * @param {boolean} isLoading - Loading state
    */
   const NewsInput = ({ onSubmit, isLoading = false }) => {
     // ... component code
   };
   ```

**Validation Criteria:**
- [ ] README.md is comprehensive and accurate
- [ ] Components are documented with JSDoc
- [ ] Setup instructions work for new developers
- [ ] API integration points are clearly documented

## Final Validation Checklist

**Before marking this phase complete, ensure ALL of the following:**

### Functionality
- [ ] React app starts without errors
- [ ] All components render correctly
- [ ] Form submission works with validation
- [ ] Loading states display properly
- [ ] Mock results show different status types correctly
- [ ] Error handling works for various scenarios
- [ ] Responsive design works on desktop

### Code Quality
- [ ] Code follows React best practices
- [ ] Components are reusable and well-structured
- [ ] No console errors or warnings
- [ ] Proper error boundaries implemented
- [ ] Clean and readable code with comments

### Integration Readiness
- [ ] API service layer is implemented
- [ ] Environment variables are configured
- [ ] Backend integration points are ready
- [ ] Error handling for API failures works

### Documentation
- [ ] README.md is complete and accurate
- [ ] Components are documented
- [ ] Setup instructions are clear
- [ ] Test data is available for development

## Next Steps (Coordination with Backend Team)

1. **API Contract Validation**: Confirm API request/response format with Backend Developer (Dev2)
2. **Integration Testing**: Test with actual backend once available
3. **Error Handling**: Refine error messages based on actual API responses
4. **Performance**: Optimize for production deployment

## Notes for Junior Developers

- **Always test each step before proceeding**
- **Ask questions if any requirement is unclear**
- **Use browser developer tools to debug issues**
- **Keep components simple and focused on single responsibility**
- **Follow the existing code patterns and naming conventions**
- **Commit your work frequently with descriptive messages**

---

**Remember: DO NOT PROCEED TO NEXT STEP UNTIL ALL TESTS PASS**

This ensures code quality and prevents issues that could affect the entire team's progress.