import { ButtonHTMLAttributes } from 'react'

import '../styles/button.scss'

type ButtomProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
}

export function Button({ isOutlined = false, ...props }: ButtomProps) {
  return (
    <button className={`button ${isOutlined ? 'outlined': ''}`} {...props}/> 
  )
}