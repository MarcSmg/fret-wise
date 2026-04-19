import { useRef, useState } from "react"
import type { RenderedDiagram as ChordDiagramLayout } from "../../../rendering/buildDiagramLayout"
import { ChordDiagram } from "./ChordDiagram"
import { ChordMenu } from "./ChordMenu"
import { ChordWrapper } from "./ChordWrapper"
import { downloadSVG } from "../utils/downloadSVG"

interface SearchResultsProps extends React.ComponentPropsWithoutRef<"div"> {
    svgs: ChordDiagramLayout[],
    notFound: boolean
}

export const ChordSearchResults = ({ svgs, notFound, ...props }: SearchResultsProps) => {

    const [openMenuId, setOpenMenuId] = useState<number | null>(null);
    const svgRefs = useRef<(SVGSVGElement | null)[]>([]);

    return (
        <div
            className={`
            grid grid-cols-2 gap-x-5 gap-y-5 p-8
            place-items-center w-full h-full 
            md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
        `}
            {...props}
        >
            {notFound ? (
                <p>Not found</p>
            ) : (
                svgs.map((svg, i) => (
                    <span className="flex flex-col gap-2"
                        key={i}
                    >
                        <ChordWrapper
                            className="scale w-full h-full [&_svg]:w-full [&_svg]:h-auto"
                        >
                            <ChordDiagram
                                ref={(el) => {
                                    svgRefs.current[i] = el
                                }}
                                diagram={svg}
                                width={svg.constraints.width}
                                height={svg.constraints.height}
                            />
                        </ChordWrapper>
                        <ChordMenu
                            isActive={openMenuId === i}
                            onOpen={() => setOpenMenuId(i)}
                            onClose={() => setOpenMenuId(null)}
                            className="ml-2"
                            onDownload={() => downloadSVG(svgRefs.current[i])}
                        />
                    </span>
                ))
            )}
        </div>
    )
}
