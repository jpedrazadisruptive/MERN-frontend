## MERN Frontend

This is the frontend part of a MERN stack application, built with React, Redux, and TailwindCSS. It handles user authentication, content creation, and content management, including image, video, and text content.

### Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Folder Structure](#folder-structure)
- [Usage](#usage)
- [Testing](#testing)

### Prerequisites

Ensure you have the following installed:

- Node.js (v14 or above)
- npm (v6 or above) or yarn

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-repo/mern-frontend.git
   cd mern-frontend
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

   or if you are using yarn:

   ```sh
   yarn install
   ```

### Environment Variables

Create a `.env` file in the root of your project and add the following line:

```sh
REACT_APP_API_URL=http://localhost:5001/api
```

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner.

#### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

### Folder Structure

```plaintext
mern-frontend/
│
├── node_modules/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── AddContentModal/
│   │   │   ├── AddContentModal.jsx
│   │   │   ├── AddContentModal.css
│   │   │   └── __test__/
│   │   │       └── AddContentModal.test.jsx
│   │   ├── ContentList/
│   │   │   ├── ContentList.jsx
│   │   │   ├── ContentList.css
│   │   │   └── __test__/
│   │   │       └── ContentList.test.jsx
│   │   ├── CountsDisplay/
│   │   │   ├── CountsDisplay.jsx
│   │   │   └── __test__/
│   │   │       └── CountsDisplay.test.jsx
│   │   ├── ErrorMessage/
│   │   │   ├── ErrorMessage.jsx
│   │   │   └── __test__/
│   │   │       └── ErrorMessage.test.jsx
│   │   ├── Navbar/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Navbar.css
│   │   │   └── __test__/
│   │   │       └── Navbar.test.jsx
│   │   ├── PasswordInput/
│   │   │   ├── PasswordInput.jsx
│   │   │   └── __test__/
│   │   │       └── PasswordInput.test.jsx
│   │   ├── SearchFilters/
│   │   │   ├── SearchFilters.jsx
│   │   │   └── __test__/
│   │   │       └── SearchFilters.test.jsx
│   │   ├── SelectInput/
│   │   │   ├── SelectInput.jsx
│   │   │   └── __test__/
│   │   │       └── SelectInput.test.jsx
│   │   ├── TextInput/
│   │   │   ├── TextInput.jsx
│   │   │   └── __test__/
│   │   │       └── TextInput.test.jsx
│   │   └── ...
│   ├── pages/
│   │   ├── Home/
│   │   │   ├── Home.jsx
│   │   │   ├── Home.css
│   │   │   └── __test__/
│   │   │       └── Home.test.jsx
│   │   ├── Login/
│   │   │   ├── Login.jsx
│   │   │   ├── Login.css
│   │   │   └── __test__/
│   │   │       └── Login.test.jsx
│   │   ├── Register/
│   │   │   ├── Register.jsx
│   │   │   ├── Register.css
│   │   │   └── __test__/
│   │   │       └── Register.test.jsx
│   │   └── ...
│   ├── redux/
│   │   ├── slices/
│   │   │   └── authSlice.js
│   │   ├── thunks/
│   │   │   └── authThunks.js
│   │   └── store.js
│   ├── utils/
│   │   └── validators.js
│   ├── App.js
│   ├── index.js
│   └── ...
├── .env
├── .gitignore
├── package.json
└── README.md
```

### Usage

1. Start the backend server (make sure it's running on `http://localhost:5001` as specified in the `.env` file).
2. Start the React app:

   ```sh
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.

### Testing

To run tests, use the following command:

```sh
npm test
```

This will run the tests using Vitest.

### TailwindCSS

TailwindCSS is used for styling. The utility classes are used directly in the JSX files. Additional custom styles can be found in the respective CSS files.

### Redux

Redux is used for state management, with slices defined in the `redux/slices` directory. Asynchronous actions are handled using thunks, which can be found in the `redux/thunks` directory. The store configuration is in `redux/store.js`.

### Axios

Axios is used for making HTTP requests to the backend API. The base URL is configured using the environment variable `REACT_APP_API_URL`.

---

Feel free to customize this README as per your project's needs.
