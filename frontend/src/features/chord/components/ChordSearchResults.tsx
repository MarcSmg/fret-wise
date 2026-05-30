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

    const handleRightClick = (e: React.MouseEvent, id: number) => {
        e.preventDefault();
        // if (e.button !== 2) return; // Ensure it's a right-click
        setOpenMenuId(prev => (prev === id ? null : id));
    }

    return (
        <div
            className={`grid grid-cols-2 gap-x-3 gap-y-2 px-5 place-items-center w-full h-full md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 md:gap-x-10 md:px-50 md:gap-y-4`}
            {...props}
        >
            {notFound ? (
                <p>Not found</p>
            ) : (
                svgs.map((svg, i) => (
                    <span className="flex flex-col gap-2 w-full h-full"
                        key={i}
                    >
                        <ChordWrapper
                            className="scale w-full h-full [&_svg]:w-full [&_svg]:h-full cursor-pointer"
                            onContextMenu={(e) => handleRightClick(e, i)}
                            >
                            <ChordDiagram
                                ref={(el) => {
                                    svgRefs.current[i] = el
                                }}
                                diagram={svg}
                                />
                        </ChordWrapper>
                        <ChordMenu
                            isActive={openMenuId === i}
                            onOpen={() => setOpenMenuId(i)}
                            onClose={() => setOpenMenuId(null)}
                            className="self-end mr-2"
                            onDownload={() => downloadSVG(svgRefs.current[i])}
                        />
                    </span>
                ))
            )}
        </div>
    )
}
