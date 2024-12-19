# use-debounce-sandbox

A React application that implements a debounced search interface with real-time results. Built with React, TypeScript, and Tailwind CSS.

## Features

- Real-time search with debouncing (500ms delay)
- Clean and responsive UI with Tailwind CSS
- Type-safe development with TypeScript
- Form handling with React Hook Form
- Data fetching with React Query
- Mock API implementation for demonstration

## Tech Stack

- React + TypeScript
- Tailwind CSS for styling
- React Hook Form for form management
- @uidotdev/usehooks for debouncing
- @tanstack/react-query for data fetching
- Vite for build tooling

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Development Notes

The application demonstrates modern React patterns including:
- Controlled form inputs with React Hook Form
- Debounced API calls to prevent excessive requests
- Proper TypeScript interfaces for type safety
- Responsive design with Tailwind CSS
- Loading and error states
- Clean component structure

## API Mock

Currently using a mock API with simulated delay for demonstration. To connect to a real API, update the `searchItems` function in `App.tsx`.
