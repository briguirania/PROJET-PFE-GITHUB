import { ReactElement } from 'react'
import './_index.scss'
interface ICardSkewProps {
  children?: ReactElement | ReactElement[]
  color?: 'red-yellow' | 'pink-blue' | 'green-blue'
  autoColors?: number
  className?: string
}
export default function CardSkew({ children, color , autoColors, className }: ICardSkewProps) {
  const generateColor = (index: number) => {
    const colors = ['red-yellow', 'pink-blue', 'green-blue']
    const colorsIndex = (index - 1) % colors.length
    return colors[colorsIndex]
  }
  const currentColor = color || (autoColors ? generateColor(autoColors) : 'red-yellow')
  return (
    <div className={`wrapper ${className}`}>
      <div className={`box box__${currentColor}`}>
        <span></span>
        <div className="content">{children}</div>
      </div>
    </div>
  )
}
