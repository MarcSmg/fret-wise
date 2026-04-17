interface SearchResultsProps extends React.ComponentPropsWithoutRef<"div"> {
    svgs: string[],
    notFound: boolean
}

export const ChordSearchResults = ({svgs, notFound, ...props}: SearchResultsProps) => {
  return (
    <div
        className="grid grid-cols-3 items-center"
        {...props}
    >
        {notFound ?(
                <p>Not found</p>
            ) : (
                svgs.map((svg, i) => (
                    <div
                    key={i}
                    style={{ marginBottom: "20px" }}
                    dangerouslySetInnerHTML={{ __html: svg }}
                    />
                ))             
            )}
    </div>
  )
}
