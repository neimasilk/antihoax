import React from 'react';
import './App.css'; // Keep App.css for any global non-Tailwind styles or resets if needed in future
import NewsInput from './components/NewsInput';
import VerifyButton from './components/VerifyButton';
import ResultDisplay from './components/ResultDisplay';

function App() {
  const [newsText, setNewsText] = React.useState('');
  const [verificationResult, setVerificationResult] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleNewsInputChange = (event) => {
    setNewsText(event.target.value);
  };

  const handleVerifyClick = async () => {
    console.log('Verify button clicked. Current newsText:', newsText);
    if (newsText.trim() === '') {
      setVerificationResult('Silakan masukkan teks berita terlebih dahulu.');
      return;
    }
    setIsLoading(true);
    setVerificationResult('Sedang mengirim permintaan ke DeepSeek API dan melakukan analisis...');
    
    // Simulasi API call
    // TODO: Ganti dengan implementasi API call ke backend yang sesungguhnya
    await new Promise(resolve => setTimeout(resolve, 2000)); 

    // Contoh respons dummy setelah simulasi
    // Ini akan digantikan dengan respons aktual dari backend
    const isHoax = Math.random() > 0.5; // Dummy logic
    if (isHoax) {
      setVerificationResult(`Hasil Analisis (Dummy): Berita terindikasi HOAKS. Analisis lebih lanjut oleh sistem fallback dan cross-referencing sedang dilakukan.`);
    } else {
      setVerificationResult(`Hasil Analisis (Dummy): Berita terindikasi FAKTA. Sistem tetap melakukan validasi silang.`);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6 sm:py-12">
      <div className="w-full max-w-xl px-4"> {/* Container for max-width and padding */}
        <header className="text-center mb-8"> {/* Centered header */}
          <h1 className="text-3xl font-bold text-gray-800">Verifikasi Hoaks dengan AI</h1>
          <p className="text-gray-600">Masukkan teks berita untuk dianalisis menggunakan DeepSeek API dan sistem pendukung.</p>
        </header>

        <main className="bg-white shadow-lg rounded-lg p-6 space-y-4"> {/* Card-like main area with spacing */}
          <div>
            <label htmlFor="news-input" className="block text-sm font-medium text-gray-700 mb-1">
              Teks Berita
            </label>
            <NewsInput value={newsText} onChange={handleNewsInputChange} />
          </div>

          {/* Make button full width */}
          <VerifyButton onClick={handleVerifyClick} disabled={isLoading} />

          <div>
            <label htmlFor="result-display" className="block text-sm font-medium text-gray-700 mb-1">
              Hasil Verifikasi
            </label>
            <ResultDisplay result={verificationResult} />
          </div>
        </main>

        <footer className="text-center mt-8 text-sm text-gray-500">
          <p>&copy; 2023 Proyek AntiHoax AI. Dibuat dengan React & Tailwind CSS.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
