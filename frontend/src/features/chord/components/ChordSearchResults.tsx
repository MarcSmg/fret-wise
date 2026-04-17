import type { RenderedDiagram as ChordDiagramLayout } from "../../../rendering/buildDiagramLayout"
import { ChordDiagram } from "./ChordDiagram"

interface SearchResultsProps extends React.ComponentPropsWithoutRef<"div"> {
    svgs: ChordDiagramLayout[],
    notFound: boolean
}

export const ChordSearchResults = ({svgs, notFound, ...props}: SearchResultsProps) => {
    
  return (
    <div
        className={`
            grid grid-cols-2 gap-2 p-2
            place-items-center size-2 w-full h-full 
            md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
        `}
        {...props}
    >
        {notFound ?(
                <p>Not found</p>
            ) : (                 
                    svgs.map((svg, i) => (  
                        <span 
                            key={i} 
                            className="scale w-full h-full [&_svg]:w-full [&_svg]:h-auto"
                            >
                            <ChordDiagram 
                                diagram={svg} 
                                width={svg.constraints.width}
                                height={svg.constraints.height}
                            />
                        </span>
                    ))       
                )}
        </div>
  )
}
