import { ChordSearchInput } from "./ChordSearchInput"

interface ChordSearchHeaderProps {
    input: string,
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onClear: () => void
} 

export const ChordSearchHeader = ({input, onInputChange, onClear}: ChordSearchHeaderProps) => {
  return (
    <section className="flex flex-col px-5">
        {/* <Heading level={2}>Search a chord</Heading> */}
        <div>
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
