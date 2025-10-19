'use strict';

// Elemen-elemen HTML
const player0El = document.querySelector('.player-0');
const player1El = document.querySelector('.player-1');
const score0El = document.getElementById('score-0');
const score1El = document.getElementById('score-1');
const current0El = document.getElementById('current-0');
const current1El = document.getElementById('current-1');
const diceEl = document.querySelector('.dice');
const btnBaru = document.getElementById('btn-baru');
const btnPutar = document.getElementById('btn-putar');
const btnTahan = document.getElementById('btn-tahan');
const giliranInput = document.querySelector('.giliran-main');

// Variabel game
let scores, currentScore, activePlayer, playing;

// Fungsi inisialisasi game baru
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  diceEl.style.display = 'none';

  player0El.classList.add('player-active');
  player1El.classList.remove('player-active');
  player0El.classList.remove('player-winner');
  player1El.classList.remove('player-winner');

  giliranInput.value = 'Giliran: Pemain 1';
};

// Fungsi ganti pemain
const switchPlayer = function () {
  document.getElementById(`current-${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player-active');
  player1El.classList.toggle('player-active');
  giliranInput.value = `Giliran: Pemain ${activePlayer + 1}`;
};

// Saat tombol PUTAR ditekan
btnPutar.addEventListener('click', function () {
  if (playing) {
    // 1. Buat angka acak 1–6
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Tampilkan gambar dadu
    diceEl.style.display = 'block';
    diceEl.src = `./images/dadu-${dice}.png`;

    // 3. Jika bukan 1, tambahkan ke skor saat ini
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current-${activePlayer}`).textContent =
        currentScore;
    } else {
      // Jika 1, ganti pemain
      switchPlayer();
    }
  }
});

// Saat tombol TAHAN ditekan
btnTahan.addEventListener('click', function () {
  if (playing) {
    // 1. Tambahkan skor saat ini ke total skor
    scores[activePlayer] += currentScore;
    document.getElementById(`score-${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Cek apakah pemain menang (misal >= 100)
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.style.display = 'none';
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add('player-winner');
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.remove('player-active');
      giliranInput.value = `🏆 Pemain ${activePlayer + 1} MENANG!`;
    } else {
      // Ganti pemain
      switchPlayer();
    }
  }
});

// Saat tombol GAME BARU ditekan
btnBaru.addEventListener('click', init);

// Jalankan pertama kali
init();