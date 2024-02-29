import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Step1Form from './components/Step1Form';
import Step2Form from './components/Step2Form';
import UserTable from './components/UserTable';
import { useDispatch } from 'react-redux';
import { addUser } from './store/actions/userActions';

const App: React.FC = () => {
  const [formData, setFormData] = useState<any>({});
  const [firstFormData, setFirstFormData] = useState<any>({});
  const [userlist, setUserList] = useState<any>({});
  const [step, setStep] = useState<number>(1);
  const dispatch = useDispatch();
  const handleStep1Submit = (data: any) => {
    setFirstFormData(data);
    setStep(2);
  };

  const handleStep2Submit = (data: any) => {
    const combinedFormData = { ...firstFormData, ...data };
    setFormData(combinedFormData);
    setUserList(combinedFormData);
    dispatch(addUser(combinedFormData));
    setStep(3);

  };
 

  return (
    <Router>
      <div className=''>
        <div style={{ display: 'flex', justifyContent: 'center', paddingLeft: '300px', paddingRight: '300px' }}>
          <div>
            {step === 1 && <Step1Form handleStep1Submit={handleStep1Submit} />}
            {step === 2 && <Step2Form handleStep2Submit={handleStep2Submit} />}
          </div>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<></>} />
        <Route path="/user-detail" element={<UserTable userlist={userlist} />} />
      </Routes>
      {step === 1 && <Navigate to="/" />}
    </Router>
  );
};

export default App;
