export const REG_EXP = {
  passwordRegExp:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!?@#$%^&*_+\-\\(\\)\\[\]{}><\\/\\|"'.,:;`=])[a-zA-Z0-9~!?@#$%^&*_+\-\\(\\)\\[\]{}><\\/\\|"'.,:;`=]{8,}$/,
  emailRegExp:
    /^(?=(.{1,64}@))((?!\.)(?![A-Za-z0-9]*\.{2,})(?!^[!#$%&'"*+\-/=?^_`{|}~.]+?@)[A-Za-z0-9!#$%&'"*+\-/=?^_`{|}~.]+(?<![.])@)(?=(.{4,255}$))((?!-|_|\.)(?!.*[-_.]{2,})([A-Za-z0-9-_.]+\.)+[A-Za-z]{2,})$/,
  nonAlphabeticCharactersRegExp: /[^A-Za-z]/g,
  nameRegExp: /^[A-Za-zА-Яа-яЁё\s-]+$/,
  fullPolishNameWithAtLeastTwoWords:
    /^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ'-]{2,}(?:\s+[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ'-]{2,})+$/,
  streetRegExp: /^[A-Za-zА-Яа-яЁё0-9 -]+$/g,
  latinLettersAndDigitsRegExp: /^[A-Za-z0-9]+$/g,
  latinLettersDigitsSpecialRegExp: /^(?!\s)[a-zA-Z0-9\s!@#$%^&*()]*$/g,
  DigitsRegExp: /^[\d-]+$/,
  capitalizeLetters: /^[A-ZА-ЯЁ][a-zа-яё]*(?:[-\s][a-zа-яё]+)*$/,
  onlyOneCapitalizeLetter: /[A-ZА-ЯЁ].*[A-ZА-ЯЁ]/,
  invalidCharacter: /[^0-9,]/g,
  extraComma: /,(?=.*?,)/g,
  postcodeMask: /^(\d{2})(\d+)/,
} satisfies { [field: string]: RegExp };
