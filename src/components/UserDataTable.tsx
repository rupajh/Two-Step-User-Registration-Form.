import React from 'react';
import { useSelector } from 'react-redux';
import '../style/Table.css'
const UserDataTable: React.FC = () => {
  const users = useSelector((state: any) => state.users);

  return (
    <div className="table-responsive">
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Sex</th>
          <th>Mobile</th>
          <th>Govt ID Type</th>
          <th>Govt ID</th>
          {/* Add more columns as needed */}
        </tr>
      </thead>
      <tbody>
        {users.map((user: any, index: number) => (
         
          <tr key={index}>
            
            <td>{user.name}</td>
            <td>{user.age}</td>
            <td>{user.sex}</td>
            <td>{user.mobile}</td>
            <td>{user.govtIdType}</td>
            <td>{user.govtId}</td>
            {/* Render more user data as needed */}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default UserDataTable;
