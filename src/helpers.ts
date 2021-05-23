export function hasLettersAndNumbers(str: string | number): boolean {
  const onlyNumbers = `${str}`.replace(/[a-zA-Z]/g, '').trim();
  const onlyLetters = `${str}`.replace(/[0-9]/g, '').trim();

  return !!onlyLetters && !!onlyNumbers;
}
