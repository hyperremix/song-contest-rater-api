import {
  getFileSuffixForContentType,
  getSupportedContentTypes,
  isValidImageContentType,
} from './image-mime-types';

describe('ImageMimeTypes', () => {
  describe('when geting supported content types', () => {
    it('then the list of supported content types is returned', () => {
      // act
      const result = getSupportedContentTypes();

      // assert
      expect(result).toEqual(['image/jpeg', 'image/svg+xml', 'image/png']);
    });
  });

  describe('when checking is valid image content type', () => {
    it('if content type is invalid then false is returned', () => {
      // act
      const result = isValidImageContentType('invalid');

      // assert
      expect(result).toBe(false);
    });

    it('if content type is valid then true is returned', () => {
      // act
      const result = isValidImageContentType('image/jpeg');

      // assert
      expect(result).toBe(true);
    });
  });

  describe('when getting file suffix for content type', () => {
    it('if content type does not exist then undefined is returned', () => {
      // act
      const result = getFileSuffixForContentType('invalid');

      // assert
      expect(result).toBeUndefined();
    });

    it('if content type exists then file suffix is returned', () => {
      // act
      const result = getFileSuffixForContentType('image/svg+xml');

      // assert
      expect(result).toEqual('svg');
    });
  });
});
