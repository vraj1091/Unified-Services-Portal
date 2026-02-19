# Gujarat Unified Services Portal - Mobile App v2.0

## 🎉 Complete Rebuild with World-Class Design

This is a completely rebuilt mobile application that matches the website's functionality with modern, advanced UI/UX design.

## ✨ Features

### Core Features
- ✅ Modern Authentication (Login/Register)
- ✅ Beautiful Dashboard with Stats
- ✅ Complete Utility Services (Electricity, Gas, Water, Property)
- ✅ Company Formation Services (GST, TAN, PAN, Company Registration)
- ✅ Government Grants System with AI-powered finder
- ✅ Document Upload with AI/OCR Extraction
- ✅ Auto-fill Forms from Extracted Data
- ✅ Application Tracking
- ✅ Profile Management
- ✅ Document Library
- ✅ Support & Help

### Design Features
- 🎨 Modern gradient designs
- 🌈 Consistent color system
- 📱 Responsive layouts
- ✨ Smooth animations
- 🎯 Intuitive navigation
- 💫 Loading states
- 🚀 Fast performance

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

### Installation

1. **Install Dependencies**
   ```bash
   cd mobile-app
   npm install
   ```

2. **Update API URL**
   Edit `src/services/api.js` and update the API_URL:
   ```javascript
   const API_URL = 'http://YOUR_BACKEND_URL:8000';
   ```

3. **Start the App**
   ```bash
   npm start
   ```

4. **Run on Device/Emulator**
   - Press `a` for Android
   - Press `i` for iOS
   - Press `w` for Web
   - Or scan QR code with Expo Go app

## 📱 Testing

### On Physical Device
1. Install **Expo Go** from App Store (iOS) or Play Store (Android)
2. Run `npm start`
3. Scan the QR code with Expo Go app

### On Emulator
- **Android**: Open Android Studio AVD, then run `npm run android`
- **iOS**: Open Xcode Simulator, then run `npm run ios`

### On Web Browser
```bash
npm run web
```

## 🏗️ Project Structure

```
mobile-app/
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── Button.js
│   │   ├── Card.js
│   │   ├── Input.js
│   │   ├── Header.js
│   │   └── ...
│   ├── screens/                 # Screen components
│   │   ├── auth/
│   │   │   ├── LoginScreen.js
│   │   │   └── RegisterScreen.js
│   │   ├── utility/
│   │   │   ├── UtilityServicesScreen.js
│   │   │   ├── ServiceProvidersScreen.js
│   │   │   ├── DocumentUploadScreen.js
│   │   │   └── FinalFormScreen.js
│   │   ├── company/
│   │   │   ├── CompanyFormationScreen.js
│   │   │   └── ...
│   │   ├── grants/
│   │   │   ├── GovernmentGrantsScreen.js
│   │   │   └── ...
│   │   ├── DashboardScreen.js
│   │   ├── ProfileScreen.js
│   │   └── ...
│   ├── context/                 # React Context providers
│   │   ├── AuthContext.js
│   │   └── ThemeContext.js
│   ├── services/                # API services
│   │   └── api.js
│   └── utils/                   # Utility functions
├── App.js                       # Main app component
├── package.json
└── README.md
```

## 🎨 Design System

### Colors
- **Primary**: Blue (#2563EB)
- **Secondary**: Emerald (#10B981)
- **Accent**: Amber (#F59E0B)
- **Neutral**: Slate shades
- **Success**: Green
- **Warning**: Yellow
- **Error**: Red

### Typography
- **Headings**: Bold, 24-36px
- **Body**: Regular/Medium, 14-16px
- **Captions**: Regular, 12px

### Components
- Modern card designs with shadows
- Gradient buttons
- Smooth animations
- Consistent spacing (8px grid)
- Rounded corners (12-32px)

## 🔧 Configuration

### Backend API
Update the API URL in `src/services/api.js`:
```javascript
const API_URL = 'http://localhost:8000'; // Change this
```

### Environment Variables
Create a `.env` file (optional):
```
API_URL=http://localhost:8000
```

## 📦 Build for Production

### Android APK
```bash
expo build:android
```

### iOS IPA
```bash
expo build:ios
```

### Web Build
```bash
expo build:web
```

## 🐛 Troubleshooting

### Common Issues

1. **Metro Bundler Issues**
   ```bash
   npm start -- --reset-cache
   ```

2. **Dependencies Issues**
   ```bash
   rm -rf node_modules
   npm install
   ```

3. **iOS Simulator Issues**
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Android Build Issues**
   - Clean gradle: `cd android && ./gradlew clean && cd ..`
   - Rebuild: `npm run android`

## 📱 Features Comparison

| Feature | Website | Mobile App |
|---------|---------|------------|
| Authentication | ✅ | ✅ |
| Dashboard | ✅ | ✅ |
| Utility Services | ✅ | ✅ |
| Company Formation | ✅ | ✅ |
| Government Grants | ✅ | ✅ |
| Document Upload | ✅ | ✅ |
| AI Extraction | ✅ | ✅ |
| Auto-fill Forms | ✅ | ✅ |
| Application Tracking | ✅ | ✅ |
| Profile Management | ✅ | ✅ |
| Document Library | ✅ | ✅ |
| Support & Help | ✅ | ✅ |

## 🚀 Performance

- Fast startup time
- Smooth 60fps animations
- Optimized images
- Efficient re-renders
- Minimal bundle size

## 🔐 Security

- Secure token storage
- Encrypted API communication
- Input validation
- XSS protection
- CSRF protection

## 📄 License

MIT License

## 👥 Support

For issues and questions:
- GitHub Issues: [Create Issue](https://github.com/your-repo/issues)
- Email: support@example.com

## 🎯 Roadmap

- [ ] Push notifications
- [ ] Biometric authentication
- [ ] Offline mode
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Voice commands
- [ ] AR document scanner

---

**Built with ❤️ for Digital Gujarat Initiative**
