import { configure } from "queryparams";
import Velocity from "velocity-animate";
import "velocity-animate/velocity.ui";
import { tag } from "./lib/dom";
import Deferred from "./lib/deferred";

const ROOT = document.getElementById("root");

const { params } = configure<{
  scalar: number;
  interval: number;
  color: string;
  "background-color": string;
  ops: ("ne" | "se" | "sw" | "nw")[][];
}>({
  scalar: 20,
  interval: 10000,
  color: "gray",
  "background-color": "black",
  ops: [
    // ['nw', 'se', 'nw'],
    // ['sw', 'ne', 'sw'],
    // ['se', 'nw', 'se'],
    // ['ne', 'sw', 'ne'],
    ["nw", "sw", "se", "ne", "nw"],
    ["sw", "se", "ne", "nw", "sw"],
    ["se", "ne", "nw", "sw", "se"],
    ["ne", "nw", "sw", "se", "ne"],
  ],
});

const CARDINAL = {
  n: { top: "0%", translateY: "0%" },
  s: { top: "100%", translateY: "-100%" },
  e: { left: "100%", translateX: "-100%" },
  w: { left: "0%", translateX: "0%" },
} as const;

const ORDINAL = {
  ne: { ...CARDINAL.n, ...CARDINAL.e },
  nw: { ...CARDINAL.n, ...CARDINAL.w },
  se: { ...CARDINAL.s, ...CARDINAL.e },
  sw: { ...CARDINAL.s, ...CARDINAL.w },
} as const;

const DIRS = { ...CARDINAL, ...ORDINAL } as const;

type Direction = typeof DIRS[keyof typeof DIRS];

const CORNERS = {
  nw: { top: 0, left: 0 },
  sw: { bottom: 0, left: 0 },
  se: { bottom: 0, right: 0 },
  ne: { top: 0, right: 0 },
} as const;

const queue = (element: HTMLElement) => (op: any) => {
  const dfd = new Deferred();
  return {
    dfd,
    options: {
      e: element,
      p: op,
      o: {
        easing: "linear",
        duration: params.interval,
        complete: dfd.resolve,
      },
    },
  };
};

const stage = (style: Record<string, any>, sequence: Direction[]) => {
  const element = tag("div", {
    klass: "element",
    style,
  });

  ROOT.appendChild(element);

  const run = (ops: Direction[]) => {
    const operational = sequence.map(queue(element));
    Velocity.RunSequence(operational.map(({ options }) => options));
    Promise.all(operational.map(({ dfd: { promise } }) => promise)).then(() =>
      run(ops)
    );
  };

  run(sequence);
};

const init = () => {
  ROOT.innerHTML = "";
  ROOT.style.backgroundColor = params["background-color"];

  const significant = Math.min(window.innerHeight, window.innerWidth);
  const size = significant * (params.scalar / 100);

  const base = {
    width: `${size}px`,
    height: `${size}px`,
    "background-color": "transparent",
    "background-image": `radial-gradient(${size}px at 50% 50%, white 0%, ${params.color} 10%, rgba(0,0,0,0) 50%)`,
  };

  params.ops.map(([corner, ...movements]) => {
    stage(
      { ...base, ...CORNERS[corner] },
      movements.map((dir) => DIRS[dir])
    );
  });
};

init();
window.addEventListener("resize", init);
