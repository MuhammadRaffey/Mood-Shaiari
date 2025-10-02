# 🌸 موڈ شاعری | Mood Shayari

> Transform your emotions into beautiful Urdu poetry with AI

An elegant, modern web application that generates authentic Urdu poetry (Shayari) based on your mood. Built with Next.js 15, TypeScript, and powered by AI.

![Version](https://img.shields.io/badge/version-2.0.0-purple)
![Next.js](https://img.shields.io/badge/Next.js-15.0.3-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🎭 Mood-Based Poetry Generation

- **6 Distinct Moods**: Khush (Happy), Udaas (Sad), Pur Sukoon (Calm), Gussa (Angry), Pyaar (Love), Nirvana (Blissful)
- **3 Poetry Styles**: Ghazal, Nazm, and Haiku
- AI-powered generation using Groq API

### 🎨 Modern UI/UX

- **Stunning Animations**: Smooth transitions using Framer Motion
- **Glass Morphism Design**: Beautiful backdrop blur effects
- **Gradient Backgrounds**: Dynamic, colorful gradients
- **Responsive Layout**: Works perfectly on all devices
- **Urdu Typography**: Authentic Noto Nastaliq Urdu font

### 📚 History & Favorites

- **Persistent History**: All generated poems saved locally
- **Favorites System**: Mark your favorite poems with a heart
- **Quick Access**: Side panel for easy navigation
- **Filter Options**: View all poems or favorites only
- **Delete & Clear**: Manage your history with ease

### 🚀 Advanced Features

- **Copy to Clipboard**: One-click copy functionality
- **Social Sharing**: Share on Twitter or native share
- **Download Poems**: Save poems as text files
- **Regenerate**: Create new variations instantly
- **Error Handling**: Graceful error messages and recovery
- **Loading States**: Beautiful loading animations

### 🎯 User Experience

- **Step-by-Step Flow**: Intuitive 3-step process
- **Hover Effects**: Interactive card animations
- **Real-time Feedback**: Toast notifications
- **Keyboard Accessible**: Full accessibility support
- **Fast Performance**: Optimized with Next.js 15 Turbopack

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15.0.3 with App Router
- **Language**: TypeScript 5.9.3
- **Styling**: Tailwind CSS 3.4.18
- **Animations**: Framer Motion 11.18.2
- **Icons**: Lucide React 0.460.0
- **UI Components**: Custom components with shadcn/ui patterns

### Backend

- **API Routes**: Next.js API Routes
- **AI Provider**: Groq API (OpenAI compatible)
- **Model**: GPT-OSS-120B

### Development

- **Package Manager**: pnpm
- **Code Quality**: ESLint with Next.js config
- **Type Safety**: Strict TypeScript configuration

## 📦 Installation

### Prerequisites

- Node.js 20.x or higher
- pnpm (recommended) or npm

### Setup

1. **Clone the repository**

```bash
git clone https://github.com/MuhammadRaffey/Mood-Shaiari
cd mood-shaiari
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Configure environment variables**

Create a `.env.local` file in the root directory:

```env
GROK_API_KEY=your_groq_api_key_here
```

To get a Groq API key:

- Visit https://console.groq.com
- Sign up for a free account
- Generate an API key from the dashboard

4. **Run the development server**

```bash
pnpm dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

### Generating Poetry

1. **Choose Your Mood**: Select from 6 beautifully designed mood cards
2. **Select Poetry Style**: Pick Ghazal, Nazm, or Haiku
3. **View Your Poem**: Watch as AI creates authentic Urdu poetry
4. **Interact**: Copy, share, download, or regenerate

### Managing History

- **Open History Panel**: Click the History button in the navbar
- **View Favorites**: Toggle to see only favorited poems
- **Revisit Poems**: Click any poem to view it again
- **Delete Items**: Remove individual poems or clear all history

### Keyboard Shortcuts

- `Esc`: Close history panel
- `Tab`: Navigate through interactive elements
- `Enter/Space`: Activate buttons and cards

## 📁 Project Structure

```
mood-shaiari/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── poetry/
│   │   │       └── route.ts          # API endpoint for poem generation
│   │   ├── fonts/                    # Custom font files
│   │   ├── globals.css               # Global styles and animations
│   │   ├── layout.tsx                # Root layout with metadata
│   │   └── page.tsx                  # Main application page
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.tsx            # Reusable button component
│   │   │   └── card.tsx              # Card components
│   │   ├── HistoryPanel.tsx          # History sidebar
│   │   ├── LoadingAnimation.tsx      # Loading state component
│   │   ├── MoodCard.tsx              # Mood selection cards
│   │   ├── Navbar.tsx                # Top navigation bar
│   │   ├── PoemDisplay.tsx           # Poem display with actions
│   │   └── StyleSelector.tsx         # Poetry style selector
│   └── lib/
│       └── utils.ts                  # Utility functions
├── public/                           # Static assets
├── .env.local                        # Environment variables (create this)
├── next.config.ts                    # Next.js configuration
├── tailwind.config.ts                # Tailwind CSS configuration
├── tsconfig.json                     # TypeScript configuration
└── package.json                      # Dependencies and scripts
```

## 🎨 Customization

### Adding New Moods

Edit `src/app/page.tsx`:

```typescript
const moods = [
  {
    label: "Your Mood Name",
    emoji: "🎭",
    gradient: "from-color-400 via-color-500 to-color-600",
  },
  // ... add more
];
```

### Adding Poetry Styles

```typescript
const poetryStyles = [
  {
    name: "Style Name",
    urduName: "اردو نام",
    description: "Description of the style",
  },
  // ... add more
];
```

### Changing Colors

Modify `tailwind.config.ts` or use Tailwind's color classes directly in components.

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables:
   - `GROK_API_KEY`: Your Groq API key
5. Deploy!

### Deploy to Other Platforms

The app can be deployed to any platform that supports Next.js:

- **Netlify**: Use Netlify CLI or Git integration
- **Railway**: Connect your GitHub repository
- **Self-hosted**: Build with `pnpm build` and serve with `pnpm start`

## 🔧 Scripts

```bash
# Development
pnpm dev              # Start development server with Turbopack

# Production
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint
pnpm type-check       # Run TypeScript compiler check
```

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Test thoroughly before submitting
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Groq**: For providing fast AI inference
- **Vercel**: For Next.js framework
- **Google Fonts**: For Noto Nastaliq Urdu font
- **Lucide**: For beautiful icons
- **Framer**: For animation library

## 📧 Contact

For questions, suggestions, or feedback:

- Create an issue on GitHub
- Email: your-email@example.com

## 🎉 What's New in v2.0

### Major Updates

- ✅ Complete UI/UX redesign
- ✅ History & Favorites system
- ✅ Improved animations and transitions
- ✅ Better Urdu typography
- ✅ Download poems as text files
- ✅ Enhanced mobile experience
- ✅ Persistent local storage
- ✅ Better error handling
- ✅ Loading states with animations
- ✅ Regenerate functionality

### Performance Improvements

- ✅ Updated to Next.js 15
- ✅ Optimized component rendering
- ✅ Lazy loading for better performance
- ✅ Reduced bundle size

---

Made with ❤️ and ✨ for poetry lovers

**موڈ شاعری - جذبات کو شاعری میں بدلیں**
