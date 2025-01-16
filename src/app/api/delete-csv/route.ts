import { del, list } from '@vercel/blob'

import { NextResponse } from 'next/server'

type Blob = {
  pathname: string
  uploadedAt: Date
  url: string
  // Add other properties as needed
}

export async function DELETE(req: Request) {
  const allowedToken = process.env.INTERNAL_API_TOKEN
  const incomingToken = req.headers.get('x-internal-api-token')

  if (allowedToken !== incomingToken) {
    return NextResponse.json({ success: false, error: 'Unauthorized access' }, { status: 401 })
  }

  return await handleDeleteCsv()
}

export async function GET(req: Request) {
  // For Vercel cron job compatibility, use GET instead of DELETE
  const cronHeader = req.headers.get('x-vercel-cron') // Vercel-specific header
  if (!cronHeader) {
    return NextResponse.json({ success: false, error: 'Method Not Allowed' }, { status: 405 })
  }

  return await handleDeleteCsv()
}

async function handleDeleteCsv() {
  try {
    const { blobs } = await list({ prefix: 'csv/' })
    if (!blobs || blobs.length === 0) {
      return NextResponse.json({ success: true, message: 'No files to delete.' })
    }

    const blobsByName = blobs.reduce(
      (acc, blob: Blob) => {
        const fileName = blob.pathname.split('/').pop() || 'unknown'
        if (!acc[fileName]) acc[fileName] = []
        acc[fileName].push(blob)
        return acc
      },
      {} as Record<string, Blob[]>,
    )

    const deletePromises = Object.values(blobsByName).flatMap((group) => {
      if (group.length > 1) {
        const sortedGroup = group.sort((a, b) => new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime())
        const olderBlob = sortedGroup[0]
        return del(olderBlob.url)
      }
      return []
    })

    await Promise.all(deletePromises)
    return NextResponse.json({ success: true, message: 'Deleted older duplicate files.' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, error: `Error: ${(error as Error).message}` }, { status: 500 })
  }
}
