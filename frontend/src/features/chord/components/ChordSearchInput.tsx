import { type ComponentPropsWithRef } from "react"
import { Xmark } from "iconoir-react"

interface InputProps extends ComponentPropsWithRef<"input"> {
    hasText: boolean,
    onClear: () => void
}


export const ChordSearchInput = ({id, className ="", hasText, onClear,...props}: InputProps) => { 

    return (
    <div
        className={`flex relative items-center ${className}`}
    >
        
        <input 
            type="text"
            placeholder="Search a chord... (Eg: Cm)"
            className={`w-full px-5 py-2 border-2 border-stroke-strong rounded-full outline-0 outline-primary/20 shadow-md focus:outline-3 focus:bg-ui-card transition-all duration-100`}
            {...props}
        />    
        <span
            className={`${hasText ? "flex" : "hidden"} absolute items-center right-5 p-1 rounded-full bg-stroke-subtle cursor-pointer hover:bg-stroke-strong active:bg-stroke-strong/80 duration-200`}
            onClick={onClear}
        >
            <Xmark />
        </span> 
    </div>
  )
}
