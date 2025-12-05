import {
  Button,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@core/ui/primitives'
import { Home, Layers2 } from 'lucide-react'
import Link from 'next/link'

export default function Page() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <Empty className="gap-8">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Layers2 strokeWidth={1.5} className="size-12" />
          </EmptyMedia>
          <EmptyTitle className="font-medium text-2xl">Page Not Found</EmptyTitle>
          <EmptyDescription>
            The page you are looking for does not exist or has been moved
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/">
                <Home className="size-4" />
                Go to Home
              </Link>
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    </main>
  )
}
