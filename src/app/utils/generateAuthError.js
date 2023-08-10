/* eslint-disable indent */
function generateAuthError(message) {
  switch (message) {
    case "EMAIL_NOT_FOUND": {
      return {
        email: "Некорректная электронная почта или пароль",
        password: "Некорректная электронная почта или пароль",
      };
    }
    case "INVALID_PASSWORD": {
      return {
        email: "Некорректная электронная почта или пароль",
        password: "Некорректная электронная почта или пароль",
      };
    }
    case "EMAIL_EXISTS": {
      return {
        email: "Пользователь с такой электронной почтой уже существует",
      };
    }
    case "WEAK_PASSWORD : Password should be at least 6 characters": {
      return {
        password: "Минимальная длинна 6 символов",
      };
    }
    case "INVALID_EMAIL": {
      return {
        email: "Проверьте корректность электронной почты",
      };
    }
    default:
      return {
        email: "Слишком много попыток входа",
        password: "Слишком много попыток входа",
      };
  }
}
export default generateAuthError;
