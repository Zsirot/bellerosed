# Bellerose Tattoo & Art Studio

A professional website for Bellerosed Tattoo & Art Studio, showcasing tattoo designs, paintings, and booking services.

## 🚀 Features

- Responsive design for all devices
- Gallery of tattoo designs and paintings
- Booking system
- Instagram integration

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: EJS (Embedded JavaScript)
- **Styling**: Bootstrap 5, Custom CSS
- **Security**: Helmet.js
- **Session Management**: Express-session
- **Other Key Dependencies**:
  - ejs-mate: For EJS template inheritance
  - connect-flash: For flash messages
  - method-override: For HTTP method override
  - dotenv: For environment variables

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## 🔧 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Zsirot/bellerosed.git
   ```

2. Navigate to the project directory:

   ```bash
   cd bellerosed
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add your environment variables:

   ```
   SESSION_SECRET=your_session_secret
   ```

5. Start the server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
bellerosed/
├── public/          # Static files (CSS, images, client-side JS)
├── views/           # EJS templates
├── utils/           # Utility functions and helpers
├── index.js         # Main application file
├── package.json     # Project dependencies and scripts
└── .env            # Environment variables
```

## 🔒 Security Features

- Helmet.js for security headers
- Session management with secure cookies
- Content Security Policy (CSP) implementation
- Environment variable protection

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
