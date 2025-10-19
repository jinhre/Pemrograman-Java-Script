'use strict';

// Deklarasi Elemen-elemen yang digunakan
// Baris ini mengambil elemen-elemen DOM yang digunakan: 
// area pemain, elemen skor total, skor sementara (current), gambar dadu, tombol (baru/putar/tahan),
// dan elemen untuk menampilkan teks giliran (giliran-main).
const player0El = document.querySelector('.player-0'); // querySelector digunakan untuk seleksi berbasis CSS
const player1El = document.querySelector('.player-1');
const score0El = document.getElementById('score-0'); // getElementById digunakan untuk seleksi berdasarkan ID
const score1El = document.getElementById('score-1');
const current0El = document.getElementById('current-0');
const current1El = document.getElementById('current-1');
const diceEl = document.querySelector('.dice');
const btnBaru = document.getElementById('btn-baru');
const btnPutar = document.getElementById('btn-putar');
const btnTahan = document.getElementById('btn-tahan');
const giliranInput = document.querySelector('.giliran-main');

// Variabel game
// score digunakan untuk menyimpan skor total kedua pemain
// currentScore menyimpan skor sementara pemain saat ini
// activePlayer menyimpan indeks pemain aktif (0 atau 1)
// playing adalah boolean; true saat permainan berjalan, false setelah ada pemenang. Digunakan untuk menonaktifkan tombol saat permainan selesai.
let scores, currentScore, activePlayer, playing;

// Fungsi inisialisasi game baru
// Dikerjakan oleh ...
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

// score0El dan score1El diatur ke 0
// current0El dan current1El diatur ke 0  
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

// diceEl untuk menyembunyikan gambar dadu saat permainan dimulai 
  diceEl.style.display = 'none';

// Kode tersebut: menandai pemain 0 sebagai aktif, dan menghapus status aktif/pemenang dari pemain 1 dan status pemenang dari pemain 0.
// Tujuannya: men-setup UI pada kondisi awal (game baru) sehingga hanya pemain 0 yang terlihat aktif dan tidak ada pemenang yang ditampilkan.
// Agar salah satu dari player aktif dan pemenang tidak tumpang tindih / tidak jalan bersamaan di tampilan.
  player0El.classList.add('player-active');
  player1El.classList.remove('player-active');
  player0El.classList.remove('player-winner');
  player1El.classList.remove('player-winner');

// Giliran input agar tahu siapa yang bermain
  giliranInput.value = 'Giliran: Pemain 1';
};

// ---------------------------------------------------------------

// Fungsi ganti pemain
// Dikerjakan oleh Dayat
// Fungsi ini dideklarasikan untuk mengganti pemain aktif saat ini.
const switchPlayer = function () {
  document.getElementById(`current-${activePlayer}`).textContent = 0;
  currentScore = 0;

  // Single line If else
  // (f) = nama_varibel <Operator logika> variabel_pembanding ? nilai_jika_benar : nilai_jika_salah;
  // Kode ini digunakan untuk memeriksa pemain aktif saat ini dan menggantinya ke pemain lainnya.
  activePlayer = activePlayer === 0 ? 1 : 0;

  // Kode ini digunakan untuk menambahkan atau menghapus kelas CSS 'player-active'
  // pada elemen HTML yang mewakili pemain.
  // Kelas 'player-active' biasanya digunakan untuk menandai pemain yang sedang aktif.
  player0El.classList.toggle('player-active');
  player1El.classList.toggle('player-active');

  // Mengapa 'activePlayer' ditambah 1?
  // Karena indeks array dimulai dari 0, sedangkan penomoran pemain dimulai dari 1.
  // Jadi, untuk menampilkan nomor pemain yang benar kepada pengguna, kita perlu menambahkan 1 ke indeks array.

  // Teks 'Giliran: Pemain X' dengan X adalah nomor pemain aktif saat ini.
  // ditampilkan dengan menggunakan <input> dengan mengisikan nilai properti 'value'.
  // kode ini mengubah nilai dari properti 'value' dari elemen input 'giliranInput'.
  // Dimana variabel 'giliranInput' berisi referensi ke elemen input HTML, 
  // yang menampilkan giliran pemain dengan menggunakan nama class.
  giliranInput.value = `Giliran: Pemain ${activePlayer + 1}`;
};

// Saat tombol PUTAR ditekan
// Dikerjakan oleh Muhammad Fauji
// Fungsi 'btnPutar' akan langsung jalan ketika tombol '🎲 Putar Dadu' ditekan,
// metode 'addEventListener' menggunakan variabel 'btnPutar',
// dimana 'btnPutar' berisikan kode pemilihan HTML berdasarkan id dari elemen.
btnPutar.addEventListener('click', function () {
  // Menggunakan if untuk memeriksa apakah permainan masih berlangsung.
  // jika 'playing' bernilai true, maka kode di dalam blok if akan dijalankan.
  // dan jika 'playing' bernilai false, maka kode di dalam blok if tidak akan dijalankan.
  if (playing) {
    // 1. Buat angka acak 1–6
    // Variabel 'dadu' digunakan untuk menyimpan nilai dadu saat ini.
    const dadu = Math.trunc(Math.random() * 6) + 1;

    // 2. Tampilkan gambar dadu
    // Kode ini digunakan untuk menampilkan gambar dadu agar terlihat.
    // kode ini perlu diterapkan karena saat game belum dimulai, gambar dadu sedang disembunyikan.
    // sehingga perlu menjalankan kode berikut untuk menampilkannya kembali.
    diceEl.style.display = 'block';

    // Sesuai dengan nilai dadu dari variabel 'dadu'
    diceEl.src = `./images/dadu-${dadu}.png`;

    // 3. Jika bukan 1, tambahkan ke skor saat ini
    // Memeriksa nilai dadu ketika tombol 'Putar Dadu' ditekan.
    if (dadu !== 1) {
      // Barisan kode berikut akan dijalankan ketika nilai dadu bukan 1.

      // kode berikut digunakan untuk menambahkan skor pada pemain saat ini.
      currentScore += dadu;

        // kode berikut digunakan untuk memperbarui tampilan skor saat ini pada antarmuka pengguna (UI).
      document.getElementById(`current-${activePlayer}`).textContent =
        currentScore;

    } else {
      // Barisan kode berikut akan dijalankan ketika nilai dadu adalah 1.
      // 'switchPlayer()' merupakan pemanggilan fungsi yang telah dideklarasikan sebelumnya.
      switchPlayer();

    }
  }
});

// Saat tombol TAHAN ditekan
// Dikerjakan oleh Muhammad Fauji
// Fungsi 'btnPutar' akan langsung jalan ketika tombol '📥 Tahan' ditekan,
// metode 'addEventListener' menggunakan variabel 'btnTahan',
// dimana 'btnTahan' berisikan kode pemilihan HTML berdasarkan id dari elemen.
btnTahan.addEventListener('click', function () {
  // Menggunakan if untuk memeriksa apakah permainan masih berlangsung.
  // jika 'playing' bernilai true, maka kode di dalam blok if akan dijalankan.
  // dan jika 'playing' bernilai false, maka kode di dalam blok if tidak akan dijalankan.
  if (playing) {
    // 1. Tambahkan skor saat ini ke total skor
    scores[activePlayer] += currentScore;
    document.getElementById(`score-${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Cek apakah pemain menang (misal >= 100)
    // Menggunakan if untuk memeriksa apakah skor total pemain aktif saat ini telah mencapai atau melebihi 100.
    if (scores[activePlayer] >= 100) {
      // Barisan kode berikut akan dijalankan ketika skor total pemain aktif saat ini mencapai atau melebihi 100.
      
      // Mengubah status permainan menjadi selesai, menjadi false yang sebelum nya true.
      playing = false;

      // Kode berikut akan membuat gambar dadu menghilang.
      diceEl.style.display = 'none';

      // Kode berikut menambahkan kelas CSS 'player-winner' pada elemen pemain yang menang,
      // dan menghapus kelas 'player-active' dari elemen tersebut.
      // Bentuk kode terlihat berbeda hanya karna dibagi menjadi beberapa baris untuk meningkatkan keterbacaan.
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add('player-winner');
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.remove('player-active');

      // Kode berikut mengubah nilai properti 'value' dari elemen input 'giliranInput'
      // untuk menampilkan pesan kemenangan bagi pemain yang menang.
      // Dimana properti 'value' sebelum nya berisikan status pemain aktif.
      // diganti untuk menampilkan pesan kemenangan.
      giliranInput.value = `🏆 Pemain ${activePlayer + 1} MENANG!`;

    } else {
      // Barisan kode berikut akan dijalankan ketika nilai dadu adalah 1.
      // 'switchPlayer()' merupakan pemanggilan fungsi yang telah dideklarasikan sebelumnya.
      switchPlayer();
    }
  }
});

// Saat tombol GAME BARU ditekan
// Dikerjakan oleh Muhammad Fauji
// Fungsi 'btnBaru' akan langsung jalan ketika tombol '🔄 Game Baru' ditekan,
// metode 'addEventListener' menggunakan variabel 'btnBaru',
// dimana 'btnBaru' berisikan kode pemilihan HTML berdasarkan id dari elemen.

// Fungsi berikut menjalankan fungsi sebelumnya yaitu 'init' ketika tombol 'Game Baru' ditekan.
// Kode ini akan mereset permainan ke kondisi awal.
// dan akan terus-menerus dijalankan kembali setiap kali tombol 'Game Baru' ditekan.
btnBaru.addEventListener('click', init);

// Jalankan pertama kali
// Dikerjakan oleh Muhammad Fauji
// Memanggil fungsi 'init' untuk memulai game pada awal halaman dimuat.
init();