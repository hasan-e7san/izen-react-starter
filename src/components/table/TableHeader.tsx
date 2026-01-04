import { cn } from "../../lib/utils"

export type TableHeaderProps = {
  headers: string[]
  withActions?: boolean
  className?: string
}

export function TableHeader({ headers, withActions = true, className }: TableHeaderProps) {
  return (
    <thead className={cn('bg-sidebar', className)}>
      <tr className="bg-gray-2 text-center">
        {headers.map((header) => (
          <th key={header} className="py-4 px-0 text-center font-semibold text-black">
            {header}
          </th>
        ))}
        {withActions && <th className="py-4 px-4 text-center font-semibold text-black">Actions</th>}
      </tr>
    </thead>
  )
}
