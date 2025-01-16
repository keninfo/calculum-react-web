import { put } from '@vercel/blob'

import { NextResponse } from 'next/server'

import * as xlsx from 'xlsx'

export async function GET(req: Request) {
  const allowedToken = process.env.INTERNAL_API_TOKEN
  const incomingToken = req.headers.get('x-internal-api-token')
  const vercelIpHeader = req.headers.get('x-vercel-ip-country')

  if (!allowedToken || incomingToken !== allowedToken) {
    if (!vercelIpHeader) {
      return NextResponse.json({ success: false, error: 'Unauthorized access' }, { status: 401 })
    }
  }

  const url = process.env.XLSX_FILE_URL
  if (!url) {
    return NextResponse.json({ error: 'XLSX_FILE_URL is not defined' }, { status: 500 })
  }

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch XLSX file: ${response.statusText}`)
    }

    const buffer = await response.arrayBuffer()
    const workbook = xlsx.read(buffer, { type: 'buffer' })

    const uploadPromises = workbook.SheetNames.map(async (sheetName) => {
      const sheet = workbook.Sheets[sheetName]
      const csv = xlsx.utils.sheet_to_csv(sheet)

      if (!csv.trim()) {
        console.warn(`Skipping empty sheet: ${sheetName}`)
        return null
      }

      const fileName = `csv/${sheetName}.csv`
      const { url } = await put(fileName, csv, { access: 'public' })

      console.log(`Uploaded sheet: ${sheetName} to ${url}`)
      return { sheetName, url }
    })

    const uploadedFiles = (await Promise.all(uploadPromises)).filter(Boolean)

    return NextResponse.json({ success: true, files: uploadedFiles }, { status: 201 })
  } catch (error) {
    console.error(`Error processing XLSX file:`, error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unknown error occurred' },
      { status: 500 },
    )
  }
}
