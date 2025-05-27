import mockData from '../data/mockData2.js';

export const loginUser = (email, password) => {
  const user = mockData.users.find(u => u.email === email);
  if (!user || user.password !== password) {
    return null;
  }
  return user;
};

export const registerUser = (userData) => {
  const { email } = userData;

  const existingUser = mockData.users.find(u => u.email === email);
  if (existingUser) {
    return { success: false, message: "El correo ya está registrado" };
  }

  const newUser = {
    id: mockData.users.length + 1,
    ...userData
  };

  mockData.users.push(newUser);
  return { success: true, user: newUser };
};
