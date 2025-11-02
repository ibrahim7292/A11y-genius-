# A11y Genius - AI-Powered Accessibility Scanner

🚀 **Production-ready SaaS application** for website accessibility compliance testing with AI-powered fix suggestions.

## 🌟 Features

- **AI-Powered Analysis**: OpenAI integration for intelligent fix suggestions
- **Real-time Scanning**: Puppeteer-based website crawling and analysis
- **WCAG Compliance**: Comprehensive accessibility testing
- **PDF Reports**: Downloadable compliance reports
- **Subscription Management**: Stripe integration for free/pro tiers
- **Responsive Design**: Mobile-first Tailwind CSS design
- **Authentication**: JWT-based auth with password reset
- **Dashboard**: User-friendly scan management interface

## 🏗️ Tech Stack

- **Frontend**: Next.js 13+, React 18, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express (API routes)
- **Database**: PostgreSQL
- **AI**: OpenAI GPT-3.5-turbo
- **Payments**: Stripe
- **Scanning**: Puppeteer
- **Auth**: JWT, bcryptjs
- **Deployment**: Vercel

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/a11y-genius.git
cd a11y-genius
npm install
```

### 2. Environment Setup

Create `.env.local` file:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/a11y_genius"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key-here"

# OpenAI API
OPENAI_API_KEY="sk-your-openai-api-key-here"

# Stripe
STRIPE_SECRET_KEY="sk_test_your-stripe-secret-key"
STRIPE_PUBLISHABLE_KEY="pk_test_your-stripe-publishable-key"
STRIPE_WEBHOOK_SECRET="whsec_your-webhook-secret"

# App URLs
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Email (for forgot password)
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT=587
EMAIL_FROM="noreply@a11ygenius.com"
```

### 3. Database Setup

```bash
# Create PostgreSQL database
createdb a11y_genius

# Database tables will be auto-created on first run
```

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` 🎉

## 📁 Project Structure

```
a11y-genius/
├── pages/
│   ├── api/
│   │   ├── auth/           # Authentication endpoints
│   │   ├── scan.js         # Website scanning API
│   │   └── reports.js      # Scan reports API
│   ├── _app.js             # App wrapper
│   ├── index.js            # Home page
│   └── dashboard.js        # Dashboard page
├── components/             # React components
│   └── Layout.js           # Main layout component
├── contexts/               # React contexts
│   └── AuthContext.js      # Authentication context
├── lib/                    # Utility libraries
│   ├── db.js               # Database connection
│   ├── auth.js             # Authentication helpers
│   ├── scanner.js          # Website scanning logic
│   └── ai.js               # OpenAI integration
├── styles/                 # CSS styles
│   └── globals.css         # Global styles
└── public/                 # Static assets
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Scanning
- `POST /api/scan` - Start website scan
- `GET /api/reports?scanId=123` - Get scan results
- `GET /api/reports` - Get scan history

## 🎨 UI Components

Built with Tailwind CSS and custom components:

- **Layout**: Responsive header/footer with mobile menu
- **Dashboard**: Scan form and recent scans display
- **LoadingSpinner**: Animated loading states

## 🤖 AI Integration

The AI system analyzes accessibility issues and provides:

- **Issue Detection**: Missing alt text, low contrast, ARIA violations
- **Fix Suggestions**: Code examples and implementation guidance  
- **Compliance Scoring**: 0-100% accessibility score
- **Priority Rankings**: High/medium/low issue prioritization

## 💳 Subscription Tiers

### Free Tier
- 5 scans per day
- Basic accessibility reports
- PDF downloads

### Pro Tier ($19/month)
- Unlimited scans
- Priority AI suggestions
- Advanced reporting
- API access

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy with `vercel --prod`

### Manual Deployment

```bash
# Build production bundle
npm run build

# Start production server
npm start
```

## 🔒 Security Features

- JWT authentication with secure token handling
- Password hashing with bcrypt (12 rounds)
- SQL injection prevention with parameterized queries
- CORS protection
- Rate limiting on scan endpoints
- Input validation and sanitization

## 📊 Database Schema

### Users Table
```sql
users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  name VARCHAR(255),
  subscription_tier VARCHAR(50),
  created_at TIMESTAMP
)
```

### Scans Table
```sql
scans (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  url VARCHAR(500),
  status VARCHAR(50),
  score INTEGER,
  issues JSONB,
  suggestions TEXT,
  created_at TIMESTAMP
)
```

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📧 Email: support@a11ygenius.com
- 💬 Discord: [Join our community](https://discord.gg/a11ygenius)
- 📖 Documentation: [docs.a11ygenius.com](https://docs.a11ygenius.com)

---

**Built with ❤️ for web accessibility**

Ready to deploy and start making the web more accessible! 🌐✨
