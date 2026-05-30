# Language Quest 🌍

A browser-based guessing game — can you name all 12 most-spoken languages in the United States?

## How to Play

1. **Open `index.html`** in any modern web browser (no server or install required).
2. **Type a language** into the search box. The moment you spell a language name correctly, its card flips to reveal the flag, a "Hello World" greeting, speaker count, and a fun fact.
3. **Press Enter** to submit a wrong guess — the input shakes and your streak resets.
4. Find all 12 languages to win! 🏆

## Features

| Feature | Details |
|---|---|
| **Live matching** | Cards flip automatically as you finish typing — no Enter needed for correct guesses |
| **Aliases** | Common alternatives accepted: *Mandarin / Cantonese* → Chinese, *Filipino* → Tagalog, *Haitian* → Haitian Creole, etc. |
| **Timer** | Starts on your first keystroke; stops when the game ends |
| **Streak counter** | Tracks consecutive correct guesses; a 3+ streak is highlighted |
| **Accuracy** | Shown on the end screen — correct guesses ÷ total guesses |
| **Best time** | Your fastest completion is saved in your browser and shown each game |
| **Hints** | 3 hints per game — each reveals the first letter of a random unguessed card |
| **Give Up** | Reveals all remaining cards; shows how many you found on your own |
| **Dark / Light theme** | Toggle with the 🌙 button in the header; preference is saved |
| **Play Again** | Resets everything for a fresh game without refreshing the page |

## The 12 Languages

The answers are based on the most commonly spoken non-English languages in the United States, plus English itself:

1. English
2. Spanish
3. Chinese *(also accepts Mandarin or Cantonese)*
4. Tagalog *(also accepts Filipino)*
5. Vietnamese
6. Arabic
7. French
8. Korean
9. Russian
10. German
11. Haitian Creole *(also accepts Haitian or Creole)*
12. Hindi

## Running Locally

No dependencies or build step needed — just open the file:

```
index.html
```

Or serve it with any static file server, for example:

```bash
npx serve .
```

## Data Sources

- Language rankings: [Accredited Language Services](https://www.accreditedlanguage.com/languages/the-10-most-popular-languages-in-the-us/)
- "Hello World" translations: Google Translate
