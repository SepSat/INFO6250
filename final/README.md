
# Game Discount Management System

## Table of Contents
- [Description](#description)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Contact](#contact)

---

## Description
A real-time platform to explore and manage game discounts across multiple platforms. Users can view discounts and subscribe to their favorite games, while administrators can manage games, platforms, and prices.

---

## Technology Stack
- **Frontend**: React, Vite, CSS
- **Backend**: Node.js with Express
- **State Management**: React Context API

---

## Installation

### Requirements
- Node.js 
- npm v8

### Steps

1. **Clone the repository**  
   Run the following commands to download and navigate to the project folder:  
   ```bash
   git clone https://github.com/svinfo6250/student-svinfo6250--SepSat.git
   cd final
   ```

2. **Install dependencies**  
   Use npm to install the necessary project dependencies:  
   ```bash
   npm install
   ```

3. **Configure environment variables**  
   Create a `.env` file in the root directory and add the following content:  
   ```plaintext
   PORT=3000
   SESSION_SECRET=your_session_secret
   ```

4. **Start the server**  
   Run the following command to start the development server:  
   ```bash
   npm start
   ```

5. **Access the application**  
   Open your browser and visit:  
   ```
   http://localhost:3000
   ```

6. **Build the project (for production)**  
   If deploying to production, build the project using:  
   ```bash
   npm run build
   ```

---

### Authentication
| Method | Endpoint           | Description                 |
|--------|--------------------|-----------------------------|
| POST   | `/api/v1/session`  | Log in and create a session |
| DELETE | `/api/v1/session`  | Log out and clear session   |

### User Actions
| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| GET    | `/api/v1/subscribe`   | View subscribed games    |
| PUT    | `/api/v1/subscribe`   | Subscribe to a game      |
| DELETE | `/api/v1/subscribe`   | Unsubscribe from a game  |

### Game Management
| Method | Endpoint           | Description                       |
|--------|--------------------|-----------------------------------|
| GET    | `/api/v1/game`     | Fetch all games and platforms     |
| POST   | `/api/v1/game`     | Add a new game (Admin only)       |
| PUT    | `/api/v1/game`     | Update game details (Admin only)  |

---

## Usage
- Users can view game discounts, subscribe, or unsubscribe.  
- Admins (using accounts "melon" or "cat") can add or modify games, platforms, and pricing.

---

## Contact
For inquiries, please contact:  
- **Developer**: Shiyun Yu  
- **Email**: yushiyun1998@gmail.com  
