import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    // Define the path to your CSV file in the 'public' folder
    const filePath = path.resolve(process.cwd(), 'public', 'data.csv')

    // Read the file from the public folder
    const file = fs.readFileSync(filePath, 'utf-8')

    // Just a placeholder to show the file content for now
    return new Response(file, {
      headers: { 'Content-Type': 'text/plain' },
    })
  } catch (error) {
    return new Response('Error processing file', { status: 500 })
  }
}
