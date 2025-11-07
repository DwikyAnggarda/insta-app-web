# InstaApp Frontend 📸

Frontend aplikasi InstaApp - Instagram clone menggunakan React + Vite dengan integrasi penuh ke Laravel Backend API.

## 🚀 Fitur Lengkap

### ✅ Authentication
- [x] Login dengan email & password
- [x] Register akun baru (name, username, email, password)
- [x] Logout
- [x] Protected routes (redirect ke login jika belum login)
- [x] Auto redirect ke home jika sudah login
- [x] Session management dengan Bearer Token

### ✅ Posts Management
- [x] Create post (text only, image only, atau keduanya)
- [x] View all posts (feed)
- [x] Edit post (hanya owner)
- [x] Delete post (hanya owner)
- [x] Image upload dengan preview
- [x] Validation (max 2000 chars, max 5MB image)
- [x] Support JPG, PNG, WebP

### ✅ Like System
- [x] Like/Unlike post (toggle)
- [x] Real-time like count
- [x] Visual indicator (heart filled/unfilled)
- [x] Optimistic UI update

### ✅ Comment System
- [x] View comments per post
- [x] Add comment
- [x] Delete comment (hanya owner)
- [x] Real-time comment count
- [x] Expandable comments section

### ✅ User Profile
- [x] View own profile
- [x] User stats (total posts, likes, comments)
- [x] View own posts
- [x] Avatar dengan fallback UI Avatar

### ✅ UI/UX
- [x] Modern & responsive design
- [x] Tailwind CSS styling
- [x] Loading states
- [x] Error handling
- [x] Form validation
- [x] Smooth animations
- [x] Mobile-first design
- [x] Bottom navigation
- [x] Gradient branding

## 🛠️ Tech Stack

- **React 19** - UI Library
- **Vite 7** - Build tool & dev server
- **React Router DOM 7** - Routing
- **Axios** - HTTP client
- **Tailwind CSS 4** - Styling
- **Lucide React** - Icons

## 📦 Installation

```bash
# Install dependencies
npm install

# Create .env file (sudah disediakan)
# Edit .env sesuaikan dengan backend URL
# VITE_API_BASE=http://localhost:8001/api

# Run development server
npm run dev
```

## 🔧 Configuration

Edit file `.env`:

```env
VITE_API_BASE=http://localhost:8001/api
```

Sesuaikan URL backend API Anda.

## 🎯 API Endpoints yang Digunakan

### Auth
- `POST /register` - Registrasi user baru
- `POST /login` - Login user
- `POST /logout` - Logout user
- `GET /user` - Get current user

### Posts
- `GET /posts` - Get all posts (public)
- `POST /posts` - Create new post
- `PUT /posts/{id}` - Update post (owner only)
- `DELETE /posts/{id}` - Delete post (owner only)

### Likes
- `POST /posts/{id}/like` - Toggle like

### Comments
- `POST /posts/{id}/comments` - Add comment
- `DELETE /comments/{id}` - Delete comment (owner only)

## 📁 Struktur Komponen

```
src/
├── components/
│   ├── AddPostModal.jsx      # Modal create post
│   ├── EditPostModal.jsx     # Modal edit post
│   ├── PostCard.jsx          # Card component untuk post
│   ├── CommentSection.jsx    # Section untuk comments
│   ├── Header.jsx            # Top header dengan logout
│   └── BottomNav.jsx         # Bottom navigation bar
├── pages/
│   ├── Login.jsx             # Halaman login
│   ├── Register.jsx          # Halaman register
│   ├── Home.jsx              # Halaman feed/home
│   └── Profile.jsx           # Halaman profile user
├── context/
│   └── AuthContext.jsx       # Context untuk authentication
├── hooks/
│   ├── useAuth.js            # Hook untuk auth
│   ├── usePosts.js           # Hook untuk posts
│   └── useComments.js        # Hook untuk comments
└── lib/
    └── api.js                # Axios instance dengan interceptor
```

## 🔐 Protected Routes

Routes yang memerlukan authentication:
- `/` - Home/Feed
- `/profile` - User profile

Routes public:
- `/login` - Login page
- `/register` - Register page

## 🐛 Bug Fixes

### Fixed Issues:
✅ AuthContext tidak terbungkus di App
✅ Field names salah (image vs image_url, caption vs body)
✅ Posting dipaksa upload image (sekarang optional)
✅ Like button tidak berfungsi
✅ Comment system tidak ada UI
✅ Tidak ada halaman Login/Register
✅ Tidak ada routing system
✅ Edit/Delete post sekarang tersedia

## 📝 Testing

```bash
# Run linter
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## 👥 Developer

Developed as part of InstaApp project - Instagram clone dengan Laravel 10 & React.

---

**Happy Coding! 🚀**
