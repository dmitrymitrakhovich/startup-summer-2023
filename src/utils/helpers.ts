export const getCurrentParams = (searchParams: URLSearchParams) => {
  const p: Record<string, string> = {};
  for (const [key, value] of searchParams.entries()) {
    p[key] = value;
  }
  return p;
};

export function createMarkup(html: string) {
  return { __html: html };
}
