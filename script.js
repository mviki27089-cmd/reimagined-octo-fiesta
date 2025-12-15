const moodButtons = document.querySelectorAll('.mood-btn');
const resultContainer = document.getElementById('result-container');
const moodDisplay = document.getElementById('mood-display');
const quoteDisplay = document.getElementById('quote-display');
const historyList = document.getElementById('history-list');
const clearBtn = document.getElementById('clear-btn');

// Load data dari LocalStorage saat web dibuka
document.addEventListener('DOMContentLoaded', displayHistory);

moodButtons.forEach(button => {
    button.addEventListener('click', () => {
        const mood = button.getAttribute('data-mood');
        const quote = button.getAttribute('data-quote');
        const time = new Date().toLocaleString('id-ID');

        // Tampilkan hasil
        moodDisplay.innerText = `Mood kamu: ${mood}`;
        quoteDisplay.innerText = quote;
        resultContainer.classList.remove('hidden');

        // Simpan ke riwayat
        saveMood(mood, time);
    });
});

function saveMood(mood, time) {
    let history = JSON.parse(localStorage.getItem('moodHistory')) || [];
    history.push({ mood, time });
    localStorage.setItem('moodHistory', JSON.stringify(history));
    displayHistory();
}

function displayHistory() {
    let history = JSON.parse(localStorage.getItem('moodHistory')) || [];
    historyList.innerHTML = history.map(item => 
        `<li><strong>${item.time}</strong>: ${item.mood}</li>`
    ).reverse().join('');
}

clearBtn.addEventListener('click', () => {
    localStorage.removeItem('moodHistory');
    displayHistory();
    resultContainer.classList.add('hidden');
});
