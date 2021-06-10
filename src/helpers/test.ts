import { hasLettersAndNumbers } from '.';

describe('hasLettersAndNumbers', () => {
  it(`should receive a number or a string and return true if the passed param
  has letters and numbers and false otherwise`, () => {
    expect(hasLettersAndNumbers(768)).toBe(false);
    expect(hasLettersAndNumbers('768')).toBe(false);
    expect(hasLettersAndNumbers('768 1024')).toBe(false);
    expect(hasLettersAndNumbers('media')).toBe(false);
    expect(hasLettersAndNumbers('media query')).toBe(false);
    expect(hasLettersAndNumbers('media 10')).toBe(true);
    expect(hasLettersAndNumbers('768px')).toBe(true);
    expect(hasLettersAndNumbers('!768')).toBe(true);
  });

  it('should accept strings with dots, since media queries allows it', () => {
    expect(hasLettersAndNumbers('48.75')).toBe(false);
    expect(hasLettersAndNumbers('0.025')).toBe(false);
  });
});
