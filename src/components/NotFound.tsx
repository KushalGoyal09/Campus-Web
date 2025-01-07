import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { BookOpenIcon, HomeIcon } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-200">
      <div className="text-center space-y-6 p-8 bg-white rounded-lg shadow-xl max-w-md w-full">
        <BookOpenIcon className="mx-auto h-24 w-24 text-blue-500" />
        <h1 className="text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
        <p className="text-xl text-gray-600">
          Oops! Looks like this page took an unexpected study break.
        </p>
        <p className="text-gray-500">
          Don't worry, even the best students get lost sometimes.
        </p>
        <Button asChild className="mt-6">
          <Link href="/" className="inline-flex items-center">
            <HomeIcon className="mr-2 h-4 w-4" />
            Back to Campus (Homepage)
          </Link>
        </Button>
      </div>
    </div>
  )
}

