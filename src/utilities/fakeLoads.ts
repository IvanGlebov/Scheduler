export const fakeDelay = (duration: number, result: boolean, message: string) =>
  new Promise((resolve, reject) => (
    result ? setTimeout(() => resolve(message), duration) : setTimeout(() => reject(message), duration))
  )




