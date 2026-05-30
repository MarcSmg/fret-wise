import type { ComponentPropsWithRef } from "react"

interface ChordWrapperProps extends ComponentPropsWithRef<"div"> {

}
export const ChordWrapper = ({ children, className, ...props }: ChordWrapperProps) => {
    return (
        <div 
            {...props}
            className={`
            ${className}
        `} >
            <div
                className={`flex justify-center items-center h-full w-full bg-white rounded-2xl overflow-hidden`}
            >
                {children}
            </div>
        </div>
    )
}
