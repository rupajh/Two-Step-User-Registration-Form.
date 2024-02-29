import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import $ from 'jquery';
import 'datatables.net';
import '../style/Table.css'
import Button from '@mui/material/Button';

interface UserTableProps {
  userlist: any;
}
const UserTable: React.FC<UserTableProps> = () => {

  const [dataTable, setDataTable] = useState<any>(null);
  const users = useSelector((state: any) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!$.fn.DataTable.isDataTable('#userTable')) { 
      const table = $('#userTable').DataTable(); 
      setDataTable(table);
    }

    return () => {
      if (dataTable) {
        dataTable.destroy(); 
      }
    };
  }, [users]);

  return (
    <div>
      <div>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Sex</th>
              <th>Mobile</th>
              <th>Government ID Type</th>
              <th>Government ID</th>
              <th>Address</th>
              <th>State</th>
              <th>City</th>
              <th>Country</th>
              <th>Pincode</th>
            </tr>
          </thead>
          <tbody>
            {/* Render user data */}
            {users.map((user: any, index: number) => (
              <tr key={index}>
                <td>{user.name || '-'}</td>
                <td>{user.age || '-'}</td>
                <td>{user.sex || '-'}</td>
                <td>{user.mobile || '-'}</td>
                <td>{user.govtIdType || '-'}</td>
                <td>{user.govtId||'-'}</td>
                <td>{user.address || '-'}</td>
                <td>{user.state || '-'}</td>
                <td>{user.city || '-'}</td>
                <td>{user.country || '-'}</td>
                <td>{user.pincode || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  );
};

export default UserTable;
