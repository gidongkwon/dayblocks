export function range(start: number, stop: number, step = 1) {
  return Array(Math.ceil((stop - start) / step)).fill(start).map((x, y) => x + y * step);
}

export function orderBy<T>(retriever: (v: T) => number, desc?: boolean): (a: T, b: T) => number {
  return desc
    ? (rhs, lhs) => retriever(lhs) - retriever(rhs)
    : (lhs, rhs) => retriever(lhs) - retriever(rhs);
}
