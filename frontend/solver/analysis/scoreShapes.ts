import { Shape } from "../../domain/geometry/Shape";

export function scoreShapes(
    shapes: Shape[]
): Shape[] {

    const scored: Shape[] = shapes.map<Shape>( s => {
        
        s.score = 
        - s.span() 
        - s.averageFret() 
        - s.mutedStringsCount() * 0.5;

        return s;
    })

    return scored;
}