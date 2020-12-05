export interface DocumentMapper<T, U> {
  mapForwards(model: T): U;
  mapBackwards(document: U): T;
}
