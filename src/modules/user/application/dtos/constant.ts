export const DTOS = {
  password: {
    minLength: 6,
    maxLength: 20,
  },
  regex: {
    regexLowercase: /^(?=.*[a-z]).+$/,
    regexUppercase: /^(?=.*[A-Z]).+$/,
    regexSpecial: /^(?=.*[!@#$%^&*()]).+$/,
  },
}
