/* eslint-disable no-console */
import instance from '../axios-instance';

const updateList = (newList) => ({
  type: 'UPDATE_LIST',
  userList: newList,
});

export const fetchList = () => (dispatch) => {
  instance
    .get('users.json')
    .then((res) => {
      dispatch(updateList(res.data));
    })
    .catch((err) => console.log(err));
};

export const addNewUser = (newUser) => (dispatch) => {
  instance
    .post('users.json', newUser)
    .then(() => {
      dispatch(fetchList());
    })
    .catch((err) => console.log(err));
};
