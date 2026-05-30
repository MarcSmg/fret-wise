import { ChordSearchInput } from "./ChordSearchInput"

interface ChordSearchHeaderProps {
    input: string,
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onClear: () => void
} 

export const ChordSearchHeader = ({input, onInputChange, onClear}: ChordSearchHeaderProps) => {
  return (
    <section className="flex flex-col items-center px-5 mb-10">
        {/* <Heading level={2}>Search a chord</Heading> */}
        <div className=" w-full md:w-[60%] xl:w-[40%] mt-5">
            <ChordSearchInput
                type="text" 
                value = {input}
                onChange={onInputChange} 
                hasText={!!input}
                onClear={onClear}
                className="rounded-full bg-ui-surface"
            />
        </div>
    </section>
  )
}
