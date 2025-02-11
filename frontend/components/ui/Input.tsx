import { memo } from "react"


interface inputProps{
    size?: 'sm'| 'md' | 'lg',
    width?: 'sm'| 'md'| 'lg'| 'full',
    rounded?: 'sm'| 'md'| 'lg'| 'none',
    id: string,
    name?: string,
    type?: string,
    value?: string,
    autoComplete?: string,
    className?: string,
    error?: boolean,
    placeholder?: string,
    required?: boolean,
    onChange?: (e:React.ChangeEvent<HTMLInputElement>) => void,
}

const Input = ({
    size= 'md',
    width= 'md',
    rounded= 'md',
    id,
    name,
    type,
    value,
    autoComplete = '',
    error = false,
    placeholder = '',
    required = false,
    className,
    onChange
} : inputProps) =>{
    return <input
                placeholder={placeholder}
                type={type}
                id={id}
                name={name}
                value={value}
                required={required === true}
                onChange={onChange}
                autoComplete={autoComplete}
                className={`
                    ${size === 'sm' ? 'px-2 py-1': size === 'md'? 'px-4 py-2': 'px-6 py-3'}
                    ${width === 'sm'? 'w-1/5': width === 'md'? 'w-1/3': width === 'lg'? 'w-1/2':'w-full'}
                    ${rounded === 'sm'? 'rounded-sm': rounded === 'md'? 'rounded-md': rounded === 'lg'? 'rounded-lg': 'rounded-none' }
                    ${error ? 'border-error': 'border-gray-300 '} ${className} text-black border
                    `} />

}

export default memo(Input)