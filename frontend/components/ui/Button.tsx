import { memo } from "react"
import Loading from "./Loading"

interface buttonProps {
    children?: React.ReactNode,
    variant?: 'primary'|'secondary'|'transparent'|'tertiory'|'error',
    size?: 'sm'|'md'|'lg'
    width?: 'sm'|'md'|'lg'|'max'
    icon?: React.ReactNode,
    isLoading?: boolean,
    className?: string,
    disabled?: boolean,
    onClick?: ()=> void
}

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    width = 'lg',
    isLoading = false,
    icon,
    className = '',
    disabled = false,
    onClick
}:buttonProps)=>{
    return (

            <button 

                onClick={onClick}
                disabled={isLoading || disabled} 
                className={`
                    ${variant === 'primary' ? 'bg-neutral-700 hover:bg-neutral-600 hover:shadow-md' :
                      variant === 'secondary'? 'bg-blue-500 hover:bg-blue-600 hover:shadow-md':
                      variant === 'tertiory'? 'bg-green-500 hover:bg-green-600 hover:shadow-md':
                      variant === 'transparent'?'bg-transparent hover:bg-gray-200': 'bg-transparent hover:bg-gray-200'}
                    ${size === 'sm' ? 'px-2 py-1' : size === 'md' ? 'px-4 py-2' : 'px-6 py-3'}
                    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                    ${width === 'sm' ? 'w-1/6': width === 'md' ? 'w-1/3' : width === 'lg' ? 'w-1/2': 'w-full'}
                    transition-all duration-300 rounded-md ${className} shadow-md
                    ${variant === 'transparent' ? 'text-neutral-700' : variant === 'error'? 'text-error' :'text-white'}
                    justify-center items-center flex gap-2
                    `}>
                    {icon}
                    {isLoading? <Loading text="processing..."/> : children && <span>{children}</span>}
            </button>
        );
}

export default memo(Button);