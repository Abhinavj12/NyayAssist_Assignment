# 📋 TodoApp - Smart Task Management System

A modern, full-featured todo application built with Next.js 14, featuring user authentication, email reminders, and a beautiful responsive design.

![TodoApp Screenshot](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=TodoApp+Dashboard)

## ✨ Features

### 🔐 Authentication & Security
- **User Registration & Login** - Secure email/password authentication
- **Session Management** - JWT-based sessions with NextAuth.js
- **Protected Routes** - Dashboard and profile pages require authentication
- **Password Hashing** - Secure password storage with bcrypt

### 📝 Task Management
- **Create, Edit, Delete Tasks** - Full CRUD operations
- **Priority Levels** - High, Medium, Low priority with color coding
- **Status Tracking** - Pending, In Progress, Completed statuses
- **Due Dates & Times** - Set specific deadlines for tasks
- **Rich Descriptions** - Add detailed descriptions to tasks

### 📧 Email Reminder System
- **Automated Reminders** - Email notifications 1 hour before due time
- **Gmail Integration** - Uses Gmail SMTP for reliable delivery
- **Smart Scheduling** - Cron job checks every 15 minutes
- **Timezone Aware** - Properly handles date/time combinations

### 🎨 Modern UI/UX
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Dark/Light Theme** - Toggle between themes with system preference
- **Beautiful Cards** - Modern card-based layout with hover effects
- **Color-coded Priorities** - Visual priority indicators
- **Smooth Animations** - Tailwind CSS animations and transitions
- **Emoji Integration** - Fun emoji indicators for better UX

### 📊 Dashboard & Analytics
- **Task Statistics** - Overview of total, completed, pending tasks
- **Progress Tracking** - Visual progress bars and completion rates
- **Overdue Alerts** - Highlighted overdue tasks with warnings
- **Due Today/Tomorrow** - Quick view of upcoming deadlines

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons
- **Redux Toolkit** - State management
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma** - Database ORM
- **MongoDB** - NoSQL database
- **NextAuth.js** - Authentication library
- **bcryptjs** - Password hashing
- **Nodemailer** - Email sending
- **Node-cron** - Task scheduling

### Deployment
- **Render** - Cloud hosting platform
- **MongoDB Atlas** - Cloud database
- **Gmail SMTP** - Email service

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB database (local or Atlas)
- Gmail account for email reminders (optional)

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/todo-app.git
   cd todo-app
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   Create a \`.env.local\` file in the root directory:
   \`\`\`env
   # Database
   DATABASE_URL="mongodb://localhost:27017/todoapp"
   # or for MongoDB Atlas:
   # DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/todoapp"

   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-super-secret-key-here"

   # Email Configuration (Optional)
   GMAIL_USER="your-email@gmail.com"
   GMAIL_PASS="your-app-password"
   SEND_REAL_EMAILS="true"
   \`\`\`

4. **Set up the database**
   \`\`\`bash
   npx prisma generate
   npx prisma db push
   \`\`\`

5. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📧 Email Setup (Optional)

To enable email reminders:

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. **Update environment variables** with your Gmail credentials

## 🔄 Email Reminder System

The app includes an automated email reminder system:

- **Cron Job**: Runs every 15 minutes
- **Smart Detection**: Finds tasks due within the next hour
- **Email Template**: Beautiful HTML emails with task details
- **Timezone Handling**: Properly combines date and time

To start the reminder service:
\`\`\`bash
npm run send-reminders
\`\`\`

## 🌐 Deployment

### Deploy to Render

1. **Set up MongoDB Atlas**
   - Create a free cluster at [mongodb.com/atlas](https://mongodb.com/atlas)
   - Get your connection string

2. **Push to GitHub**
   \`\`\`bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   \`\`\`

3. **Deploy on Render**
   - Connect your GitHub repository
   - Set build command: \`npm install && npm run build\`
   - Set start command: \`npm start\`
   - Add environment variables

4. **Environment Variables for Production**
   \`\`\`
   NODE_ENV=production
   DATABASE_URL=your_mongodb_atlas_connection_string
   NEXTAUTH_URL=https://your-app.onrender.com
   NEXTAUTH_SECRET=your_secret_key
   GMAIL_USER=your-email@gmail.com
   GMAIL_PASS=your-app-password
   \`\`\`

## 📁 Project Structure

\`\`\`
todo-app/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication pages
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/              # Protected dashboard pages
│   │   ├── dashboard/
│   │   └── profile/
│   ├── api/                      # API routes
│   │   ├── auth/
│   │   ├── todos/
│   │   └── reminders/
│   ├── globals.css               # Global styles
│   └── layout.tsx                # Root layout
├── components/                   # React components
│   ├── auth/                     # Authentication components
│   ├── common/                   # Shared components
│   ├── landing/                  # Landing page components
│   ├── layout/                   # Layout components
│   ├── profile/                  # Profile components
│   ├── providers/                # Context providers
│   ├── todo/                     # Todo components
│   └── ui/                       # UI components (shadcn/ui)
├── hooks/                        # Custom React hooks
├── lib/                          # Utility libraries
│   ├── auth.ts                   # NextAuth configuration
│   ├── db.ts                     # Database connection
│   ├── email.ts                  # Email service
│   ├── utils.ts                  # Utility functions
│   └── validations.ts            # Zod schemas
├── prisma/                       # Database schema
│   └── schema.prisma
├── scripts/                      # Utility scripts
│   ├── send-reminders.js         # Email reminder cron job
│   └── test-reminders.js         # Test reminder system
├── store/                        # Redux store
│   ├── slices/                   # Redux slices
│   └── store.ts                  # Store configuration
├── types/                        # TypeScript type definitions
└── middleware.ts                 # Next.js middleware
\`\`\`

## 🔧 Available Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm start\` - Start production server
- \`npm run lint\` - Run ESLint
- \`npm run db:push\` - Push database schema
- \`npm run db:studio\` - Open Prisma Studio
- \`npm run send-reminders\` - Start email reminder service

## 🎯 Key Features Explained

### Task Management Flow
1. **Create Task** - Add title, description, due date/time, priority
2. **Status Updates** - Click status icon to cycle through states
3. **Edit/Delete** - Use dropdown menu for task actions
4. **Filtering** - Search and filter by status/priority

### Email Reminder Logic
1. **Cron Job** runs every 15 minutes
2. **Query** finds tasks due within next hour
3. **Combine** date and time for accurate scheduling
4. **Send** email and mark reminder as sent
5. **Prevent** duplicate reminders

### Authentication Flow
1. **Register** - Create account with email/password
2. **Login** - Authenticate and create session
3. **Protect** - Middleware guards dashboard routes
4. **Session** - JWT tokens manage user state

## 🐛 Troubleshooting

### Common Issues

**Build Errors**
- Ensure all dependencies are installed
- Check Node.js version (18+)
- Verify environment variables

**Database Connection**
- Check MongoDB connection string
- Ensure database is running
- Verify network access (Atlas)

**Email Not Working**
- Verify Gmail app password
- Check environment variables
- Test with development mode first

**Styling Issues**
- Ensure Tailwind CSS is building
- Check PostCSS configuration
- Verify content paths in tailwind.config.js

### Development Tips

**Testing Email Reminders**
\`\`\`bash
# Test the reminder API
curl -X POST http://localhost:3000/api/reminders

# Run the test script
node scripts/test-reminders.js
\`\`\`

**Database Management**
\`\`\`bash
# View database in browser
npm run db:studio

# Reset database
npx prisma db push --force-reset
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - For beautiful styling
- [Prisma](https://prisma.io/) - Database toolkit
- [Radix UI](https://radix-ui.com/) - Accessible components
- [Lucide](https://lucide.dev/) - Beautiful icons
- [Render](https://render.com/) - Deployment platform

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the troubleshooting section
- Review the documentation

---

**Made with ❤️ and ☕ by [Your Name]**

⭐ Star this repo if you found it helpful!
\`\`\`
\`\`\`

```md project="Todo App" file="DEPLOYMENT.md" type="markdown"
# 🚀 Deployment Guide

This guide covers deploying the TodoApp to various platforms.

## 🌐 Render Deployment (Recommended)

### Prerequisites
- GitHub account
- MongoDB Atlas account (free tier)
- Gmail account (for email reminders)

### Step 1: Database Setup (MongoDB Atlas)

1. **Create MongoDB Atlas Account**
   - Go to [mongodb.com/atlas](https://mongodb.com/atlas)
   - Sign up for free account

2. **Create Cluster**
   - Choose "Build a Database"
   - Select "M0 Sandbox" (Free)
   - Choose cloud provider and region
   - Name your cluster

3. **Create Database User**
   - Go to "Database Access"
   - Add new user with read/write permissions
   - Remember username and password

4. **Configure Network Access**
   - Go to "Network Access"
   - Add IP Address: 0.0.0.0/0 (Allow from anywhere)

5. **Get Connection String**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace \`<password>\` with your user password

### Step 2: Prepare Code

1. **Update package.json**
   Ensure build script includes Prisma generation:
   \`\`\`json
   {
     "scripts": {
       "build": "prisma generate && next build",
       "postinstall": "prisma generate"
     }
   }
   \`\`\`

2. **Environment Variables**
   Create production environment variables list:
   \`\`\`
   NODE_ENV=production
   DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/todoapp
   NEXTAUTH_URL=https://your-app-name.onrender.com
   NEXTAUTH_SECRET=your-super-secret-key
   GMAIL_USER=your-email@gmail.com
   GMAIL_PASS=your-app-password
   \`\`\`

### Step 3: Deploy to Render

1. **Push to GitHub**
   \`\`\`bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   \`\`\`

2. **Create Render Service**
   - Go to [render.com](https://render.com)
   - Sign up/login with GitHub
   - Click "New +" → "Web Service"
   - Connect your repository

3. **Configure Service**
   \`\`\`
   Name: todo-app
   Environment: Node
   Build Command: npm install && npm run build
   Start Command: npm start
   \`\`\`

4. **Add Environment Variables**
   In Render dashboard, add all environment variables from Step 2

5. **Deploy**
   - Click "Create Web Service"
   - Wait for build to complete
   - Update NEXTAUTH_URL with your Render URL

### Step 4: Set Up Email Reminders (Optional)

1. **Create Cron Job Service**
   - In Render, click "New +" → "Cron Job"
   - Connect same repository
   - Configure:
     \`\`\`
     Name: todo-reminders
     Command: node scripts/send-reminders.js
     Schedule: */15 * * * * (every 15 minutes)
     \`\`\`

2. **Add Same Environment Variables**

## 🔧 Vercel Deployment

### Quick Deploy
1. **Install Vercel CLI**
   \`\`\`bash
   npm i -g vercel
   \`\`\`

2. **Deploy**
   \`\`\`bash
   vercel
   \`\`\`

3. **Add Environment Variables**
   \`\`\`bash
   vercel env add DATABASE_URL
   vercel env add NEXTAUTH_SECRET
   vercel env add NEXTAUTH_URL
   \`\`\`

### Configuration
Create \`vercel.json\`:
\`\`\`json
{
  "buildCommand": "prisma generate && next build",
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    }
  }
}
\`\`\`

## 🐳 Docker Deployment

### Dockerfile
\`\`\`dockerfile
FROM node:18-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
\`\`\`

### Docker Compose
\`\`\`yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=mongodb://mongo:27017/todoapp
      - NEXTAUTH_URL=http://localhost:3000
      - NEXTAUTH_SECRET=your-secret
    depends_on:
      - mongo

  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
\`\`\`

## 🔍 Troubleshooting Deployment

### Common Issues

**Build Failures**
\`\`\`bash
# Check Node version
node --version  # Should be 18+

# Clear cache
rm -rf node_modules .next
npm install
\`\`\`

**Database Connection**
\`\`\`bash
# Test connection locally
npx prisma db push
npx prisma studio
\`\`\`

**Environment Variables**
- Ensure all required variables are set
- Check for typos in variable names
- Verify MongoDB connection string format

**CSS Not Loading**
- Check Tailwind configuration
- Verify PostCSS setup
- Ensure build process includes CSS generation

### Monitoring

**Render Logs**
- Go to service dashboard
- Click "Logs" tab
- Monitor for errors

**Health Checks**
\`\`\`bash
# Test API endpoints
curl https://your-app.onrender.com/api/health

# Test authentication
curl -X POST https://your-app.onrender.com/api/auth/signin
\`\`\`

## 📊 Performance Optimization

### Build Optimization
\`\`\`javascript
// next.config.mjs
export default {
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    optimizeCss: true,
  },
}
\`\`\`

### Database Optimization
\`\`\`prisma
// Add indexes for better performance
model Todo {
  @@index([userId, status])
  @@index([dueDate])
}
\`\`\`

## 🔒 Security Checklist

- [ ] Strong NEXTAUTH_SECRET (32+ characters)
- [ ] Database connection string secured
- [ ] Environment variables not in code
- [ ] CORS properly configured
- [ ] Rate limiting implemented
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention (Prisma handles this)
- [ ] XSS protection enabled

## 📈 Scaling Considerations

### Database
- Use MongoDB Atlas for automatic scaling
- Implement connection pooling
- Add database indexes for performance

### Application
- Use CDN for static assets
- Implement caching strategies
- Consider serverless functions for API routes

### Monitoring
- Set up error tracking (Sentry)
- Monitor performance metrics
- Set up uptime monitoring

---

Need help with deployment? Check the main README or open an issue!
\`\`\`
\`\`\`

```md project="Todo App" file="API.md" type="markdown"
# 🔌 API Documentation

Complete API reference for the TodoApp backend endpoints.

## 🔐 Authentication

All API endpoints (except auth routes) require authentication via NextAuth.js session.

### Headers
\`\`\`
Content-Type: application/json
Cookie: next-auth.session-token=<session-token>
\`\`\`

## 📝 Authentication Endpoints

### Register User
\`\`\`http
POST /api/auth/register
\`\`\`

**Request Body:**
\`\`\`json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
\`\`\`

**Response:**
\`\`\`json
{
  "message": "User created successfully",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
\`\`\`

### Login
\`\`\`http
POST /api/auth/signin
\`\`\`

Handled by NextAuth.js - use the built-in signin methods.

## 📋 Todo Endpoints

### Get All Todos
\`\`\`http
GET /api/todos
\`\`\`

**Query Parameters:**
- \`status\` (optional): PENDING | IN_PROGRESS | COMPLETED
- \`priority\` (optional): LOW | MEDIUM | HIGH  
- \`search\` (optional): Search in title and description

**Example:**
\`\`\`http
GET /api/todos?status=PENDING&priority=HIGH&search=meeting
\`\`\`

**Response:**
\`\`\`json
[
  {
    "id": "todo_id",
    "title": "Complete project",
    "description": "Finish the todo app",
    "dueDate": "2024-01-15T00:00:00.000Z",
    "dueTime": "14:30",
    "priority": "HIGH",
    "status": "PENDING",
    "reminderSent": false,
    "userId": "user_id",
    "createdAt": "2024-01-01T10:00:00.000Z",
    "updatedAt": "2024-01-01T10:00:00.000Z"
  }
]
\`\`\`

### Create Todo
\`\`\`http
POST /api/todos
\`\`\`

**Request Body:**
\`\`\`json
{
  "title": "New Task",
  "description": "Task description",
  "dueDate": "2024-01-15",
  "dueTime": "14:30",
  "priority": "MEDIUM",
  "status": "PENDING"
}
\`\`\`

**Response:**
\`\`\`json
{
  "id": "new_todo_id",
  "title": "New Task",
  "description": "Task description",
  "dueDate": "2024-01-15T00:00:00.000Z",
  "dueTime": "14:30",
  "priority": "MEDIUM",
  "status": "PENDING",
  "reminderSent": false,
  "userId": "user_id",
  "createdAt": "2024-01-01T10:00:00.000Z",
  "updatedAt": "2024-01-01T10:00:00.000Z"
}
\`\`\`

### Update Todo
\`\`\`http
PUT /api/todos/[id]
\`\`\`

**Request Body:** (All fields optional)
\`\`\`json
{
  "title": "Updated Task",
  "description": "Updated description",
  "dueDate": "2024-01-16",
  "dueTime": "15:00",
  "priority": "HIGH",
  "status": "IN_PROGRESS"
}
\`\`\`

**Response:**
\`\`\`json
{
  "id": "todo_id",
  "title": "Updated Task",
  // ... other fields
  "updatedAt": "2024-01-01T11:00:00.000Z"
}
\`\`\`

### Delete Todo
\`\`\`http
DELETE /api/todos/[id]
\`\`\`

**Response:**
\`\`\`json
{
  "message": "Todo deleted successfully"
}
\`\`\`

## 📧 Reminder Endpoints

### Process Reminders
\`\`\`http
POST /api/reminders
\`\`\`

Processes all pending reminders and sends emails for tasks due within the next hour.

**Response:**
\`\`\`json
{
  "message": "Processed 3 reminders",
  "currentTime": "2024-01-01T10:00:00.000Z",
  "oneHourFromNow": "2024-01-01T11:00:00.000Z",
  "results": [
    {
      "todoId": "todo_id_1",
      "status": "sent",
      "dueDateTime": "2024-01-01T10:30:00.000Z"
    },
    {
      "todoId": "todo_id_2", 
      "status": "failed",
      "error": "Email service unavailable"
    }
  ]
}
\`\`\`

## 👤 User Endpoints

### Update Profile
\`\`\`http
PUT /api/user/profile
\`\`\`

**Request Body:**
\`\`\`json
{
  "name": "Updated Name"
}
\`\`\`

**Response:**
\`\`\`json
{
  "message": "Profile updated successfully",
  "user": {
    "id": "user_id",
    "name": "Updated Name",
    "email": "user@example.com"
  }
}
\`\`\`

## 📊 Statistics Endpoints

### Get User Stats
\`\`\`http
GET /api/stats
\`\`\`

**Response:**
\`\`\`json
{
  "total": 25,
  "completed": 15,
  "pending": 8,
  "inProgress": 2,
  "overdue": 3,
  "dueToday": 2,
  "dueTomorrow": 1,
  "completionRate": 60.0,
  "priorityBreakdown": {
    "HIGH": 5,
    "MEDIUM": 12,
    "LOW": 8
  }
}
\`\`\`

## ❌ Error Responses

### 400 Bad Request
\`\`\`json
{
  "error": "Validation error",
  "details": [
    {
      "field": "title",
      "message": "Title is required"
    }
  ]
}
\`\`\`

### 401 Unauthorized
\`\`\`json
{
  "error": "Unauthorized"
}
\`\`\`

### 404 Not Found
\`\`\`json
{
  "error": "Todo not found"
}
\`\`\`

### 500 Internal Server Error
\`\`\`json
{
  "error": "Internal server error"
}
\`\`\`

## 🔍 Data Models

### User Model
\`\`\`typescript
interface User {
  id: string
  name: string | null
  email: string
  password: string | null
  emailVerified: Date | null
  image: string | null
  createdAt: Date
  updatedAt: Date
}
\`\`\`

### Todo Model
\`\`\`typescript
interface Todo {
  id: string
  title: string
  description: string | null
  dueDate: Date | null
  dueTime: string | null
  priority: Priority // LOW | MEDIUM | HIGH
  status: Status // PENDING | IN_PROGRESS | COMPLETED
  reminderSent: boolean
  userId: string
  createdAt: Date
  updatedAt: Date
}
\`\`\`

### Enums
\`\`\`typescript
enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM", 
  HIGH = "HIGH"
}

enum Status {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED"
}
\`\`\`

## 🧪 Testing the API

### Using cURL

**Create a todo:**
\`\`\`bash
curl -X POST http://localhost:3000/api/todos \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Test Task",
    "description": "Testing API",
    "priority": "HIGH",
    "status": "PENDING"
  }'
\`\`\`

**Get all todos:**
\`\`\`bash
curl http://localhost:3000/api/todos
\`\`\`

### Using JavaScript/Fetch

\`\`\`javascript
// Create todo
const response = await fetch('/api/todos', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'New Task',
    priority: 'MEDIUM',
    status: 'PENDING'
  })
})

const todo = await response.json()
console.log(todo)
\`\`\`

## 🔒 Rate Limiting

Currently no rate limiting is implemented. For production, consider adding:

- Request rate limiting per IP
- User-based rate limiting
- API key authentication for external access

## 📝 Validation Rules

### Todo Validation
- \`title\`: Required, 1-255 characters
- \`description\`: Optional, max 1000 characters
- \`dueDate\`: Optional, valid date string
- \`dueTime\`: Optional, HH:MM format
- \`priority\`: Must be LOW, MEDIUM, or HIGH
- \`status\`: Must be PENDING, IN_PROGRESS, or COMPLETED

### User Validation
- \`name\`: Required, 1-100 characters
- \`email\`: Required, valid email format
- \`password\`: Required, minimum 6 characters

---

For more details, check the source code in the \`app/api\` directory!
\`\`\`
