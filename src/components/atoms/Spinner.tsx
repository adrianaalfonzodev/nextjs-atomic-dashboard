'use client'

import { PuffLoader } from 'react-spinners'

type SpinnerProps = {
  color?: string
  size?: number
}

export default function Spinner({ color = '#3b82f6', size = 80 }: SpinnerProps) {
  return (
    <div className="flex justify-center items-center h-screen">
      <PuffLoader color={color} size={size} />
    </div>
  )
}
