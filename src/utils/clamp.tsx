export const clamp = (
  value: number,
  lowerBound: number,
  upperBound: number,
): number => {
  'worklet'
  return Math.min(Math.max(lowerBound, value), upperBound)
}
