export const getRandInt = (from: number, to: number) => {
  from = Math.ceil(from)
  to = Math.floor(to)
  return Math.floor(Math.random() * (from - to + 1)) + to;
}
