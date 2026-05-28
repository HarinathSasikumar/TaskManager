import clsx from 'clsx'

export default function SkeletonLoader({ className, ...props }) {
  return (
    <div
      className={clsx('skeleton animate-pulse', className)}
      {...props}
    />
  )
}
