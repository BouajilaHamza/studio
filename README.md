# Ahlan Arabic - Language Learning Platform

A web-based language learning platform built with FastAPI, SQLModel, PostgreSQL, and Jinja2 templates.

## Tech Stack

- **Backend**: FastAPI (Python 3.11)
- **Database**: PostgreSQL with SQLModel ORM
- **Templates**: Jinja2
- **Styling**: Tailwind CSS
- **Interactive Features**: HTMX
- **Icons**: Lucide Icons

## Features

### Teacher Dashboard
- Create and manage learning sessions
- View session analytics (student count, average scores)
- Track session history
- Pause/resume sessions
- Each session gets a unique PIN for students to join

### Student Experience
- Join sessions using a PIN code
- Translate phrases and earn points
- Real-time leaderboard
- Interactive submissions with instant feedback

### Database Schema
- **Users**: Teacher accounts
- **Sessions**: Learning sessions with unique PINs
- **Students**: Session participants
- **Phrases**: Learning content (Spanish phrases)
- **Submissions**: Student answers and scores
- **Analytics**: Session performance tracking

## Getting Started

The FastAPI server runs automatically on port 5000. A demo teacher account is created on startup:
- Email: teacher@demo.com
- Password: any password (demo mode)

## Project Structure

```
app/
├── main.py              # FastAPI application entry point
├── config.py            # Application configuration
├── database.py          # Database connection and initialization
├── models.py            # SQLModel database models
├── routers/             # API route handlers
│   ├── auth.py          # Authentication routes
│   ├── teacher.py       # Teacher dashboard routes
│   ├── student.py       # Student session routes
│   └── sessions.py      # Session management routes
├── templates/           # Jinja2 HTML templates
│   ├── layouts/         # Base layouts
│   ├── components/      # Reusable components
│   └── pages/           # Page templates
└── static/              # Static assets
    ├── css/             # Tailwind CSS
    └── js/              # JavaScript files
```

## Available Routes

### Public Routes
- `/` - Home page (student session join)
- `/auth/login` - Teacher login
- `/auth/signup` - Teacher signup

### Teacher Routes
- `/teacher/dashboard` - Main dashboard
- `/teacher/dashboard/analytics` - Session analytics
- `/teacher/dashboard/history` - Session history

### Student Routes
- `/session/join` - Join a session with PIN
- `/session/{pin}` - Active session interface
- `/session/{pin}/leaderboard` - Session leaderboard

## Future Enhancements

- Integrate Supabase authentication
- Implement AI-powered incentive generation
- Add real-time updates using WebSockets
- Multi-language support
- Export analytics as PDF/CSV

## License

MIT License
