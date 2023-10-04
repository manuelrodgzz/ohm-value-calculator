/** This class will be helpful to easily differentiate between
 * NodeJS errors and our custom errors
 */
class CustomError extends Error {
  constructor(message: string) {
    super(message)
  }
}

export default CustomError