# Job Portal Project (Easily)

[Demo](https://easily-wudl.onrender.com)

This is a simple Job Portal web application that allows users to browse jobs, apply for positions, and manage job listings.

## Features

- User authentication (register, login, logout)
- Job listing and job details page
- Apply for jobs by uploading resumes
- Admin can create, update, and delete jobs
- View applicants for job listings

## Technologies Used

- **Frontend**: HTML, CSS, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: In-memory storage (can be replaced with MongoDB, PostgreSQL, etc.)
- **Authentication**: Express-session
- **File Uploads**: Multer

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/SanketKumarDev/job-portal.git
   cd job-portal
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   npm start
   ```
4. Open your browser and go to:
   ```
   http://localhost:3000
   ```

## Project Structure

```
job-portal/
│-- public/            # Static files (CSS, JS, images, uploads)
│-- views/             # EJS templates for frontend
│-- models/            # Data models for jobs and users
│-- routes/            # Express routes
│-- controllers/       # Business logic controllers
│-- app.js             # Main application file
│-- package.json       # Project metadata and dependencies
```


### User Routes

- `GET /register` - Show registration form
- `POST /register` - Register new user
- `GET /login` - Show login form
- `POST /login` - Authenticate user
- `GET /logout` - Logout user

### Job Routes

- `GET /jobs` - List all jobs
- `GET /jobs/:id` - View job details
- `GET /jobs/create` - Show create job form
- `POST /jobs/create` - Create a new job
- `GET /jobs/:id/edit` - Show edit job form
- `POST /jobs/:id/edit` - Update job
- `DELETE /jobs/:id` - Delete job
- `GET /jobs/:id/apply` - Show apply form
- `POST /jobs/:id/apply` - Apply to job


---

Developed by **Sanket Kumar** 🚀

