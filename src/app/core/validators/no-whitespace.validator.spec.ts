import { NoWhitespaceValidator } from './no-whitespace.validator';
import { FormControl } from '@angular/forms';

describe('NoWhitespaceValidator', () => {
  const validator = NoWhitespaceValidator();

  it('should be able to return no whitespace validator null value', () => {
    const formControl = new FormControl();
    formControl.setValue('Test');

    expect(validator(formControl)).toEqual(null);
  });
  it('should be able to return no whitespace validator whitespace value', () => {
    const formControl = new FormControl();
    formControl.setValue('');

    expect(validator(formControl).whitespace).toEqual('value is only whitespace');
  });
  it('should be able to return no whitespace validator on number validation', () => {
    const formControl = new FormControl();
    formControl.setValue(5);

    expect(validator(formControl)).toEqual(null);
  });
});
