import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { STAGING_PASSWORD } from '@/utils/constants'

const PASSWORD = STAGING_PASSWORD

export function middleware(req: NextRequest) {
  const hostname = req.headers.get('host')
  const isStaging = hostname?.includes('staging-app.smoothcoin.io') || hostname?.includes('staging-app.hodlProtocol.io')

  if (isStaging) {
    const cookie = req.cookies.get('password')?.value

    if (cookie === PASSWORD) {
      return NextResponse.next()
    }

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
            window.location.href = 'https://app.hodlProtocol.io'; // Redirect if wrong password
          } else {
            document.cookie = 'password=${PASSWORD}; path=/'; // Set a cookie if correct
            window.location.reload(); // Reload the page to allow access
          }
        </script>
      </body>
      </html>
    `

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next|favicon.ico).*)'],
}
