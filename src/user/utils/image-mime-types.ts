const contentTypeSuffixMap: { [contentType: string]: string } = {
  'image/jpeg': 'jpg',
  'image/svg+xml': 'svg',
  'image/png': 'png',
};

export const getSupportedContentTypes = (): string[] => Object.keys(contentTypeSuffixMap);

export const isValidImageContentType = (contentType: string): boolean =>
  Object.keys(contentTypeSuffixMap).includes(contentType);

export const getFileSuffixForContentType = (contentType: string): string | undefined =>
  contentTypeSuffixMap[contentType];
