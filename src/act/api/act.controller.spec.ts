import { Builder } from 'builder-pattern';
import 'reflect-metadata';
import { defaultAct } from '../model/act';
import { ActController } from './act.controller';

describe('ActController', () => {
  let actController: ActController;

  let actRepository: any;

  const acts = [defaultAct, Builder(defaultAct).id('otherid').build()];

  beforeEach(() => {
    actRepository = {
      insert: jest.fn(() => Promise.resolve(defaultAct)),
      list: jest.fn(() => Promise.resolve(acts)),
      get: jest.fn(() => Promise.resolve(defaultAct)),
      update: jest.fn(() => Promise.resolve(defaultAct)),
      delete: jest.fn(() => Promise.resolve(defaultAct)),
    };

    actController = new ActController(actRepository);
  });

  describe('when creating', () => {
    it('then the act is inserted into the repository', async () => {
      // act
      await actController.create(defaultAct);

      // arrange
      expect(actRepository.insert).toHaveBeenCalled();
    });

    it('then the act is returned', async () => {
      // act
      const result = await actController.create(defaultAct);

      // arrange
      expect(result).toBe(defaultAct);
    });
  });

  describe('when listing', () => {
    it('then acts are returned from the repository', async () => {
      // act
      const result = await actController.list();

      // arrange
      expect(result).toEqual(acts);
    });
  });

  describe('when getting', () => {
    it('then the act is returned from the repository', async () => {
      // act
      const result = await actController.get(defaultAct.id);

      // arrange
      expect(result).toEqual(defaultAct);
    });
  });

  describe('when updating', () => {
    it('then the act is updated in the repository', async () => {
      // act
      await actController.update(defaultAct);

      // arrange
      expect(actRepository.update).toHaveBeenCalled();
    });

    it('then the act is returned', async () => {
      // act
      const result = await actController.update(defaultAct);

      // arrange
      expect(result).toBe(defaultAct);
    });
  });

  describe('when deleting', () => {
    it('then the deleted act is returned from the repository', async () => {
      // act
      const result = await actController.delete(defaultAct.id);

      // arrange
      expect(result).toEqual(defaultAct);
    });
  });
});
