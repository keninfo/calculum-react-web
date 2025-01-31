import { NextResponse, type NextRequest } from 'next/server'

import { Pool } from 'pg'

// Set up PostgreSQL connection (using environment variables for security)
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
})

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url) // Get query parameters
  const userId = searchParams.get('userId') // Extract userId parameter
  const response = searchParams.get('response') // Extract response parameter

  if (!userId || !response) {
    return NextResponse.json({ error: 'Missing userId or response parameter' }, { status: 400 })
  }

  try {
    // Use parameterized query to avoid SQL injection
    await pool.query(
      'INSERT INTO user_responses (user_id, response) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET response = $2',
      [userId, response],
    )

    return NextResponse.json({ message: 'Response saved successfully' })
  } catch (error) {
    console.error('Database query error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
