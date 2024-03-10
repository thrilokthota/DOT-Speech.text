// JavaScript code in script.js

const recordButton = document.getElementById('recordButton');
const languageSelect = document.getElementById('languageSelect');
const outputDiv = document.getElementById('output');
const copyButton = document.getElementById('copyButton');

let recognition;

// Initialize Speech Recognition
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
recognition = new window.SpeechRecognition();
recognition.interimResults = true;

let isRecording = false;

// Event listener for holding down the record button
recordButton.addEventListener('mousedown', () => {
    isRecording = true;
    recognition.start();
});

// Event listener for releasing the record button
recordButton.addEventListener('mouseup', () => {
    isRecording = false;
    recognition.stop();
});

// Event listener for language selection
languageSelect.addEventListener('change', () => {
    // Set recognition language
    recognition.lang = languageSelect.value;
});

// Speech recognition event listeners
recognition.addEventListener('result', (e) => {
    const transcript = Array.from(e.results)
        .map(result => result[0].transcript)
        .join('');

    outputDiv.textContent = transcript;
});

recognition.addEventListener('end', () => {
    console.log('Recognition ended');
    if (isRecording) {
        recognition.start(); // Restart recognition if still recording
    }
});

// Copy text function
function copyText() {
    const textToCopy = outputDiv.textContent;
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            console.log('Text copied successfully');
            alert('Text copied successfully!');
        })
        .catch(err => {
            console.error('Error copying text: ', err);
            alert('Error copying text. Please try again.');
        });
}

// Populate language options
const languages = [
    { code: 'en-US', name: 'English (US)' },
    { code: 'es-ES', name: 'Spanish (Spain)' },
    { code: 'fr-FR', name: 'French (France)' },
    { code: 'hi-IN', name: 'Hindi (India)' },
    { code: 'te-IN', name: 'Telugu (India)' },
    { code: 'ta-IN', name: 'Tamil (India)' },
    { code: 'mr-IN', name: 'Marathi (India)' },
    { code: 'gu-IN', name: 'Gujarati (India)' },
    { code: 'bn-BD', name: 'Bangla (Bangladesh)' },
    { code: 'ur-PK', name: 'Urdu (Pakistan)' },
    { code: 'af-ZA', name: 'Africaans (South Africa)' },
    { code: 'ar-SA', name: 'Arabic (Saudi Arabia)' },
    { code: 'de-DE', name: 'German (Germany)' },
    { code: 'ja-JP', name: 'Japanese (Japan)' },
    { code: 'ga-IE', name: 'Irish (Ireland)' },
    { code: 'it-IT', name: 'Italian (Italy)' },
    { code: 'zh-CN', name: 'Chinese (Simplified, China)' },
    { code: 'zh-HK', name: 'Chinese (Traditional, Hong Kong)' },
    { code: 'zh-TW', name: 'Chinese (Traditional, Taiwan)' },
    { code: 'el-GR', name: 'Greek (Greece)' },
    { code: 'ko-KR', name: 'Korean (South Korea)' },
    { code: 'kn-IN', name: 'Kannada (India)' },
    { code: 'ml-IN', name: 'Malayalam (India)' },
    { code: 'pa-IN', name: 'Punjabi (India)' },
    { code: 'en-IN', name: 'English (India)' } // Indian English
]; // Example languages
languages.forEach(language => {
    const option = document.createElement('option');
    option.value = language.code;
    option.textContent = language.name;
    languageSelect.appendChild(option);
});

