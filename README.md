# Expense Tracker

A vanilla JavaScript expense tracker that lets you log income and expenses, view running totals, and see a category-wise spending breakdown as a live chart.

## Features
- Add transactions with description, amount, type (income/expense), category, and date
- Auto-calculated income, expense, and balance totals
- Doughnut chart (Chart.js) showing expense breakdown by category
- Delete individual transactions or clear all
- Data persists in the browser via `localStorage`
- Responsive layout for mobile and desktop

## Tech Stack
- HTML5
- CSS3 (Flexbox/Grid, no framework)
- Vanilla JavaScript (ES6+)
- [Chart.js](https://www.chartjs.org/) via CDN

## Project Structure
```
expense-tracker/
├── index.html
├── style.css
├── script.js
└── README.md
```

## How to Run
1. Clone or download this folder
2. Open `index.html` in any modern browser — no build step or server required

## What I Learned / Demonstrates
- DOM manipulation and event handling without a framework
- Working with browser `localStorage` for persistence
- Integrating a third-party charting library
- Structuring form input, validation, and dynamic list rendering

## Live Demo
_(add your GitHub Pages link here after deploying)_

## License
MIT
