import { Diagram } from "../../src/application/diagram/shapeToDiagram";
import { renderDiagram } from "../../src/rendering/renderDiagram";


const C_major: Diagram = {
    baseFret: 1,
    stringCount: 6,
    dots: [
        { stringIndex: 1, fret: 3 },
        { stringIndex: 2, fret: 2 },
        { stringIndex: 4, fret: 1 }
    ],
    openStrings: [3, 5],
    mutedStrings: [0]
};

const D_major: Diagram = {
    baseFret: 1,
    stringCount: 6,
    dots: [
        { stringIndex: 3, fret: 2 },
        { stringIndex: 4, fret: 3 },
        { stringIndex: 5, fret: 2 }
    ],
    openStrings: [2],
    mutedStrings: [0, 1]
};

const E_major: Diagram = {
    baseFret: 1,
    stringCount: 6,
    dots: [
        { stringIndex: 1, fret: 2 },
        { stringIndex: 2, fret: 2 },
        { stringIndex: 3, fret: 1 }
    ],
    openStrings: [0, 4, 5],
    mutedStrings: []
};

const A_minor: Diagram = {
    baseFret: 1,
    stringCount: 6,
    dots: [
        { stringIndex: 2, fret: 2 },
        { stringIndex: 3, fret: 2 },
        { stringIndex: 4, fret: 1 }
    ],
    openStrings: [1, 5],
    mutedStrings: [0]
};

const F_major: Diagram = {
    baseFret: 1,
    stringCount: 6,
    dots: [
        { stringIndex: 0, fret: 1 },
        { stringIndex: 1, fret: 3 },
        { stringIndex: 2, fret: 3 },
        { stringIndex: 3, fret: 2 },
        { stringIndex: 4, fret: 1 },
        { stringIndex: 5, fret: 1 }
    ],
    openStrings: [],
    mutedStrings: []
};

const A_major_barre: Diagram = {
    baseFret: 5,
    stringCount: 6,
    dots: [
        { stringIndex: 0, fret: 1 },
        { stringIndex: 1, fret: 3 },
        { stringIndex: 2, fret: 3 },
        { stringIndex: 3, fret: 2 },
        { stringIndex: 4, fret: 1 },
        { stringIndex: 5, fret: 1 }
    ],
    openStrings: [],
    mutedStrings: []
};

const D_over_Fsharp: Diagram = {
    baseFret: 1,
    stringCount: 6,
    dots: [
        { stringIndex: 0, fret: 2 },
        { stringIndex: 3, fret: 2 },
        { stringIndex: 4, fret: 3 },
        { stringIndex: 5, fret: 2 }
    ],
    openStrings: [2],
    mutedStrings: [1]
};

const high_triad: Diagram = {
    baseFret: 7,
    stringCount: 6,
    dots: [
        { stringIndex: 2, fret: 3 },
        { stringIndex: 3, fret: 3 },
        { stringIndex: 4, fret: 2 },
        { stringIndex: 5, fret: 1 }
    ],
    openStrings: [],
    mutedStrings: [0, 1]
};

const power_chord: Diagram = {
    baseFret: 3,
    stringCount: 6,
    dots: [
        { stringIndex: 0, fret: 1 },
        { stringIndex: 1, fret: 3 },
        { stringIndex: 2, fret: 3 }
    ],
    openStrings: [],
    mutedStrings: [3, 4, 5]
};

const muted_all: Diagram = {
    baseFret: 1,
    stringCount: 6,
    dots: [],
    openStrings: [],
    mutedStrings: [0, 1, 2, 3, 4, 5]
};

const open_all: Diagram = {
    baseFret: 1,
    stringCount: 6,
    dots: [],
    openStrings: [0, 1, 2, 3, 4, 5],
    mutedStrings: []
};

const diagrams = [
    C_major,
    D_major,
    E_major,
    A_minor,
    F_major,
    A_major_barre,
    D_over_Fsharp,
    high_triad,
    power_chord,
    muted_all,
    open_all
];

const app = document.querySelector<HTMLDivElement>('#app')!;
app.innerHTML = diagrams
    .map((d, i) => `<span style="margin-bottom:20px">${renderDiagram(d)}</span><span>${i + 1}</span>`)
    .join("");

app.innerHTML += `<span style="margin-bottom:20px">${renderDiagram(D_major, "D")}`
app.innerHTML += `<span style="margin-bottom:20px">${renderDiagram(F_major, "F")}`