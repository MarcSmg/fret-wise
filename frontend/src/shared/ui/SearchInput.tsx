import { useRef, type ComponentPropsWithRef } from "react"

interface InputProps extends ComponentPropsWithRef<"input"> {

}


export const SearchInput = ({id, className ="", ...props}: InputProps) => {  

    const input = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        input.current?.focus();
    }

    return (<div
        className={` p-3 border rounded-full ${className}`}
        onClick={handleClick}
    >
        <input 
            ref={input}
            type="text"
            className="outline-0"
            {...props}
        />     
        
    </div>

  )
}
