import { NextResponse } from 'next/server'

import fs from 'fs'
import path from 'path'
import * as xlsx from 'xlsx'

// Function to fetch and convert the XLSX file into CSV files
async function fetchAndConvertXlsx() {
  const url = process.env.XLSX_FILE_URL // The XLSX file URL from environment variables

  if (!url) {
    throw new Error('XLSX_FILE_URL is not defined in the environment variables.')
  }

  // Paths and directories
  const outputDir = path.join(process.cwd(), 'public', 'csv')

  // Fetch the XLSX file
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch XLSX file: ${response.statusText}`)
  }

  const buffer = await response.arrayBuffer()

  // Parse the XLSX file
  const workbook = xlsx.read(buffer, { type: 'buffer' })

  // Ensure the output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  // Convert each sheet to a CSV file
  workbook.SheetNames.forEach((sheetName) => {
    const sheet = workbook.Sheets[sheetName]
    const csv = xlsx.utils.sheet_to_csv(sheet)
    const filePath = path.join(outputDir, `${sheetName}.csv`)
    try {
      fs.writeFileSync(filePath, csv, 'utf-8')
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to write CSV file for sheet ${sheetName}: ${error.message}`)
      } else {
        throw new Error(`Failed to write CSV file for sheet ${sheetName}: Unknown error`)
      }
    }
  })

  return { success: true, message: 'CSV files generated successfully.' }
}

// API handler
export async function GET(req: Request) {
  try {
    // Restrict access based on environment variable or Vercel IP
    const allowedToken = process.env.INTERNAL_API_TOKEN // Set a token in the environment variables
    const incomingToken = req.headers.get('x-internal-api-token')
    const vercelIpHeader = req.headers.get('x-vercel-ip-country') // Vercel-specific header

    // Check if the token matches or the request is coming from Vercel
    if (!allowedToken || incomingToken !== allowedToken) {
      if (!vercelIpHeader) {
        return NextResponse.json({ success: false, error: 'Unauthorized access' }, { status: 401 })
      }
    }

    // Process the XLSX file
    const result = await fetchAndConvertXlsx()
    return NextResponse.json(result, {
      headers: {
        'Cache-Control': 'no-store', // Disable caching
      },
    })
  } catch (error: unknown) {
    // Handle the error safely by checking if it's an instance of Error
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message },
        {
          headers: {
            'Cache-Control': 'no-store',
          },
        },
      )
    }
    return NextResponse.json(
      { success: false, error: 'An unknown error occurred' },
      {
        headers: {
          'Cache-Control': 'no-store',
        },
      },
    )
  }
}
