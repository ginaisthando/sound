## Prerequisites

Before running this application, make sure you have the following installed on your PC:

- **Node.js** (version 18.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** package manager
- **Git** - [Download here](https://git-scm.com/)

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd sound
```

### 2. Install Dependencies

Navigate to the project directory and install the required packages:

```bash
npm install
```

Or if you prefer yarn:

```bash
yarn install
```

### 3. Run the Development Server

Start the development server with one of the following commands:

```bash
npm run dev
```

Or with yarn:

```bash
yarn dev
```

The application will start running on [http://localhost:3000](http://localhost:3000).

### 4. Open in Your Browser

Open your web browser and navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

## Available Scripts

In the project directory, you can run:

- **`npm run dev`** - Runs the app in development mode with Turbopack
- **`npm run build`** - Builds the app for production with Turbopack
- **`npm run start`** - Runs the built app in production mode
- **`npm run lint`** - Runs ESLint to check for code issues

## Project Structure

```
sound/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── browse/          # Browse sounds page
│   │   ├── cart/            # Shopping cart page
│   │   ├── checkout/        # Checkout process
│   │   ├── creators/        # Creators page
│   │   ├── free-sounds/     # Free sounds page
│   │   ├── pack/            # Individual pack pages
│   │   ├── signin/          # Sign in page
│   │   ├── signup/          # Sign up page
│   │   └── subscription/    # Subscription page
│   ├── components/          # Reusable React components
│   │   ├── browse/          # Browse-related components
│   │   ├── home/            # Homepage components
│   │   ├── layout/          # Layout components
│   │   ├── pack/            # Pack-related components
│   │   └── ui/              # UI components
│   ├── hooks/               # Custom React hooks
│   └── lib/                 # Utility functions
├── public/                  # Static assets
└── package.json            # Project dependencies and scripts
```
