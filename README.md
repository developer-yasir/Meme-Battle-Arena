# Meme Battle Arena

Meme Battle Arena is a full-stack web application where users can upload, share, and vote on text-based memes. It features a competitive element with a "Meme King" title and a real-time leaderboard. The application also includes an admin dashboard for managing users and memes.

## Features

-   **User Authentication:** Secure user registration and login.
-   **Meme Uploads:** Users can upload their own text-based memes.
-   **Voting System:** Users can vote on memes, influencing their popularity.
-   **Commenting System:** Users can comment on memes, fostering community interaction.
-   **User Profiles:** Dedicated profile pages for users to showcase their uploaded memes and activity.
-   **Meme King:** A dynamic system to crown the top meme creator.
-   **Leaderboard:** Real-time ranking of users based on meme popularity.
-   **Interactive Polls/Quizzes:** Engage users with meme-related polls and quizzes on the homepage.
-   **Admin Dashboard:** A separate interface for administrators to manage users, memes, and polls.

## Technologies Used

### Frontend (React.js)
-   React
-   React Router DOM
-   Axios (for API calls)
-   Socket.IO Client (for real-time updates)
-   CSS (for styling)

### Backend (Node.js with Express)
-   Node.js
-   Express.js
-   MongoDB (via Mongoose)
-   Socket.IO (for real-time communication)
-   Dotenv (for environment variables)
-   bcryptjs (for password hashing)
-   jsonwebtoken (for authentication)

### Admin Dashboard (React.js)
-   React
-   React Router DOM
-   Axios
-   Chart.js (for analytics)
-   CSS (for styling)

## Setup and Installation

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/developer-yasir/Meme-Battle-Arena.git
    cd Meme-Battle-Arena
    ```

2.  **Backend Setup:**
    ```bash
    cd backend
    npm install
    # Create a .env file with your MongoDB URI and JWT Secret
    # Example .env content:
    # MONGO_URI=your_mongodb_connection_string
    # JWT_SECRET=your_jwt_secret
    # PORT=5000
    node server.js
    ```

3.  **Frontend Setup:**
    ```bash
    cd ../frontend
    npm install
    npm run dev
    ```

4.  **Admin Dashboard Setup:**
    ```bash
    cd ../admin-dashboard
    npm install
    npm run dev
    ```

## Usage

-   **Frontend:** Access the main application at `http://localhost:5173` (or your frontend port).
-   **Admin Dashboard:** Access the admin panel at `http://localhost:5174` (or your admin dashboard port).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.