import { del, list } from '@vercel/blob'

import { NextResponse } from 'next/server'

/**
 * Deletes all files in the 'csv/' folder in Vercel Blob storage.
 * Requires a valid authorization token passed in the request headers.
 */
export async function DELETE(req: Request) {
  const allowedToken = process.env.INTERNAL_API_TOKEN // Set a token in the environment variables
  const incomingToken = req.headers.get('x-internal-api-token')
  const vercelIpHeader = req.headers.get('x-vercel-ip-country') // Vercel-specific header

  // Check if the token matches or the request is coming from Vercel
  if (!allowedToken || incomingToken !== allowedToken) {
    if (!vercelIpHeader) {
      return NextResponse.json({ success: false, error: 'Unauthorized access' }, { status: 401 })
    }
  }

  try {
    // List all blobs in the 'csv/' folder
    const { blobs } = await list({ prefix: 'csv/' })
    console.log('Blobs found:', blobs) // Log the blobs found in the 'csv/' folder

    if (blobs.length === 0) {
      return NextResponse.json({ message: 'No files found in the csv folder to delete.' })
    }

    // Delete each blob using its URL
    const deletePromises = blobs.map(async (blob) => {
      console.log('Deleting blob:', blob.url) // Log each URL being deleted

      try {
        await del(blob.url)
        console.log('Delete successful for', blob.url)
      } catch (delError) {
        console.error('Error during deletion of', blob.url, delError)
      }
    })

    // Wait for all deletions to complete
    await Promise.all(deletePromises)

    return NextResponse.json({ success: true, message: 'Deleted all files in the csv folder.' })
  } catch (error) {
    console.error('Error during blob listing or deletion:', error)
    return NextResponse.json(
      { success: false, error: `Error deleting files: ${(error as Error).message}` },
      { status: 500 },
    )
  }
}
