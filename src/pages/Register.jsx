import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router'; // 
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../context/AuthC';

const Register = () => {
  const { createUser, googleSignin, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoURL: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const isValidLength = password.length >= 6;

    if (!hasUppercase || !hasLowercase || !isValidLength) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Password',
        text: 'Password must have at least 6 characters, one uppercase and one lowercase letter.',
      });
      return false;
    }
    return true;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const { name, email, photoURL, password } = formData;
    if (!validatePassword(password)) return;

    setLoading(true);
    createUser(email, password)
      .then(() => updateUserProfile(name, photoURL))
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'Welcome to our food sharing community! 🎉',
        });
        navigate('/');
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text:
            error.code === 'auth/email-already-in-use'
              ? 'That email is already in use.'
              : 'Something went wrong.',
        });
      })
      .finally(() => setLoading(false));
  };

  const handleGoogle = () => {
    setLoading(true);
    googleSignin()
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Signed in with Google!',
        });
        navigate('/');
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Google Sign-In Failed',
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-lime-100 to-green-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8 border border-lime-200">
        <h2 className="text-3xl font-extrabold text-center text-green-700 mb-6">
          Join Our Food Sharing Community 🥗
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <InputField label="Full Name" name="name" value={formData.name} onChange={handleChange} />
          <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
          <InputField label="Photo URL" name="photoURL" value={formData.photoURL} onChange={handleChange} />

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a strong password"
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-lime-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-lime-600 hover:bg-lime-700 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            {loading ? 'Creating...' : 'Register & Share Food'}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">or</span>
          </div>
        </div>

        <button
          onClick={handleGoogle}
          className="w-full border border-gray-300 text-gray-800 font-medium py-2 rounded-lg flex items-center justify-center hover:bg-gray-100 transition duration-300 gap-2"
        >
          {/* Google SVG */}
          <svg className="w-5 h-5" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
            <path fill="#4285f4" d="M533.5 278.4c0-17.7-1.6-35.1-4.7-51.8H272v98.1h146.9c-6.4 34.7-25.5 64.1-54.5 83.7v69.4h87.7c51.3-47.3 81.4-117.1 81.4-199.4z" />
            <path fill="#34a853" d="M272 544.3c73.7 0 135.5-24.5 180.6-66.6l-87.7-69.4c-24.4 16.4-55.4 25.9-92.9 25.9-71.4 0-132-48.1-153.7-112.9H27.1v70.9C71.5 482.9 165.9 544.3 272 544.3z" />
            <path fill="#fbbc04" d="M118.3 321.3c-10.4-30.5-10.4-63.8 0-94.3V156.1H27.1c-34.6 68.8-34.6 150.5 0 219.3l91.2-54.1z" />
            <path fill="#ea4335" d="M272 107.7c39.9 0 75.8 13.7 104.2 40.7l78.1-78.1C407.5 24.5 345.7 0 272 0 165.9 0 71.5 61.4 27.1 156.1l91.2 70.9C140 155.8 200.6 107.7 272 107.7z" />
          </svg>
          <span>Continue with Google</span>
        </button>

        <p className="text-sm text-center mt-6 text-gray-700">
          Already part of our community?{' '}
          <Link to="/login" className="text-lime-600 font-semibold hover:underline">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

const InputField = ({ label, type = 'text', name, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required
      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
    />
  </div>
);

export default Register;

