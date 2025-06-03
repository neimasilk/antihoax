// src/utils/testData.js

export const sampleHoaxText = `
(HOAX) BREAKING NEWS!! Bank Indonesia Resmi Keluarkan Uang Kertas Pecahan Rp1.000.000,- (SATU JUTA RUPIAH) yang akan diedarkan KE SELURUH MASYARAKAT INDONESIA MULAI TANGGAL 30 FEBRUARI 2025.
Uang ini dicetak terbatas hanya 1000 lembar dan dilengkapi teknologi anti-pemalsuan terbaru dari NASA dan chip pelacak GPS.
Gubernur BI, Bapak Dr. H. Ngawur Asal Bunyi, S.E, M.M, M.Sc, Ph.D, S.Ked, S.H, S.Sos, S.Kom, M.Hum, M.Si. menyatakan bahwa uang ini sah untuk transaksi di seluruh dunia, bahkan di Mars.
`;

export const sampleFactText = `
Timnas Indonesia U-23 berhasil mengalahkan Australia U-23 dengan skor 1-0 dalam laga kedua Grup A Piala Asia U-23 2024 di Stadion Abdullah bin Khalifa, Doha, Qatar, pada Kamis (18/4/2024) malam WIB.
Gol tunggal kemenangan Garuda Muda dicetak oleh Komang Teguh Trisnanda pada menit ke-45.
Kemenangan ini membuka peluang Indonesia untuk lolos ke babak perempat final.
`;

export const sampleUncertainText = `
Pemerintah dikabarkan akan segera meluncurkan program bantuan sosial baru yang menargetkan keluarga muda di perkotaan.
Program ini disebut-sebut akan memberikan dana tunai bulanan serta pelatihan keterampilan.
Namun, detail mengenai besaran dana, kriteria penerima, dan jadwal peluncuran masih belum diumumkan secara resmi. Beberapa sumber menyebutkan program ini masih dalam tahap finalisasi.
`;

export const mockApiResults = {
  hoax: {
    id: "res-hoax-123",
    status: "verified",
    isHoax: true,
    confidence: 0.92,
    summary: "Teks ini mengandung beberapa klaim yang tidak berdasar dan telah diverifikasi sebagai hoaks oleh beberapa sumber terpercaya.",
    timestamp: new Date(Date.now() - 3600 * 1000).toISOString(), // 1 hour ago
  },
  fact: {
    id: "res-fact-456",
    status: "verified",
    isHoax: false,
    confidence: 0.98,
    summary: "Informasi dalam teks ini sesuai dengan laporan dari media berita kredibel dan sumber resmi.",
    timestamp: new Date(Date.now() - 7200 * 1000).toISOString(), // 2 hours ago
  },
  uncertain: {
    id: "res-uncertain-789",
    status: "uncertain",
    isHoax: null,
    confidence: 0.45,
    summary: "Analisis AI tidak dapat sepenuhnya memastikan status berita ini. Diperlukan tinjauan lebih lanjut.",
    timestamp: new Date(Date.now() - 1800 * 1000).toISOString(), // 30 minutes ago
  },
  error: { // For simulating an error response from the hook's perspective
    summary: 'Gagal memproses permintaan karena kesalahan server internal.',
    isHoax: null,
    isUncertain: true,
    isError: true,
  },
  empty: { // For simulating an empty input from the hook's perspective
    summary: 'Teks berita tidak boleh kosong.',
    isHoax: null,
    isUncertain: true,
    isEmpty: true,
  }
};
