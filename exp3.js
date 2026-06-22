// DOM Elements
const heading = document.getElementById('main-heading');
const input = document.getElementById('message-input');
const para = document.getElementById('dynamic-para');
const statusEl = document.getElementById('status');

let originalHeadingText = heading.textContent;
let originalBgColor = document.body.style.backgroundColor || '#f0f4f8';
let currentFontSize = 2.8;
let isParaVisible = true;
// Show status message
function showStatus(message, color = '#64748b') {
    statusEl.textContent = message;
    statusEl.style.color = color;
    setTimeout(() => statusEl.textContent = '', 2500);
}
// Change Heading Text
function changeHeadingText() {
    if (input.value.trim() !== '') {
        heading.textContent = input.value.trim();
        showStatus('Heading text updated!', '#1e40af');
    } else {
        showStatus('Please enter a message first!', '#ef4444');
    }
}
// Random Background Color
const colors = ['#f0f4f8', '#e0f2fe', '#fef3c7', '#ecfdf5', '#f3e8ff', '#fee2e9', '#dbeafe'];
let colorIndex = 0;
function changeBackground() {
    colorIndex = (colorIndex + 1) % colors.length;
    document.body.style.backgroundColor = colors[colorIndex];
    showStatus('Background color changed!', '#7c3aed');
}
// Increase Font Size
function increaseFontSize() {
    currentFontSize += 0.4;
    heading.style.fontSize = `${currentFontSize}rem`;
    showStatus(`Font size increased to ${currentFontSize.toFixed(1)}rem`, '#ea580c');
}
// Toggle Paragraph
function toggleParagraph() {
    isParaVisible = !isParaVisible;
    if (isParaVisible) {
        para.classList.remove('hidden');
        showStatus('Paragraph is now visible', '#16a34a');
    } else {
        para.classList.add('hidden');
        showStatus('Paragraph is now hidden', '#64748b');
    }
}
// Reset Page
function resetPage() {
    heading.textContent = originalHeadingText;
    heading.style.fontSize = '2.8rem';
    currentFontSize = 2.8;
    document.body.style.backgroundColor = originalBgColor;
    colorIndex = 0;
    para.classList.remove('hidden');
    isParaVisible = true;
    input.value = '';
    showStatus('Page has been reset!', '#ef4444');
}
// Setup All Event Listeners
function setupEventListeners() {
    document.getElementById('change-text').addEventListener('click', changeHeadingText);
    document.getElementById('change-bg').addEventListener('click', changeBackground);
    document.getElementById('change-font').addEventListener('click', increaseFontSize);
    document.getElementById('toggle-para').addEventListener('click', toggleParagraph);
    document.getElementById('reset').addEventListener('click', resetPage);
    // Input Events
    input.addEventListener('input', () => {
        heading.style.opacity = input.value.trim() ? '0.7' : '1';
    });

    input.addEventListener('change', () => {
        if (input.value.trim() !== '') {
            showStatus('Message ready! Click "Change Heading Text"', '#1e40af');
        }
    });
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') changeHeadingText();
    });
    // Button Hover Effect
    document.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('mouseover', () => btn.style.transform = 'scale(1.08)');
        btn.addEventListener('mouseout', () => btn.style.transform = 'scale(1)');
    });
}
// Initialize
window.onload = () => {
    setupEventListeners();
    showStatus('Page loaded successfully! Try the buttons 👆', '#1e40af');
};