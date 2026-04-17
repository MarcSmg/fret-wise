import { SearchInput } from "../../../shared/ui/SearchInput"

interface ChordSearchHeaderProps {
    input: string,
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
} 

export const ChordSearchHeader = ({input, onInputChange}: ChordSearchHeaderProps) => {
  return (
    <section className="flex flex-col gap-5">
        <h1>Search a Chord</h1>
        <div>
            <SearchInput
                type="text" 
                value = {input}
                onChange={onInputChange} 
            />
        </div>
    </section>
  )
}
