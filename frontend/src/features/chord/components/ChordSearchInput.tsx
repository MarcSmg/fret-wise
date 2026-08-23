import { type ComponentPropsWithRef } from "react"
import { InputSearch, Xmark } from "iconoir-react"

interface InputProps extends ComponentPropsWithRef<"input"> {
    hasText: boolean,
    onClear: () => void
}


export const ChordSearchInput = ({id, className ="", hasText, onClear,...props}: InputProps) => { 

    return (
    <div
        className={`flex relative items-center ${className}`}
    >
        <span className="absolute left-5">
            <InputSearch className="text-accent-secondary"/>
        </span>
        <input 
            type="text"
            placeholder="Search a chord... (Eg: Cm)"
            className={`w-full pl-15 px-5 py-2 font-medium border-2 border-stroke-strong rounded-2xl outline-0 outline-primary/20 shadow-md focus:outline-3 focus:bg-ui-card transition-all duration-100`}
            {...props}
        />    
        <span
            className={`${hasText ? "flex" : "hidden"} absolute items-center right-5 p-1 rounded-full bg-stroke-subtle cursor-pointer hover:bg-stroke-strong active:bg-stroke-strong/80 duration-200`}
            onClick={onClear}
        >
            <Xmark width={15} height={15} strokeWidth={2} />
        </span> 
    </div>
  )
}
