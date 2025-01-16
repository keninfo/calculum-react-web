import { put } from '@vercel/blob'

import { NextResponse } from 'next/server'

import * as xlsx from 'xlsx'

export async function GET() {
  const url = process.env.XLSX_FILE_URL

  if (!url) {
    return NextResponse.json({ error: 'XLSX_FILE_URL is not defined' }, { status: 500 })
  }

  try {
    // Fetch the XLSX file
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch XLSX file: ${response.statusText}`)
    }

    const buffer = await response.arrayBuffer()
    const workbook = xlsx.read(buffer, { type: 'buffer' })

    // Process each sheet and upload to Vercel Blob
    const uploadPromises = workbook.SheetNames.map(async (sheetName) => {
      const sheet = workbook.Sheets[sheetName]
      const csv = xlsx.utils.sheet_to_csv(sheet)
      const fileName = `csv/${sheetName}.csv`

      // Upload CSV to Vercel Blob
      const { url } = await put(fileName, csv, {
        access: 'public',
        contentType: 'text/csv',
      })

      return { sheetName, url }
    })

    const uploadedFiles = await Promise.all(uploadPromises)

    return NextResponse.json({ success: true, files: uploadedFiles })
  } catch (error) {
    // Safely narrow the error type
    if (error instanceof Error) {
      return NextResponse.json({ error: `Error processing file: ${error.message}` }, { status: 500 })
    }
    // Fallback for non-Error types
    return NextResponse.json({ error: 'An unknown error occurred.' }, { status: 500 })
  }
}
