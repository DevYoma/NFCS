import { ReactNode } from "react"

export type ButtonProp = {
    children: ReactNode;
    type?: 'submit' | 'reset' | 'button'
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    fit?: boolean
    weight?: 'thick' | 'thicker'
    outlined?: boolean
    foreground?: string
    background?: string
    onClick?: VoidFunction
    loading?: boolean
    disabled?: boolean
}