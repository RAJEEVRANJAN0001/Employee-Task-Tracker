# Employee Task Tracker

A modern, feature-rich employee task tracking application built with React and Vite.

## Features

- **Dashboard**: Real-time overview of tasks, employees, and performance metrics
- **Employee Management**: Add, edit, and manage employee information
- **Task Tracking**: Create, assign, and monitor tasks with status updates
- **Modern UI**: Beautiful, responsive interface with smooth animations
- **Interactive Components**: Enhanced cards with 3D effects and hover animations
- **Modern Clock Button**: Dynamic landing page with real-time clock display

## Tech Stack

- **Frontend**: React 18.2
- **Build Tool**: Vite 5.0
- **Styling**: Tailwind CSS 3.3
- **Animations**: Framer Motion 10.16
- **Icons**: Lucide React
- **Backend**: Express 5.1
- **Database**: MongoDB with Mongoose 9.0

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB instance (local or cloud)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your MongoDB connection string:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```

### Development

Run the development server:
```bash
npm run dev
```

Run the backend server:
```bash
npm run server
```

The application will be available at `http://localhost:5173`

### Build

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Deployment to Vercel

This project is configured for easy deployment to Vercel with both frontend and backend support.

### Prerequisites

- A Vercel account (sign up at [vercel.com](https://vercel.com))
- MongoDB Atlas account (or any MongoDB instance accessible from the internet)

### Deployment Steps

1. **Install Vercel CLI** (optional, for command-line deployment):
   ```bash
   npm install -g vercel
   ```

2. **Push your code to GitHub** (recommended method):
   - Create a new repository on GitHub
   - Push your code to the repository
   - Go to [vercel.com](https://vercel.com) and import your repository

3. **Configure Environment Variables**:
   - In your Vercel project settings, add the following environment variable:
     - `MONGODB_URI`: Your MongoDB connection string
   
   **Important**: Make sure your MongoDB instance allows connections from Vercel's IP addresses (or use MongoDB Atlas with network access set to "Allow from anywhere" for simplicity)

4. **Deploy**:
   - **Via Vercel Dashboard**: Click "Deploy" after importing your repository
   - **Via CLI**: Run `vercel` in your project directory and follow the prompts

5. **Automatic Deployments**:
   - Once connected to GitHub, Vercel will automatically deploy on every push to your main branch

### Configuration Files

- `vercel.json`: Contains deployment configuration for both frontend and backend
- The configuration handles:
  - Building the Vite frontend
  - Deploying the Express backend as serverless functions
  - Routing API calls to `/api/*` to the backend
  - Serving the frontend for all other routes

## Project Structure


```
├── src/
│   ├── components/     # React components
│   ├── pages/          # Page components
│   └── App.jsx         # Main application component
├── server/             # Backend server code
├── public/             # Static assets
└── index.html          # Entry HTML file
```

## Color Palette

The application uses a strict, modern color palette:
- Black
- Gray (various shades)
- White
- Light Sky Blue (accent color)

## License

This project is private and not licensed for public use.

## Version

Current version: 2.0.0
