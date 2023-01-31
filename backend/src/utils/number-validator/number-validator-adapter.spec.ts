import validator from 'validator'
import { NumberValidatorAdapter } from './number-validator-adapter'

jest.mock('validator', () => ({
  isInt (any): boolean {
    return true
  }
}))

const makeSut = (): NumberValidatorAdapter => {
  return new NumberValidatorAdapter()
}

describe('NumberValidator Adapter', () => {
  test('Should return false if not a number', async () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isInt').mockReturnValueOnce(false)
    const isValidText = sut.isValid('1')
    expect(isValidText).toEqual(false)
  })
  test('Should call validator with correct value', () => {
    const sut = makeSut()
    const isLengthSpy = jest.spyOn(validator, 'isInt')
    sut.isValid('123')
    expect(isLengthSpy).toBeCalledWith('123')
  })
})
