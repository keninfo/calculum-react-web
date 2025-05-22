import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { Pool } from 'pg'

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined, // Convert to number
})

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url) // Get query parameters
  const rawToken = searchParams.get('token') // Extract the token
  const limit = searchParams.get('limit') // Extract 'limit', undefined if not provided

  if (!rawToken) {
    return NextResponse.json({ error: 'Missing token parameter' }, { status: 400 })
  }

  // Remove the "mo" prefix and ensure lowercase
  const token = rawToken.startsWith('mo') ? rawToken.slice(2).toLowerCase() : null

  if (!token) {
    return NextResponse.json({ error: 'Invalid token format' }, { status: 400 })
  }

  // Construct the table name dynamically
  const tableName = `token_${token}usdt`

  try {
    let query: string
    let params: (string | number)[] = [] // Define the type explicitly

    // Use a dynamic query based on whether limit is specified
    if (limit) {
      query = `SELECT * FROM "token_data"."${tableName}" ORDER BY date DESC LIMIT $1`
      params = [parseInt(limit, 10)]
    } else {
      query = `SELECT * FROM "token_data"."${tableName}" ORDER BY date DESC`
    }

    const result = await pool.query(query, params)
    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('Database query error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
