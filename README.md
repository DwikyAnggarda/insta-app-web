# 📸 SimpleInsta - Instagram Clone

> **A full-stack social media application built with modern web technologies**

SimpleInsta adalah aplikasi social media yang terinspirasi dari Instagram, memiliki fitur-fitur lengkap untuk berbagi foto, memberi like, berkomentar, dan mengelola profil pengguna.

---

## 🚀 Tech Stack

### Frontend
- **React 18** - UI Library
- **Vite** - Build Tool & Dev Server
- **React Router DOM** - Client-side Routing
- **Tailwind CSS** - Utility-first CSS Framework
- **Lucide React** - Icon Library
- **Axios** - HTTP Client
- **Canvas Confetti** - Celebration Animations

### Backend
- **Laravel 10** - PHP Framework
- **Laravel Sanctum** - API Authentication
- **PostgreSQL** - Database
- **Laravel Storage** - File Management

### Development Tools
- **ESLint** - Code Linting
- **PostCSS** - CSS Processing
- **Composer** - PHP Dependency Manager
- **NPM** - JavaScript Package Manager

---

## ✨ Features

### 🔐 Authentication
- ✅ User Registration dengan validasi lengkap
- ✅ User Login dengan Remember Me
- ✅ Logout functionality
- ✅ Protected Routes (hanya user login yang bisa akses)
- ✅ Welcome Animation setelah registrasi berhasil
- ✅ Token-based authentication (Laravel Sanctum)

### 📝 Post Management
- ✅ **Create Post** - Text + Image (opsional)
- ✅ **Edit Post** - Update caption atau ganti gambar
- ✅ **Delete Post** - Hapus post beserta likes & comments
- ✅ **View Posts** - Feed timeline dengan infinite scroll
- ✅ **Post Validation** - Minimal ada text atau image
- ✅ **Authorization** - Hanya owner yang bisa edit/delete

### ❤️ Like System
- ✅ Like/Unlike post dengan satu klik
- ✅ Realtime like count update
- ✅ Optimistic UI update (instant feedback)
- ✅ Like state persistence (tetap tersimpan saat navigasi)
- ✅ Visual indicator (red heart untuk liked posts)

### 💬 Comment System
- ✅ **Add Comment** - Tulis komentar di post
- ✅ **View Comments** - Lihat semua komentar dalam modal
- ✅ **Delete Comment** - Hapus komentar sendiri
- ✅ **Comment Modal** - Full-screen modal untuk fokus membaca
- ✅ **Timestamp** - Relative time (just now, 5m ago, dll)
- ✅ **User Avatar** - Tampilkan foto profil di setiap komentar

### 👤 User Profile
- ✅ **Profile Page** - Halaman profil user
- ✅ **User Stats** - Total posts, followers, following
- ✅ **Posts Grid** - Tampilan grid untuk semua post user
- ✅ **Avatar** - Profile picture dengan UI-Avatars fallback

### 🎨 UI/UX Features
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Bottom Navigation** - Easy navigation (Home, Add, Profile)
- ✅ **Loading States** - Skeleton screens & spinners
- ✅ **Error Handling** - User-friendly error messages
- ✅ **Empty States** - Informative empty state messages
- ✅ **Smooth Animations** - Transitions & micro-interactions
- ✅ **Modern UI** - Clean, minimalist design dengan Tailwind CSS

### 🔒 Security & Authorization
- ✅ **Role-based Access** - User vs Admin roles
- ✅ **Post Ownership** - Hanya owner bisa edit/delete post
- ✅ **Comment Ownership** - Hanya owner bisa delete comment
- ✅ **CORS Configuration** - Secure cross-origin requests
- ✅ **Rate Limiting** - Prevent spam & abuse
- ✅ **Input Sanitization** - XSS protection

---

## 📁 Project Structure

```
insta-app-web/
├── backend/              # Laravel Backend
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/   # API Controllers
│   │   │   ├── Resources/     # API Resources (transformers)
│   │   │   └── Middleware/    # Custom middleware
│   │   ├── Models/            # Eloquent Models
│   │   └── Policies/          # Authorization policies
│   ├── database/
│   │   ├── migrations/        # Database migrations
│   │   ├── factories/         # Model factories
│   │   └── seeders/           # Database seeders
│   ├── routes/
│   │   ├── api.php            # API routes
│   │   └── web.php            # Web routes
│   └── tests/                 # Backend tests
│
├── frontend/             # React Frontend
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── pages/             # Page components
│   │   ├── context/           # React Context (AuthContext)
│   │   ├── hooks/             # Custom hooks
│   │   └── lib/               # API client & utilities
│   ├── public/                # Static assets
│   └── index.html             # HTML template
│
└── README.md             # This file
```

---

## 🛠️ Installation & Setup

### Prerequisites

Pastikan sudah terinstall:
- **PHP** >= 8.1
- **Composer** >= 2.0
- **Node.js** >= 18.0
- **PostgreSQL** >= 13.0
- **Git**

### Step 1: Clone Repository

```bash
git clone https://github.com/yourusername/insta-app-web.git
cd insta-app-web
```

### Step 2: Backend Setup (Laravel)

```bash
# Masuk ke folder backend
cd backend

# Install dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Setup database di .env
# Edit file .env dan sesuaikan:
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=insta_app
DB_USERNAME=your_username
DB_PASSWORD=your_password

# Create database (via psql)
createdb insta_app

# Run migrations
php artisan migrate

# Create storage symlink
php artisan storage:link

# (Optional) Run seeders
php artisan db:seed

# Start Laravel development server
php artisan serve
# Backend running at: http://localhost:8000
```

### Step 3: Frontend Setup (React + Vite)

```bash
# Buka terminal baru, masuk ke folder frontend
cd frontend

# Install dependencies
npm install

# Setup environment variables
# Create .env file dan tambahkan:
echo "VITE_API_URL=http://localhost:8000/api" > .env

# Start Vite development server
npm run dev
# Frontend running at: http://localhost:5173
```

### Step 4: Access Application

Buka browser dan akses:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000/api

---

## 📖 Usage Guide

### 1. Register New Account

1. Buka http://localhost:5173
2. Klik **"Sign Up"** atau navigate ke `/register`
3. Isi form:
   - Full Name (required)
   - Email (required, must be valid)
   - Password (required, min 6 characters)
   - Confirm Password (must match)
4. Klik **"Sign Up"**
5. Welcome animation akan muncul 🎉
6. Automatically redirected ke Home page

### 2. Login

1. Navigate ke `/login`
2. Isi email & password
3. Klik **"Sign In"**
4. Redirected ke Home page

### 3. Create Post

1. Klik tombol **"+"** di bottom navigation
2. Modal "Create Post" akan muncul
3. Isi caption (optional)
4. Upload image (optional)
5. Note: Minimal ada caption ATAU image
6. Klik **"Post"**
7. Post baru muncul di feed

### 4. Like a Post

1. Klik icon **heart** di post
2. Icon berubah merah = liked
3. Like count bertambah
4. Klik lagi untuk unlike

### 5. Comment on Post

1. Klik icon **comment** di post
2. Modal comments akan muncul
3. Tulis komentar di bottom form
4. Klik **Send**
5. Komentar muncul di list
6. Klik **trash icon** untuk delete komentar sendiri

### 6. Edit Post

1. Klik **menu (3 dots)** di post milik sendiri
2. Pilih **"Edit Post"**
3. Update caption atau image
4. Klik **"Save Changes"**

### 7. Delete Post

1. Klik **menu (3 dots)** di post milik sendiri
2. Pilih **"Delete Post"**
3. Konfirmasi delete
4. Post terhapus beserta likes & comments

### 8. View Profile

1. Klik icon **user** di bottom navigation
2. Lihat stats: Posts count, Followers, Following
3. Lihat grid semua post user
4. Klik **Logout** untuk keluar

---

## 🧪 Testing

### Backend Testing

```bash
cd backend

# Run all tests
php artisan test

# Run specific test
php artisan test --filter PostTest

# Run with coverage
php artisan test --coverage
```

### Frontend Testing

```bash
cd frontend

# Run linter
npm run lint

# Build for production (test build)
npm run build

# Preview production build
npm run preview
```

---

## 🔧 Configuration

### Backend Configuration

**File**: `backend/.env`

```env
# Application
APP_NAME="SimpleInsta"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

# Database
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=insta_app
DB_USERNAME=postgres
DB_PASSWORD=secret

# CORS (allow frontend)
SANCTUM_STATEFUL_DOMAINS=localhost:5173
SESSION_DOMAIN=localhost
```

### Frontend Configuration

**File**: `frontend/.env`

```env
# API URL
VITE_API_URL=http://localhost:8000/api
```

---

## 📝 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/register` | Register new user | No |
| POST | `/api/login` | Login user | No |
| POST | `/api/logout` | Logout user | Yes |
| GET | `/api/user` | Get current user | Yes |

### Post Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/posts` | Get all posts | No |
| GET | `/api/posts/{id}` | Get single post | No |
| POST | `/api/posts` | Create post | Yes |
| PUT | `/api/posts/{id}` | Update post | Yes (owner) |
| DELETE | `/api/posts/{id}` | Delete post | Yes (owner) |

### Like Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/posts/{id}/like` | Toggle like | Yes |

### Comment Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/posts/{id}/comments` | Add comment | Yes |
| DELETE | `/api/comments/{id}` | Delete comment | Yes (owner) |

---

## 🐛 Known Issues & Fixes

### Issue 1: Like Color Not Persisting ✅ FIXED
**Problem**: Like icon color resets after navigation  
**Solution**: Update parent state on like action  
**Details**: See `BUGFIX_LIKE_PERSISTENCE_FINAL.md`

### Issue 2: MessageCircle Not Defined ✅ FIXED
**Problem**: Error when opening comment modal on post with 0 comments  
**Solution**: Added `MessageCircle` to import statement  

---

## 🚀 Deployment

### Backend Deployment (Laravel)

```bash
# Build for production
composer install --optimize-autoloader --no-dev

# Set environment
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Run migrations
php artisan migrate --force

# Set permissions
chmod -R 755 storage bootstrap/cache
```

### Frontend Deployment (React)

```bash
# Build for production
npm run build

# Output: dist/ folder
# Deploy dist/ to your hosting (Vercel, Netlify, etc.)
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Authors

- **Your Name** - Initial work - [GitHub](https://github.com/yourusername)

---

## Screenshots

- https://github.com/DwikyAnggarda/insta-app-web/blob/main/frontend/ss-1.png
- https://github.com/DwikyAnggarda/insta-app-web/blob/main/frontend/ss-2.png
- https://github.com/DwikyAnggarda/insta-app-web/blob/main/frontend/ss-3.png

---

## 🙏 Acknowledgments

- Inspired by Instagram
- Built with ❤️ using Laravel & React
- Icons by Lucide React
- UI design with Tailwind CSS

---

## 📞 Support

For support, email your.email@example.com or open an issue in the repository.

---

**Happy Coding! 🚀**