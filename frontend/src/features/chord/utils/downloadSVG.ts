
export function downloadSVG(svg: SVGSVGElement | null) {
    console.log("Download");
    if (!svg) return;

    const serializer = new XMLSerializer();

    let source = serializer.serializeToString(svg);
    if (!source.includes("xmlns")) {
    source = source.replace(
        "<svg",
        '<svg xmlns="http://www.w3.org/2000/svg"'
    );
}

    const url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);

    const link = document.createElement("a");
    link.href = url;
    link.rel = "noopener";
    link.target = "_blank";
    link.download = "chord.svg";
    link.click();

    URL.revokeObjectURL(url);
}