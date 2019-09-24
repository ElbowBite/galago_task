/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import formatString from 'format-string-by-pattern';
import { connect } from 'react-redux';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import '../../styles/datePicker/styles.css'; //  Date picker styles
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';
import 'moment/locale/ru';

import * as actions from '../../store/actions';
import styles from './InputForm.module.scss';
import { validation } from './validation';

const InputForm = ({
  fetchList,
  addNewUser,
}) => {
  //  Submit function to post new input data
  const onSubmit = (vals, form) => {
    //  Pushing registration date to vals and formatting birth date
    const updatedVals = {
      ...vals,
      birthDate: formatDate(vals.birthDate, 'L', 'ru'),
      regDate: `${formatDate(new Date(), 'L', 'ru')}`,
    };
    // eslint-disable-next-line no-console
    console.log('Submiеted!');
    addNewUser(updatedVals);
    setTimeout(form.reset, 500);
  };
  // Fetchig list of user from backend
  useEffect(() => {
    fetchList();
  });

  //  Formatting phone number
  const formatPhoneNumber = (anyString) => {
    const onlyNumbers = anyString.replace(/[^\d]/g, '');
    return formatString('+9-(999)-999-99-99', onlyNumbers);
  };
  // Preventing all input except numbers
  const formatOnlyNumbers = (anyString) => (
    anyString.replace(/[^\d]/g, '')
  );
  // Styling date picker
  const DatePicker = (props) => (
    <DayPickerInput
      formatDate={formatDate}
      parseDate={parseDate}
      format="L"
      placeholder={`${formatDate(new Date(), 'L', 'ru')}`}
      onDayChange={props.input.onChange}
      value={props.input.value}
      dayPickerProps={{
        month: new Date(1990, 0),
        locale: 'ru',
        localeUtils: MomentLocaleUtils,
      }}
      style={{
        container: {
          backgroundColor: 'red',
        },
      }}
    />
  );

  return (
    <div>
      <h2>Форма регистрации для участия в забеге</h2>
      <Form
        onSubmit={onSubmit}
        validate={validation}
      >
        {({ handleSubmit, valid, form }) => (
          <div className={styles.InputForm}>
            <Field
              component="input"
              className={styles.TextInput}
              name="name"
              placeholder="Введите имя"
            />
            <Field
              component="input"
              className={styles.TextInput}
              name="email"
              placeholder="Введите email"
            />
            <Field
              component={DatePicker}
              name="birthDate"
              placeholder="Дата рождения"
            />
            <Field
              component="input"
              className={styles.TextInputShorter}
              name="phone"
              placeholder="+7-(999)-999-99-99"
              parse={formatPhoneNumber}
            />
            <Field
              component="select"
              className={styles.TextInputShorter}
              name="distance"
              placeholder="Выберите дистанцию"
            >
              <option value="" hidden>Дистанция</option>
              <option value="3">3 км</option>
              <option value="5">5 км</option>
              <option value="10">10 км</option>
            </Field>
            <Field
              component="input"
              className={styles.TextInputShorter}
              name="fee"
              placeholder="Сумма взноса"
              parse={formatOnlyNumbers}
            />
            <button
              disabled={!valid}
              type="submit"
              className={styles.SubmitButton}
              onClick={() => handleSubmit(form)}
            >
              Зарегистрироваться
            </button>
          </div>
        )}
      </Form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchList: () => dispatch(actions.fetchList()),
  addNewUser: (newUser) => dispatch(actions.addNewUser(newUser)),
});

export default connect(null, mapDispatchToProps)(InputForm);
