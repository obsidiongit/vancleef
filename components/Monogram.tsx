import { initialsOf } from '@/lib/standings'

export default function Monogram({
  name,
  small = false,
}: {
  name: string
  small?: boolean
}) {
  return (
    <div className={small ? 'monogram small' : 'monogram'} aria-hidden>
      {initialsOf(name)}
    </div>
  )
}
