import React from 'react';
import { connect } from 'react-redux';

import ReactTable from 'react-table';
import './react-table.css';

const List = ({
  // eslint-disable-next-line react/prop-types
  userList,
}) => {
  const data = userList;
  return (
    <div>
      <ReactTable
        data={data}
        columns={[
          {
            Header: 'Регистрация',
            accessor: 'regDate',
            width: 80,
          },
          {
            Header: 'Имя',
            accessor: 'name',
            style: { 'white-space': 'unset' },
          },
          {
            Header: 'Почта',
            accessor: 'email',
            minWidth: 120,
            sortable: false,
          },
          {
            Header: 'Дата рождения',
            accessor: 'birthDate',
            width: 95,
            sortable: false,
          },
          {
            Header: 'Номер телефона',
            accessor: 'phone',
            width: 130,
            sortable: false,
          },
          {
            Header: 'Дистанция',
            accessor: 'distance',
            width: 70,
          },
          {
            Header: 'Взнос ₽',
            accessor: 'fee',
            width: 65,
          },
        ]}
        defaultPageSize={5}
        className="-striped -highlight"
      />
    </div>
  );
};
  //  Reducing ID to lower level
const mapStateToProps = (state) => {
  if (state.userList) {
    return ({
      userList: Object.keys(state.userList).reduce((pv, cv) => ([
        ...pv,
        {
          id: cv,
          ...state.userList[cv],
        },
      ]), []) }
    );
  }
  return undefined;
};

export default connect(mapStateToProps)(List);
