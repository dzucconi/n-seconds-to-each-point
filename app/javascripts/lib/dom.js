export const tag = (type, { id, klass, style } = {}, html) => {
  const el = document.createElement(type);

  if (id) el.id = id;
  if (klass) el.className = klass;
  if (style) el.style = Object.keys(style).reduce((memo, key) => {
    return memo + `${key}: ${style[key]};`;
  }, '');


  if (html) el.innerHTML = html;

  return el;
};
