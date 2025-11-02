const db = require('../../../lib/db');
const { generateToken, hashPassword } = require('../../../lib/auth');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }

    // Check if user exists
    const existingUser = await db.query(
      'SELECT id FROM users WHERE email = $1',
      [email.toLowerCase()]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const userResult = await db.query(
      'INSERT INTO users (name, email, password, subscription_tier) VALUES ($1, $2, $3, $4) RETURNING id, name, email, subscription_tier',
      [name, email.toLowerCase(), hashedPassword, 'free']
    );

    const user = userResult.rows[0];

    // Generate token
    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
      subscriptionTier: user.subscription_tier
    });

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        subscriptionTier: user.subscription_tier
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
