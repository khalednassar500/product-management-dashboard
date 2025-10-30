# Product Management Dashboard

A clean and responsive dashboard built with React.js to manage and view product data.

## Features

- **View Products**: Display products in a customizable table
- **Search & Filter**: Find products by name or category
- **Sort Data**: Click column headers to sort
- **Show/Hide Columns**: Choose which columns to display
- **Edit Products**: Click on product details to edit them
- **Mobile Friendly**: Works well on all devices

## Quick Start

```bash
# Clone the repository
git clone https://github.com/khalednassar500/product-management-dashboard.git
cd product-management-dashboard

# Install dependencies
npm install

# Start the development server
npm start

# Open http://localhost:3000 in your browser
```

## How to Use

### Viewing Products
- Products load automatically when you open the dashboard
- Use the pagination buttons to navigate through pages

### Searching & Filtering
- Type in the search box to find products by name
- Use the category dropdown to filter by product type

### Customizing Columns
- Click the "Columns" button to show/hide columns
- Check the columns you want to see
- Your preferences are saved automatically

### Editing Products
- Click on any product name, price, or category
- Make your changes in the edit box
- Press Enter or click the checkmark (✓) to save
- Press Escape or click the X (✕) to cancel

## Project Structure

```
src/
├── components/
│   ├── List/
│   │   ├── List.jsx
│   │   └── List.css
│   ├── ColumnSelector/
│   │   ├── ColumnSelector.jsx
│   │   └── ColumnSelector.css
│   ├── SearchFilter/
│   │   ├── SearchFilter.jsx
│   │   └── SearchFilter.css
│   └── Loading/
│       ├── Loading.jsx
│       └── Loading.css
├── hooks/
│   ├── useProducts.js
│   └── useLocalStorage.js
├── utils/
│   └── helpers.js
├── App.jsx
└── App.css
```

## Built With

- React.js
- CSS3
- FakeStore API

