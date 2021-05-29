export const tag = (
  type: string,
  {
    id,
    klass,
    style,
  }: { id?: string; klass?: string; style?: Record<string, string> } = {},
  html?: string
) => {
  const el = document.createElement(type);

  if (id) el.id = id;
  if (klass) el.className = klass;
  if (style) {
    Object.keys(style).map((key) => {
      el.style[key] = style[key];
    });
  }

  if (html) el.innerHTML = html;

  return el;
};
