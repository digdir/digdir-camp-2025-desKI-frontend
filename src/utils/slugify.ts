export function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/å/g, 'a')
    .replace(/ø/g, 'o')
    .replace(/æ/g, 'ae')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');
}
