import type { ComponentPropsWithRef } from "react"

interface ChordWrapperProps extends ComponentPropsWithRef<"div"> {

}
export const ChordWrapper = ({ children, className }: ChordWrapperProps) => {
    return (
        <div className={`
        ${className}
    ]    `} >
            <div
                className={`
                    bg-ui-surface
                    rounded-2xl overflow-hidden    
                `}
            >
                {children}
            </div>
        </div>
    )
}
