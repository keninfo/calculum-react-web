import { NextResponse } from 'next/server'

import * as d3 from 'd3'
import fs from 'fs'
import path from 'path'

export async function GET(req: Request) {
  // Get the token from the query string (e.g., ?token=BTC)
  const { searchParams } = new URL(req.url)
  const token = searchParams.get('token')

  if (!token) {
    return NextResponse.json({ error: 'Token parameter is required' }, { status: 400 })
  }

  // Build the file path dynamically based on the token
  const filePath = path.resolve(
    './public/csv', // Adjust based on where your CSV files are stored
    `${token}USDT.csv`,
  )

  try {
    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: `File for token ${token} not found` }, { status: 404 })
    }

    // Read the CSV file
    const fileContent = fs.readFileSync(filePath, 'utf-8')

    // Parse the CSV content using D3
    const parsedData = d3.csvParse(fileContent)

    // Return the parsed data as JSON
    return NextResponse.json(parsedData)
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: `Error reading or parsing file: ${error.message}` }, { status: 500 })
    }
    return NextResponse.json({ error: 'An unknown error occurred while reading or parsing the file' }, { status: 500 })
  }
}
