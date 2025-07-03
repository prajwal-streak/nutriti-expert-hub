
# NutriExpert - AI-Powered Nutrition Platform

A comprehensive nutrition and wellness platform that provides personalized meal plans, AI-powered nutrition advice, expert consultations, and advanced health analytics.

## Features

### 🤖 AI Nutrition Assistant
- Real-time chat with AI nutritionist
- Personalized nutrition advice
- Context-aware responses based on user profile

### 📊 Smart Assessment System
- Comprehensive 5-step health questionnaire
- Dynamic question flow based on responses
- Secure data storage with expert review

### 👨‍⚕️ Expert Consultations
- Video calls with certified nutritionists and doctors
- Emergency consultation options
- Expert approval for all nutrition plans

### 🧪 Lab Report Analysis (Advanced Feature)
- Upload lab reports (PDF, JPG, PNG)
- AI-powered analysis with OCR technology
- Nutritional recommendations based on lab results
- Research citations with medical references
- Critical findings detection

### 🏠 Smart Pantry Management
- Barcode scanning for inventory
- Recipe suggestions based on available ingredients
- Expiration date tracking
- Budget-friendly meal planning

### 📈 Progress Tracking
- Weight and nutrition trend analysis
- Interactive charts and graphs
- Goal achievement monitoring
- Behavioral insights

### 🍽️ Personalized Nutrition Plans
- Expert-approved meal plans
- Dynamic meal swapping
- Shopping list generation
- Macro and micronutrient tracking

### 🍳 Recipe Collection
- Dietary preference filtering
- Nutrition information for each recipe
- Cooking difficulty levels
- Ingredient substitution suggestions

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Routing**: React Router v6
- **State Management**: React Context
- **Icons**: Lucide React
- **Notifications**: Sonner

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd nutriti-expert-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080` to view the application

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Local Development Tips

- The app uses mock data for development
- Authentication is simulated with localStorage
- All features are functional without backend services
- Hot reload is enabled for development

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Header.tsx      # Navigation header
│   ├── AIChat.tsx      # AI chatbot component
│   └── ...
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication context
├── pages/              # Page components
│   ├── Index.tsx       # Landing page
│   ├── Dashboard.tsx   # User dashboard
│   ├── Assessment.tsx  # Health assessment
│   ├── Consultation.tsx# Expert booking
│   ├── AIChat.tsx      # AI chat page
│   ├── Progress.tsx    # Progress tracking
│   ├── NutritionPlan.tsx # Meal plans
│   ├── Recipes.tsx     # Recipe browser
│   ├── LabAnalysis.tsx # Lab report analysis
│   └── PantrySync.tsx  # Smart pantry
├── lib/                # Utility functions
└── App.tsx             # Main app component
```

## Key Features Explained

### 1. Authentication System
- Email/password authentication
- Persistent login with localStorage
- Protected routes for authenticated users
- User profile management

### 2. AI Nutrition Assistant
- Context-aware responses
- Nutrition science-backed advice
- Integration ready for OpenAI API
- Chat history persistence

### 3. Health Assessment
- 5-step comprehensive questionnaire
- Progress tracking through assessment
- Data validation and expert review
- Personalized recommendations

### 4. Lab Report Analysis
- OCR technology for report scanning
- AI analysis of blood work
- Nutritional deficiency detection
- Research-backed recommendations
- Expert review for critical findings

### 5. Smart Pantry System
- Barcode scanning capability
- Expiration date tracking
- Recipe suggestions based on inventory
- Shopping list generation
- Budget optimization

### 6. Expert Consultation System
- Browse certified professionals
- Time slot booking
- Video call integration (ready for Twilio)
- Payment processing (ready for Stripe)
- Emergency consultation options

## Integration Roadmap

### For Production Deployment

1. **AI Services**
   - Integrate OpenAI API for chat responses
   - Add OCR service for lab report analysis
   - Implement natural language processing

2. **Authentication**
   - Connect to Supabase or Firebase Auth
   - Add social login options
   - Implement password recovery

3. **Database**
   - Set up PostgreSQL or MongoDB
   - Design user data schemas
   - Implement data encryption

4. **Payment Processing**
   - Integrate Stripe for consultations
   - Add subscription management
   - Handle refunds and disputes

5. **Video Calling**
   - Integrate Twilio or Agora
   - Add recording capabilities
   - Implement screen sharing

6. **Email Services**
   - Set up SendGrid for notifications
   - Create email templates
   - Add expert notification system

## Environment Variables

For production deployment, you'll need:

```env
# AI Services
OPENAI_API_KEY=your_openai_key
PERPLEXITY_API_KEY=your_perplexity_key

# Database
DATABASE_URL=your_database_url

# Authentication
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key

# Payment
STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key

# Video Calling
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token

# Email
SENDGRID_API_KEY=your_sendgrid_key
```

## Deployment Options

### Quick Deploy
- **Vercel**: Connect GitHub repository for automatic deployments
- **Netlify**: Drag and drop `dist` folder after `npm run build`
- **GitHub Pages**: Use GitHub Actions for deployment

### Advanced Deploy
- **AWS S3 + CloudFront**: For CDN and global distribution
- **Digital Ocean**: For full control over server configuration
- **Heroku**: For easy scaling and add-ons

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Medical Disclaimer

This platform is for educational and informational purposes only. It is not intended to replace professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare providers for medical concerns.

## License

This project is proprietary software. All rights reserved.

## Support

For technical support or questions:
- Email: support@nutriexpert.com
- Documentation: [docs.nutriexpert.com]
- Community: [discord.gg/nutriexpert]

---

**Ready to revolutionize nutrition and health with AI-powered insights!** 🚀
