# Gujarat Unified Services Portal

A comprehensive mobile and web application for accessing government services, utility connections, company formation, and government grants in Gujarat, India.

## 🚀 Features

### Mobile Application
- **Professional UI/UX Design** - Clean 2-color design system (Deep Blue + White/Gray)
- **Document Management** - Upload, view, share, and manage documents across all services
- **Utility Services** - Apply for electricity, gas, water, and property services
- **Company Formation** - Complete business registration workflow
- **Government Grants** - Browse and apply for government schemes
- **Service Providers** - Comprehensive database of service providers with ratings
- **Authentication** - Secure login and registration system

### Web Application
- Full-featured web portal
- Responsive design
- Admin dashboard
- Service management

### Backend API
- RESTful API
- Authentication & Authorization
- Document storage
- Application processing

## 📱 Mobile App Screenshots

### Key Screens
- Login & Registration
- Dashboard with service categories
- Utility Services flow
- Document Upload with progress tracking
- Document Viewer with preview
- Service Providers with search and filters
- Company Formation wizard
- Government Grants browser
- Profile & Applications management

## 🛠️ Technology Stack

### Mobile App
- **Framework**: React Native (Expo)
- **Navigation**: React Navigation
- **State Management**: React Context API
- **UI Components**: Custom components with professional design system
- **Platform**: iOS, Android, Web

### Frontend
- React.js
- Material-UI
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (for mobile app)
- MongoDB (for backend)

### Mobile App Setup

```bash
# Navigate to mobile app directory
cd mobile-app

# Install dependencies
npm install

# Start development server
npm run web        # For web browser
npm run android    # For Android
npm run ios        # For iOS
```

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start server
npm start
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

## 🎯 Quick Start

### Running Everything

```bash
# From project root
npm run start-all
```

Or use the provided batch files:
- `start-all.bat` - Start all services
- `start-mobile.bat` - Start mobile app only
- `start-backend.bat` - Start backend only
- `start-frontend.bat` - Start frontend only

## 📖 Documentation

### Key Documentation Files
- `DOCUMENT_SYSTEM_FIXED.md` - Document management system details
- `MOBILE_APP_COMPLETE.md` - Mobile app features and architecture
- `HOW_TO_RUN.md` - Detailed running instructions
- `CLEAR_CACHE_INSTRUCTIONS.md` - Troubleshooting guide
- `PUSH_TO_GITHUB.md` - Git deployment guide

## 🏗️ Project Structure

```
gujarat-unified-services-portal/
├── mobile-app/                 # React Native mobile application
│   ├── src/
│   │   ├── context/           # Global state management
│   │   │   ├── AuthContext.js
│   │   │   ├── ThemeContext.js
│   │   │   └── DocumentContext.js
│   │   ├── screens/           # All application screens
│   │   │   ├── auth/          # Authentication screens
│   │   │   ├── utility/       # Utility services flow
│   │   │   ├── company/       # Company formation
│   │   │   ├── grants/        # Government grants
│   │   │   └── *.js           # Other screens
│   │   └── theme/             # Design system
│   ├── App.js                 # Main app entry point
│   └── package.json
├── backend/                    # Node.js backend API
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/                   # React web application
│   ├── src/
│   └── package.json
├── terraform/                  # Infrastructure as code
├── docker-compose.yml         # Docker configuration
└── README.md
```

## 🎨 Design System

### Color Palette
- **Primary**: Deep Blue (#1E40AF)
- **Background**: Light Gray (#F8FAFC)
- **Surface**: White (#FFFFFF)
- **Text**: Dark Gray (#0F172A)
- **Secondary Text**: Medium Gray (#475569)

### Typography
- **Headings**: Bold, 18-24px
- **Body**: Regular, 14-16px
- **Small**: Regular, 12px

### Spacing
- 8pt grid system
- Consistent padding and margins
- Proper visual hierarchy

## 🔐 Authentication

### User Roles
- **Citizen**: Apply for services, upload documents
- **Service Provider**: Manage applications
- **Admin**: System administration

### Features
- Secure login/registration
- JWT token-based authentication
- Password encryption
- Session management

## 📄 Document Management

### Features
- Upload documents from camera, gallery, or files
- View documents with full-screen preview
- Download and share documents
- Delete documents with confirmation
- Filter by category (Identity, Address, Financial, Other)
- Track upload date and source
- Tag documents with service and provider information

### Supported Document Types
- PDF
- JPG/JPEG
- PNG

## 🔧 Services

### Utility Services
- Electricity connection
- Gas connection
- Water connection
- Property tax

### Company Formation
- Business registration
- GST registration
- Company incorporation
- Partnership registration

### Government Grants
- Startup schemes
- Agricultural subsidies
- Education grants
- Housing schemes

## 🚀 Deployment

### Docker Deployment
```bash
docker-compose up -d
```

### Manual Deployment
See `COMPLETE_DEPLOYMENT_GUIDE.md` for detailed instructions.

### Cloud Deployment
- AWS EC2 setup guide available
- Terraform scripts included
- CI/CD pipeline ready

## 🧪 Testing

### Mobile App
```bash
cd mobile-app
npm test
```

### Backend
```bash
cd backend
npm test
```

## 🐛 Troubleshooting

### Common Issues

**Mobile app not loading**
- Clear cache: Ctrl+Shift+R
- Restart Expo server
- Check console for errors

**Upload not working**
- Clear browser cache
- Open in incognito mode
- Check console logs

**Backend connection failed**
- Verify backend is running
- Check .env configuration
- Verify MongoDB connection

See `CLEAR_CACHE_INSTRUCTIONS.md` for detailed troubleshooting.

## 📝 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `GET /auth/profile` - Get user profile

#### Services
- `GET /services` - List all services
- `POST /services/apply` - Apply for service
- `GET /services/applications` - Get user applications

#### Documents
- `POST /documents/upload` - Upload document
- `GET /documents` - List user documents
- `DELETE /documents/:id` - Delete document

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- **Vraj** - Initial work - [vraj1091](https://github.com/vraj1091)

## 🙏 Acknowledgments

- Gujarat Government for service specifications
- React Native community
- Expo team
- All contributors

## 📞 Support

For support, email support@example.com or open an issue on GitHub.

## 🔄 Version History

### v1.0.0 (Current)
- Complete mobile application
- Document management system
- Professional UI/UX design
- All service flows implemented
- Authentication system
- Navigation setup
- Context providers

## 🎯 Roadmap

### Upcoming Features
- [ ] Real file upload with cloud storage
- [ ] Push notifications
- [ ] Offline mode
- [ ] Multi-language support (Gujarati, Hindi)
- [ ] Payment gateway integration
- [ ] Application tracking
- [ ] Chat support
- [ ] Document OCR
- [ ] Biometric authentication
- [ ] Dark mode

## 📊 Status

🟢 **Production Ready** - All core features implemented and tested

## 🔗 Links

- [GitHub Repository](https://github.com/vraj1091/Unified-Services-Portal)
- [Live Demo](#) (Coming soon)
- [Documentation](#)
- [API Docs](#)

---

Made with ❤️ for the people of Gujarat
