export const REG_EXP: { [field: string]: RegExp } = {
  passwordRegExp:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!?@#$%^&*_+\-\\(\\)\\[\]{}><\\/\\|"'.,:;`=])[a-zA-Z0-9~!?@#$%^&*_+\-\\(\\)\\[\]{}><\\/\\|"'.,:;`=]{8,}$/,
  emailRegExp:
    /^(?=.{1,64}$)(?!^\.|\.$)[a-zA-Z0-9!#$%&'\\"*+\-/=?^_`.{|}~]*(?:[a-zA-Z0-9]|(?<!\.)\.)(?:[a-zA-Z0-9]|(?<!\.)\.)*[a-zA-Z0-9]*@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9]\.){1,253}(?:[a-zA-Z]{2,}|xn--[a-zA-Z0-9]+)$/,
  nonAlphabeticCharactersRegExp: /[^A-Za-z]/g,
  nameRegExp: /^[A-Za-zА-Яа-яЁё\s-]+$/,
  streetRegExp: /^[A-Za-zА-Яа-яЁё0-9 -]+$/g,
  latinLettersAndDigitsRegExp: /^[A-Za-z0-9]+$/g,
  latinLettersDigitsSpecialRegExp: /^(?!\s)[a-zA-Z0-9\s!@#$%^&*()]*$/g,
  DigitsRegExp: /^[\d-]+$/,
  capitalizeLetters: /^[A-ZА-ЯЁ][a-zа-яё]*(?:[-\s][a-zа-яё]+)*$/,
  onlyOneCapitalizeLetter: /[A-ZА-ЯЁ].*[A-ZА-ЯЁ]/,
};
