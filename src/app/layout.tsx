import './globals.css'
import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'

// Load fonts
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter', 
  display: 'swap' 
})

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Watermelon Empire',
  description: 'Build your watermelon business from scratch to global domination',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} font-sans`}>
        {children}
      </body>
    </html>
  )
}