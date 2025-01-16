import { list } from '@vercel/blob'

export async function GET(request: Request) {
  try {
    // Get the token from the query string
    const url = new URL(request.url)
    const token = url.searchParams.get('token') // Retrieve the token (e.g., BTC, ETH, etc.)

    if (!token) {
      return new Response(JSON.stringify({ error: 'Token is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Fetch the blobs
    const { blobs } = await list()

    // Filter blobs that contain the token in their pathname
    const filteredBlobs = blobs.filter((blob) => blob.pathname.includes(`${token}USDT.csv`))

    if (filteredBlobs.length === 0) {
      return new Response(JSON.stringify({ error: `No CSV file found for ${token}USDT` }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Return the filtered blobs
    return Response.json(filteredBlobs)
  } catch (error) {
    console.error('Error fetching blobs:', error)
    return new Response(JSON.stringify({ error: 'Failed to fetch blobs' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
