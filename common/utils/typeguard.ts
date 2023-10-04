export const typeguard = <T>(toEvaluate: any, propToCheck: keyof T): toEvaluate is T => {
  try {
    if (propToCheck in toEvaluate) return  true
  } finally {
    return false
  }
}