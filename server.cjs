const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Database connection
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'bytetomeg',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
});

// Middleware
app.use(helmet());

// CORS configuration - support both Docker and local development
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:8080',  // Docker mode
  'http://localhost:5173',  // Vite dev server (local mode)
  'http://localhost:3000',  // Alternative dev port
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Database initialization
const initDatabase = async () => {
  try {
    // Create tables
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS guides (
        id SERIAL PRIMARY KEY,
        guide_id VARCHAR(100) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        icon VARCHAR(50) NOT NULL,
        color VARCHAR(100) NOT NULL,
        steps JSONB NOT NULL,
        details TEXT NOT NULL,
        company VARCHAR(100) NOT NULL,
        users VARCHAR(50) NOT NULL,
        published BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS blogs (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        excerpt TEXT NOT NULL,
        content TEXT NOT NULL,
        author VARCHAR(100) NOT NULL,
        date DATE NOT NULL,
        read_time VARCHAR(20) NOT NULL,
        category VARCHAR(50) NOT NULL,
        views INTEGER DEFAULT 0,
        featured BOOLEAN DEFAULT false,
        published BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        active BOOLEAN DEFAULT true
      )
    `);

    // Create default admin if not exists
    const adminExists = await pool.query('SELECT id FROM admins WHERE username = $1', ['admin']);
    if (adminExists.rows.length === 0) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await pool.query(
        'INSERT INTO admins (username, password_hash) VALUES ($1, $2)',
        ['admin', hashedPassword]
      );
      console.log('Default admin created: admin/admin123');
    }

    // Insert default guides if not exist
    const guidesExist = await pool.query('SELECT id FROM guides LIMIT 1');
    if (guidesExist.rows.length === 0) {
      const defaultGuides = [
        {
          guide_id: 'uber-ride-matching',
          title: "Uber's Ride Matching System",
          description: "How Uber matches riders with drivers in real-time across millions of requests",
          icon: "Flag",
          color: "from-teal-500 to-cyan-500",
          steps: ["Real-time Location Tracking", "Driver-Rider Matching Algorithm", "Geospatial Data Processing", "Load Balancing & Scaling", "Surge Pricing System", "Monitoring & Analytics"],
          details: "Learn how Uber handles millions of ride requests per day with sub-second matching times. Understand the challenges of real-time geospatial processing and dynamic pricing.",
          company: "Uber",
          users: "100M+",
          published: true
        },
        {
          guide_id: 'netflix-streaming',
          title: "Netflix's Global Streaming Platform",
          description: "How Netflix delivers content to 200+ million users worldwide with minimal latency",
          icon: "BarChart3",
          color: "from-cyan-500 to-blue-500",
          steps: ["Content Delivery Network (CDN)", "Microservices Architecture", "Data Pipeline & Analytics", "Personalization Engine", "Global Load Balancing", "Fault Tolerance & Recovery"],
          details: "Discover how Netflix built a global streaming platform that serves petabytes of content daily. Learn about CDN optimization, microservices, and personalization at scale.",
          company: "Netflix",
          users: "200M+",
          published: true
        }
      ];

      for (const guide of defaultGuides) {
        await pool.query(
          `INSERT INTO guides (guide_id, title, description, icon, color, steps, details, company, users, published) 
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
          [guide.guide_id, guide.title, guide.description, guide.icon, guide.color, 
           JSON.stringify(guide.steps), guide.details, guide.company, guide.users, guide.published]
        );
      }
      console.log('Default guides inserted');
    }

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
  }
};

// Routes

// Auth routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const result = await pool.query('SELECT * FROM admins WHERE username = $1', [username]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const admin = result.rows[0];
    const validPassword = await bcrypt.compare(password, admin.password_hash);
    
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({ token, user: { id: admin.id, username: admin.username } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Guides routes
app.get('/api/guides', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM guides WHERE published = true ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Get guides error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/guides/:guideId', async (req, res) => {
  try {
    const { guideId } = req.params;
    const result = await pool.query('SELECT * FROM guides WHERE guide_id = $1 AND published = true', [guideId]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Guide not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get guide error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Admin routes
app.get('/api/admin/guides', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM guides ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Get admin guides error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/admin/guides', authenticateToken, async (req, res) => {
  try {
    const { guide_id, title, description, icon, color, steps, details, company, users, published } = req.body;
    
    const result = await pool.query(
      `INSERT INTO guides (guide_id, title, description, icon, color, steps, details, company, users, published) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
       RETURNING *`,
      [guide_id, title, description, icon, color, JSON.stringify(steps), details, company, users, published]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create guide error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/admin/guides/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, icon, color, steps, details, company, users, published } = req.body;
    
    const result = await pool.query(
      `UPDATE guides SET title = $1, description = $2, icon = $3, color = $4, steps = $5, 
       details = $6, company = $7, users = $8, published = $9, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $10 RETURNING *`,
      [title, description, icon, color, JSON.stringify(steps), details, company, users, published, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Guide not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update guide error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/admin/guides/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM guides WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Guide not found' });
    }
    
    res.json({ message: 'Guide deleted successfully' });
  } catch (error) {
    console.error('Delete guide error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Blogs routes
app.get('/api/blogs', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM blogs WHERE published = true ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Get blogs error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/admin/blogs', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM blogs ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Get admin blogs error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/admin/blogs', authenticateToken, async (req, res) => {
  try {
    const { title, excerpt, content, author, date, read_time, category, views, featured, published } = req.body;
    
    const result = await pool.query(
      `INSERT INTO blogs (title, excerpt, content, author, date, read_time, category, views, featured, published) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
       RETURNING *`,
      [title, excerpt, content, author, date, read_time, category, views || 0, featured, published]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create blog error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Newsletter subscription
app.post('/api/newsletter/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Check if email already exists
    const existing = await pool.query('SELECT id FROM newsletter_subscribers WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'Email already subscribed' });
    }
    
    await pool.query('INSERT INTO newsletter_subscribers (email) VALUES ($1)', [email]);
    res.status(201).json({ message: 'Successfully subscribed to newsletter' });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Initialize database and start server
initDatabase().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log('='.repeat(60));
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📦 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🗄️  Database: ${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 5432}`);
    console.log(`🌐 CORS Allowed Origins:`);
    allowedOrigins.forEach(origin => console.log(`   - ${origin}`));
    console.log(`🔑 Admin Credentials: admin / admin123`);
    console.log('='.repeat(60));
  });
}).catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

module.exports = app;
