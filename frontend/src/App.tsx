import { useState } from 'react'
import './App.css'
import { parseChordSymbol } from './application/notation/parseChordSymbol';
import { Fretboard } from './domain/geometry/Fretboard';
import { shapeToDiagram } from './application/diagram/shapeToDiagram';
import { renderDiagram } from './rendering/renderDiagram';
import { findChordShapes } from './application/solver/generation/findChordShapes';

function App() {
  
  const [input, setInput] = useState("C");
  const [svgs, setSvgs] = useState<string[]>([]);
  const fretboard = new Fretboard(21);

  const handleGenerate = () => {
    const {value: chord,} = parseChordSymbol(input);

    const shapes = findChordShapes(chord, fretboard);

    const diagrams = shapes.map(shape => {
      const diagram = shapeToDiagram(shape);
      return renderDiagram(diagram, input);
    });

    console.log(diagrams);

    setSvgs(diagrams);
  }

  return (
    <>
      <div>
        <input 
          type="text" 
          value = {input}
          onChange={(e) => setInput(e.target.value)} 
        />
        <button onClick={handleGenerate}>
          Generate
        </button>

        <div>
          {svgs.map((svg, i) => (
            <div
              key={i}
              style={{ marginBottom: "20px" }}
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default App
