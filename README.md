# MERN Social Media Application 

A full-stack social media platform built with the MERN stack (MongoDB, Express, React, Node.js), featuring user authentication, post creation, comments, likes, and profile management. The website is a clone of twitter but i will be adding functionalities and improving on it as time goes by.



##  Features
- **User Authentication**: Register, login, and JWT-based session management
- **Post Management**: Create, view, and interact with posts
- **Social Interactions**: Like posts and add comments
- **User Profiles**: View and update profiles with avatars
- **Responsive Design**: Works on all device sizes

## Technologies
- Frontend: React, Vite, Material-UI
- Backend: Node.js, Express, MongoDB
- Authentication: JSON Web Tokens (JWT)
- Deployment: Render (Backend), Vercel (Frontend)

## Installation
### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Git

### Backend Setup
bash
git clone repo name
cd backend
npm install

### Create .env file
echo "MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
PORT=5000" > .env

npm start


### Frontend Setup
bash
Copy
cd ../frontend
npm install
npm run dev


### API Documentation
### Authentication Endpoints
### Register User
URL: /api/users
Method: POST

###Login User
URL: /api/users/login
Method: POST

### User Endpoints
### Get User Profile
URL: /api/users/profile
Method: GET
Auth: Required

##Get User Profile by ID
URL: /api/users/profile/:id
Method: GET
Auth: Required

### Follow/Unfollow User
URL: /api/users/:id/follow
Method: PUT
Auth: Required

### Post Endpoints
Create Post
URL: /api/posts
Method: POST
Auth: Required

### Get All Posts
URL: /api/posts
Method: GET
Auth: Required

### Get User Posts
URL: /api/posts/user/:userId
Method: GET
Auth: Required

### Like/Unlike Post
URL: /api/posts/:id/like
Method: PUT
Auth: Required

### Comment on Post
URL: /api/posts/:id/comments
Method: POST
Auth: Required

To acces the deployed website use the link https://twitter-clone-pink-ten.vercel.app/ further updates will be done for the application to run smoothly