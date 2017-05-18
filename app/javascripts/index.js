import parameters from 'queryparams';
import Velocity from 'velocity-animate';
import 'velocity-animate/velocity.ui';

import * as dom from './lib/dom';
import Deferred from './lib/deferred';

window.parameters = parameters;

const DOM = {
  app: document.getElementById('app'),
};

const CONFIG = parameters({
  scalar: 20,
  interval: 10000,
  color: 'gray',
  'background-color': 'black',
  ops: [
    // ['nw', 'se', 'nw'],
    // ['sw', 'ne', 'sw'],
    // ['se', 'nw', 'se'],
    // ['ne', 'sw', 'ne'],
    ['nw', 'sw', 'se', 'ne', 'nw'],
    ['sw', 'se', 'ne', 'nw', 'sw'],
    ['se', 'ne', 'nw', 'sw', 'se'],
    ['ne', 'nw', 'sw', 'se', 'ne'],
  ]
});

const merge = (...xs) => Object.assign({}, ...xs);

const rotate = (xs, n) =>
  xs.slice(n, xs.length).concat(xs.slice(0, n));

const queue = element => op => {
  const dfd = new Deferred;
  return {
    dfd,
    options: {
      e: element,
      p: op,
      o: {
        easing: 'linear',
        duration: CONFIG.interval,
        complete: dfd.resolve,
      },
    },
  };
};

const stage = (style, sequence) => {
  const element = dom.tag('div', {
    klass: 'element',
    style,
  });

  DOM.app.appendChild(element);

  const run = ops => {
    const operational = sequence.map(queue(element));
    Velocity.RunSequence(operational.map(({ options }) => options));
    Promise.all(operational.map(({ dfd: { promise } }) => promise))
      .then(() => run(ops));
  };

  run(sequence);
};

const init = () => {
  DOM.app.innerHTML = '';
  DOM.app.style.backgroundColor = CONFIG['background-color'];

  const significant = Math.min(window.innerHeight, window.innerWidth);
  const size = significant * (CONFIG.scalar / 100);

  const primary = {
    n: { top: '0%', translateY: '0%' },
    s: { top: '100%', translateY: '-100%' },
    e: { left: '100%', translateX: '-100%' },
    w: { left: '0%', translateX: '0%' },
  };

  const secondary = {
    ne: merge(primary.n, primary.e),
    nw: merge(primary.n, primary.w),
    se: merge(primary.s, primary.e),
    sw: merge(primary.s, primary.w),
  };

  const dirs = merge(primary, secondary);

  const corners = {
    nw: { top: 0, left: 0 },
    sw: { bottom: 0, left: 0 },
    se: { bottom: 0, right: 0 },
    ne: { top: 0, right: 0 },
  };

  const base = {
    'width': `${size}px`,
    'height': `${size}px`,
    'background-color': 'transparent',
    'background-image': `radial-gradient(${size}px at 50% 50%, white 0%, ${CONFIG.color} 10%, rgba(0,0,0,0) 50%)`
  };

  CONFIG.ops.map(([corner, ...movements]) => {
    stage(merge(base, corners[corner]), movements.map(dir => dirs[dir]));
  });
};

export default () => {
  init();

  window.addEventListener('resize', init);
};