export interface DocumentMapper<T, U> {
  mapManyForward(models: T[]): U[];
  mapForward(model: T): U;
  mapManyBackwards(documents: U[]): T[];
  mapBackwards(document: U): T;
}
