# UnifiedMentorInternship
# 💸 Expense Tracker Web App

A responsive web application to track your daily income and expenses with live summaries and visualizations.

## 🚀 Features

- Add, edit, delete transactions
- Filter by category
- View income, expenses, and net balance
- Pie chart visualization by category (using Chart.js)
- Export data to `.json` file
- Import data from `.json` or `.csv` file
- Data persistence via localStorage

## 🛠️ How to Use

1. **Add a transaction**: Fill in the form with date, description, category, and amount, then click `Add Transaction`.
2. **Edit/Delete**: Use ✏️ or ❌ next to any transaction to update or remove it.
3. **Filter by Category**: Use the dropdown to view specific categories.
4. **Export Data**: Click `Export Data` to download your current records as a JSON file.
5. **Import Data**: Select a `.json` or `.csv` file using the file input, then click `Import Data`.

> 📌 CSV Format:
> ```
> date,desc,category,amount
> 2024-04-01,Coffee,Food,50
> 2024-04-02,Salary,Income,10000
> ```

## 📁 File Structure
UnifiedMentorInternship/ExpenseTracker/
├── index.html          # Main HTML structure
├── styles.css          # All styles (moved from inline to external CSS)
├── script.js           # JavaScript functionality for handling logic, charts, storage
├── transactions.json   # Example exported data (optional)
└── README.md           # Project description and setup instructions


## 📊 Technologies

- HTML5, CSS3, JavaScript
- Chart.js (for visualizations)
- localStorage (to persist transactions)

## 📦 Deployment

You can host this on any static server like GitHub Pages or Netlify:

- [GitHub Pages Guide](https://pages.github.com/)
- [Netlify Drag & Drop](https://app.netlify.com/drop)

## 📬 Author

Developed by [MaheshNariki].  
Feel free to use, improve, and share!
