import { Fretboard } from '../../../domain/geometry/Fretboard';
import { useEffect, useState } from 'react';
import generateSvg from '../utils/generateSvg';
import { ChordSearchResults } from '../components/ChordSearchResults';
import { ChordSearchHeader } from '../components/ChordSearchHeader';
import type { RenderedDiagram } from '../../../rendering/buildDiagramLayout';

export const ChordSearchPage = () => {
  const [notFound, setNotFound] = useState(false);
  const [input, setInput] = useState("");
  const [svgs, setSvgs] = useState<RenderedDiagram[]>([]);
  const fretboard = new Fretboard(21);

  useEffect(() => {
    if (!input.trim()) {
      setSvgs([]);
      setNotFound(false);
      return;
    }
    try {
      const result = generateSvg(input, fretboard);
      setSvgs(result);
      setNotFound(result.length === 0);
    } catch {
      setSvgs([]);
      setNotFound(true);
    }
  }, [input]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  return (
    <>
      <section 
        className={`py-3 px-0 pb-38 flex flex-col w-full min-h-screen md:pb-10 bg-ui-elevated`}
      >
        <ChordSearchHeader 
          input={input} 
          onInputChange={handleInputChange} 
          onClear={ () => setInput("")}
        />
        <ChordSearchResults svgs={svgs} notFound={notFound} />
      </section>

    </>
  )

}
