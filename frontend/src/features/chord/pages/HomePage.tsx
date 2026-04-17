import { Fretboard } from '../../../domain/geometry/Fretboard';
import { useEffect, useState } from 'react';
import generateSvg from '../utils/generateSvg';
import { ChordSearchResults } from '../components/ChordSearchResults';
import { ChordSearchHeader } from '../components/ChordSearchHeader';

export const HomePage = () => {
  const [notFound, setNotFound] = useState(false);
  const [input, setInput] = useState("");
  const [svgs, setSvgs] = useState<string[]>([]);
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
        className={`p-5 flex flex-col gap-5`}
      >
        <ChordSearchHeader input={input} onInputChange={handleInputChange} />
        <ChordSearchResults svgs={svgs} notFound={notFound} />
      </section>

    </>
  )

}
