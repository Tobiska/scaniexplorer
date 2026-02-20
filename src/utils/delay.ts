export const delay = (ms = 200) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms)
  })

export const withDelay = async <T>(value: T, ms = 200): Promise<T> => {
  await delay(ms)
  return value
}
