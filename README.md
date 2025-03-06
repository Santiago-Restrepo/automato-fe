# Automato Frontend

Automato is a web-based automation platform designed for managing workflows and integrations. It provides an intuitive interface to create, edit, and delete workflows while seamlessly integrating with various services.

## 🚀 Features

- **Workflow Management** – Easily create, edit, and delete workflows.
- **Service Integrations** – Connect with multiple third-party services.
- **User-Friendly Interface** – Designed for simplicity and ease of use.

## 🛠 Getting Started

Follow these steps to set up and run the project locally.

### ✅ Prerequisites

Ensure you have the following installed:

- **Node.js** ≥ 20
- **npm** ≥ 9 or **pnpm** ≥ 8
- **Next.js** 15

### 📥 Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Santiago-Restrepo/automato-fe.git
   cd automato-fe
   ```
2. Install dependencies:
   ```sh
   npm install  # or pnpm install
   ```
3. Create a `.env` file in the root directory and add the required environment variables:
   ```
    NEXT_PUBLIC_API_URL=<your_api_url>
    AUTH_SECRET=<your_secret>
    NEXTAUTH_URL=<your_nextauth_url>
   ```
4. Start the development server:
   ```sh
   npm run dev # or pnpm run dev
   ```

### 💻 Running the Application

1. Open your browser and go to: [`http://localhost:3000`](http://localhost:3000)
2. Log in with your credentials.
3. Explore and manage workflows effortlessly.

## 📦 Building & Deployment

To build and deploy the application:

1. Generate the production build:
   ```sh
   npm run build
   ```
2. Deploy the build to your preferred hosting platform (e.g., **Vercel**, **Netlify**).

## 🤝 Contributing

Contributions are welcome! If you’d like to contribute:

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Submit a pull request with a clear description of your changes.
