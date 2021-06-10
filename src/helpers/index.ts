export function hasLettersAndNumbers(str: string | number): boolean {
  const withoutDotString = `${str}`.replace(/\./g, '');
  const onlyNumbers = `${withoutDotString}`.replace(/[a-zA-Z]/g, '').trim();
  const onlyLetters = `${withoutDotString}`.replace(/[0-9]/g, '').trim();

  return !!onlyLetters && !!onlyNumbers;
}
