# EssentialSpace

## Description
EssentialSpace is a next-gen web application for intelligent note-taking and URL management, built to optimize content organization and collaboration. Powered by integrated AI, it supports semantic search and context-aware retrieval, enabling users to find and connect information effortlessly. Designed with scalability in mind, EssentialSpace combines a sleek UI with robust backend services to deliver a seamless experience with advanced features and integrations on the roadmap.

## Tech Stack
- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Backend:** Node.js, TypeScript
- **Other:** Express, Vercel (deployment)

## Features
- User authentication and protected routes
- Content model creation and management
- Collaborative dashboard for sharing and organizing content

## Installation Instructions

### 1. Clone the Repository
```sh
git clone https://github.com/yashsrivasta7a/EssentialSpace_Frontend.git
cd EssentialSpace_Frontend
```

### 2. Install Dependencies
#### Frontend
```sh
npm install
```
#### Backend
Open a new terminal and navigate to the backend folder:
```sh
cd ../"Essential Space"
npm install
```

### 3. Run the Project Locally
#### Frontend
```sh
npm run dev
```
#### Backend
```sh
npm start
```

## Usage Guide
- Access the frontend at `http://localhost:5173` (default Vite port).
- Sign up or sign in to your account.
- Create new content models and manage them from the dashboard.
- Share content with collaborators using the SharedBrain feature.

## Contributing
We welcome contributions! Please follow these steps:
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to your branch and open a pull request

Please ensure your code follows the existing style and passes all linting/tests.

## License
This project is licensed under the MIT License.

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
