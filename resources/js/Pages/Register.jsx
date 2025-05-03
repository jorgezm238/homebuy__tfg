import React from 'react';
import '../../css/auth.css';
import RegisterForm from '../components/RegisterForm';

export default function Register(){
  return (
    <div className="auth-page">
      <RegisterForm/>
    </div>
  );
}
