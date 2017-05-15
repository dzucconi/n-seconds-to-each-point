import Velocity from 'velocity-animate';
import parameters from 'queryparams';
import * as dom from './lib/dom';
import times from './lib/times';

window.parameters = parameters;

const DOM = {
  app: document.getElementById('app'),
};

const CONFIG = parameters({
  amount: 16,
});

export default () => {
  const size = DOM.app.offsetHeight / CONFIG.amount;

  times(CONFIG.amount)(i => {
    const odd = i % 2 === 0;

    const style = {
      'width': `${size}px`,
      'height': `${size}px`,
      'top': `${i * size}px`,
      'background-color': 'red',
      'background-image': `radial-gradient(${size}px at 50% 50%, white 0%, red 10%, black 50%)`
    };

    style[odd ? 'left' : 'right'] = 0;

    const element = dom.tag('div', {
      klass: 'element',
      style,
    });

    DOM.app.appendChild(element);

    let props = {};

    if (odd) {
      props = {
        left: '100%',
        translateX: '-100%',
      };
    } else {
      props = {
        right: '100%',
        translateX: '100%',
      };
    }

    Velocity(element, props, {
      loop: true,
      duration: (i + 1) * 1000,
    });
  });
};
