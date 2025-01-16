import { del, list } from '@vercel/blob'

import { NextResponse } from 'next/server'

/**
 * Deletes only the older duplicate file in the 'csv/' folder in Vercel Blob storage.
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

    if (!blobs || blobs.length === 0) {
      return NextResponse.json({ message: 'No files found in the csv folder to delete.' })
    }

    // Define the Blob type for clarity
    type Blob = {
      pathname: string
      uploadedAt: Date
      url: string
      // Add other properties as needed
    }

    // Group blobs by file name (without the full path) to identify duplicates
    const blobsByName = blobs.reduce(
      (acc, blob) => {
        const fileName = blob.pathname.split('/').pop() || 'unknown' // Ensure a fallback in case fileName is undefined
        if (!acc[fileName]) {
          acc[fileName] = []
        }
        acc[fileName].push(blob)
        return acc
      },
      {} as Record<string, Blob[]>, // Use the Blob type here
    )

    // Identify and delete only the older file in each group of duplicates
    const deletePromises = Object.values(blobsByName).flatMap((group) => {
      if (group.length > 1) {
        // Sort blobs by uploadedAt (oldest first)
        const sortedGroup = group.sort((a, b) => {
          if (a.uploadedAt && b.uploadedAt) {
            return a.uploadedAt.getTime() - b.uploadedAt.getTime() // Oldest first
          }
          return 0 // In case uploadedAt is missing, no sorting
        })

        // Always delete the first item, as it's the oldest one
        const olderBlob = sortedGroup[0]
        console.log('Deleting older blob:', olderBlob.url)

        return del(olderBlob.url).catch((delError) => {
          console.error('Error during deletion of', olderBlob.url, delError)
        })
      }
      return [] // No duplicates to delete
    })

    // Wait for all deletions to complete
    await Promise.all(deletePromises)

    return NextResponse.json({ success: true, message: 'Deleted older duplicate files in the csv folder.' })
  } catch (error) {
    console.error('Error during blob listing or deletion:', error)
    return NextResponse.json(
      { success: false, error: `Error deleting files: ${(error as Error).message}` },
      { status: 500 },
    )
  }
}
