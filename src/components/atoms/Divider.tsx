type DividerProps = {
  text?: string
}

export default function Divider({ text = 'O' }: DividerProps) {
  return (
    <div className="flex items-center my-2">
      <hr className="flex-grow-1 text-gray-300" />
      <span className="mx-2 text-2 text-muted">{text}</span>
      <hr className="flex-grow-1 text-gray-300" />
    </div>
  )
}
