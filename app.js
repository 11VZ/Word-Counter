const textInput = document.getElementById('text-input');
const clearBtn = document.getElementById('clear-btn');
const counters = {
    words: document.getElementById('word-count'),
    chars: document.getElementById('char-count'),
    sentences: document.getElementById('sentence-count'),
    paras: document.getElementById('para-count'),
    avgWordLength: document.getElementById('avg-word-length'),
    readingTime: document.getElementById('reading-time'),
    uniqueWords: document.getElementById('unique-words'),
    longestWord: document.getElementById('longest-word')
};

const countStats = (text) => {
    const trimmedText = text.trim();
    const words = trimmedText ? trimmedText.split(/\s+/) : [];
    const wordLengths = words.map(word => word.length);
    const uniqueWords = new Set(words.map(word => word.toLowerCase()));
    
    return {
        words: trimmedText ? trimmedText.split(/\s+/).length : 0,
        chars: trimmedText.length,
        sentences: trimmedText.split(/[.!?]+/).filter(Boolean).length,
        paras: trimmedText.split(/\n\s*\n/).filter(Boolean).length,
        avgWordLength: words.length ? 
            (wordLengths.reduce((a, b) => a + b, 0) / words.length).toFixed(1) : 0,
        readingTime: Math.ceil(words.length / 200),
        uniqueWords: uniqueWords.size,
        longestWord: words.reduce((longest, current) => 
            current.length > longest.length ? current : longest, '')
    };
};

const updateDisplay = (stats) => {
    Object.entries(stats).forEach(([key, value]) => {
        if (counters[key]) {
            counters[key].textContent = typeof value === 'number' ? 
                value.toLocaleString() : value;
        }
    });
};

textInput.addEventListener('input', () => {
    updateDisplay(countStats(textInput.value));
});

clearBtn.addEventListener('click', () => {
    textInput.value = '';
    updateDisplay(countStats(''));
});

updateDisplay(countStats(''));

document.addEventListener('DOMContentLoaded', function() {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: "#ffffff"
            },
            shape: {
                type: "circle"
            },
            opacity: {
                value: 0.5,
                random: false
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: false,
                distance: 150,
                color: "#ffffff",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 6,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out"
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "bubble"
                },
                onclick: {
                    enable: true,
                    mode: "repulse"
                }
            },
            modes: {
                bubble: {
                    distance: 400,
                    size: 4,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 128,
                    duration: 0.4
                }
            }
        },
        retina_detect: true
    });
});