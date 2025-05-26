export const toTitleCase = (str: string): string => {
  const title = str // Add space before:
    // 1. lowercase followed by uppercase (e.g., getURL → get URL)
    // 2. ALLCAPS followed by TitleCase (e.g., HTMLParser → HTML Parser)
    // 3. letter-number and number-letter transitions
    .replace(
      /([a-z])([A-Z])|([A-Z]+)([A-Z][a-z])|([a-zA-Z])(\d)|(\d)([a-zA-Z])/g,
      (_, a, b, c, d, e, f, g, h) =>
        a && b
          ? `${a} ${b}`
          : c && d
          ? `${c} ${d}`
          : e && f
          ? `${e} ${f}`
          : `${g} ${h}`
    )
    // Capitalize the first letter of each word
    .replace(/\b\w/g, (char) => char.toUpperCase());
  return title;
};
