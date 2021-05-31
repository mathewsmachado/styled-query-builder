import { hasLettersAndNumbers } from './helpers';

describe('hasLettersAndNumbers', () => {
  it(`should return true if a string have letters and numbers and false
  otherwise`, () => {
    expect(hasLettersAndNumbers(768)).toBe(false);
    expect(hasLettersAndNumbers('768')).toBe(false);
    expect(hasLettersAndNumbers('768 1024')).toBe(false);
    expect(hasLettersAndNumbers('media')).toBe(false);
    expect(hasLettersAndNumbers('media query')).toBe(false);
    expect(hasLettersAndNumbers('media 10')).toBe(true);
    expect(hasLettersAndNumbers('768px')).toBe(true);
    expect(hasLettersAndNumbers('!768')).toBe(true);
  });
});
