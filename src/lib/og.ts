/** Default social preview. Child `openGraph` objects replace the root one, so pages must set this explicitly. */
export const defaultOgImage = {
  url: '/og.jpg',
  width: 1024,
  height: 599,
  alt: 'Peon — Deploy your apps on your server in clicks',
} as const;
