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
  const timestampFilePath = path.join(process.cwd(), 'public', 'last_run_timestamp.txt')
  const outputDir = path.join(process.cwd(), 'public', 'csv')

  // Check if CSV directory exists and contains files
  let csvFilesExist = false
  try {
    if (fs.existsSync(outputDir)) {
      const csvFiles = fs.readdirSync(outputDir).filter((file) => file.endsWith('.csv'))
      csvFilesExist = csvFiles.length > 0
    }
  } catch (error) {
    console.error('Error checking CSV files:', error)
  }

  // Check if the process was already run today
  const currentDate = new Date().toISOString().split('T')[0] // Format as yyyy-mm-dd
  let lastRunDate: string | null = null

  // Try to read the timestamp file
  try {
    if (fs.existsSync(timestampFilePath)) {
      lastRunDate = fs.readFileSync(timestampFilePath, 'utf-8')
    }
  } catch (error) {
    console.error('Error reading timestamp file:', error)
  }

  // If CSV files already exist and last run was today, return early
  if (csvFilesExist && lastRunDate === currentDate) {
    return { success: true, message: 'CSV files were already generated today.' }
  }

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

  // Store the current date in the timestamp file
  try {
    fs.writeFileSync(timestampFilePath, currentDate, 'utf-8')
  } catch (error) {
    console.error('Error writing timestamp file:', error)
  }

  return { success: true, message: 'CSV files generated successfully.' }
}

// API handler
export async function GET() {
  try {
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
    // Fallback for unknown error types
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
