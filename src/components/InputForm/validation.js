export const validation = (values) => {
  const errors = {};
  const email = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

  ['name', 'email', 'phone', 'fee'].forEach((key) => {
    if (!values[key]) {
      errors[key] = 'Поле не заполнено!';
    }
    /* if (values[key] && values[key].length > 40) {
      errors[key] = 'Limit of 40 characters reached';
    } */
  });

  if (!email.test(values.email)) {
    errors.email = 'Введите верный адрес эл. почты!';
  }

  if (values.phone) {
    if (values.phone.length !== 18) {
      errors.phone = 'Введите верный номер телефона';
    }
  }

  if (!values.distance) {
    errors.distance = 'Выберите дистанцию забега!';
  }

  return errors;
};
