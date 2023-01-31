import validator from 'validator'
import { TextValidatorAdapter } from './text-validator-adapter'

jest.mock('validator', () => ({
  isLength (any): boolean {
    return true
  }
}))

const makeSut = (): TextValidatorAdapter => {
  return new TextValidatorAdapter()
}

describe('textValidator Adapter', () => {
  test('Should return false if length of value is less than defined', async () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isLength').mockReturnValueOnce(false)
    const isValidText = sut.isValid('1', 5, 5)
    expect(isValidText).toEqual(false)
  })
  test('Should return false if length of value is bigger than defined', async () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isLength').mockReturnValueOnce(false)
    const isValidText = sut.isValid('12345', 4, 4)
    expect(isValidText).toEqual(false)
  })
  test('Should call validator with correct value', () => {
    const sut = makeSut()
    const isLengthSpy = jest.spyOn(validator, 'isLength')
    sut.isValid('123', 1, 2)
    expect(isLengthSpy).toBeCalledWith('123', { min: 1, max: 2 })
  })
})
