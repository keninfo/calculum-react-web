import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { STAGING_PASSWORD } from '@/utils/constants'

const PASSWORD = STAGING_PASSWORD

export function middleware(req: NextRequest) {
  const hostname = req.headers.get('host')
  const isStaging = hostname?.includes('staging-app.smoothcoin.io')

  if (isStaging) {
    // Get the password cookie if it exists
    const cookie = req.cookies.get('password')?.value

    // If the cookie exists and matches the password, allow access
    if (cookie === PASSWORD) {
      return NextResponse.next()
    }

    // If no valid cookie, create a new HTML response with the password prompt
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Protected</title>
      </head>
      <body>
        <script>
          if (prompt('Enter the password:') !== '${PASSWORD}') {
            window.location.href = 'https://app.smoothcoin.io'; // Redirect if wrong password
          } else {
            document.cookie = 'password=${PASSWORD}; path=/'; // Set a cookie if correct
            window.location.reload(); // Reload the page to allow access
          }
        </script>
      </body>
      </html>
    `

    // Return the custom HTML response with the password prompt
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
      },
    })
  }

  // Allow access to all other requests (e.g., production environment)
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next|favicon.ico).*)'], // Match all routes except API and Next.js internals
}
