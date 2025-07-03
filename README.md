
# NutriExpert - AI-Powered Nutrition Platform

A comprehensive nutrition and wellness platform that provides personalized meal plans, AI-powered nutrition advice, and expert consultations.

## Features

- **AI Nutrition Assistant**: Get instant, personalized nutrition advice
- **Smart Assessment**: Comprehensive health and lifestyle questionnaire
- **Expert Consultations**: Video calls with certified nutritionists and doctors
- **Personalized Plans**: Custom meal plans based on your goals and preferences
- **User Dashboard**: Track progress and manage your nutrition journey

## Tech Stack

- **Frontend**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Routing**: React Router
- **State Management**: React Context
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

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
│   ├── Assessment.tsx  # Health assessment form
│   ├── Consultation.tsx# Expert booking page
│   └── AIChat.tsx      # AI chat page
├── lib/                # Utility functions
└── App.tsx             # Main app component
```

## Key Features Explained

### 1. Authentication System
- Simple email/password authentication
- Persistent login state using localStorage
- Protected routes for authenticated users

### 2. AI Nutrition Assistant
- Context-aware responses based on user queries
- Nutrition science-backed advice
- Integration ready for real AI services

### 3. Comprehensive Assessment
- Multi-step form collecting health data
- Progress tracking through assessment
- Data validation and storage ready

### 4. Expert Consultation Booking
- Browse certified nutrition experts
- Time slot selection
- Payment integration ready (Stripe)
- Emergency consultation option

### 5. Responsive Design
- Mobile-first approach
- Tailwind CSS for consistent styling
- Smooth animations and transitions

## Environment Setup

Currently, the app runs with mock data for development. To integrate with real services:

1. **For AI Chat**: Replace the mock AI responses with calls to OpenAI API or similar
2. **For Authentication**: Integrate with Supabase, Firebase, or your preferred auth service
3. **For Payments**: Add Stripe integration for consultation bookings
4. **For Database**: Connect to your preferred database for storing user data

## Deployment

The app can be deployed to any static hosting service:

- **Vercel**: Connect your GitHub repository for automatic deployments
- **Netlify**: Drag and drop the `dist` folder after running `npm run build`
- **GitHub Pages**: Use GitHub Actions for automatic deployment

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For questions or support, please contact our development team.

## License

This project is proprietary software. All rights reserved.
