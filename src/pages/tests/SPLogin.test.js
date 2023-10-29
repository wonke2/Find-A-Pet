import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SPLogin from '../SPLogin';
import '@testing-library/jest-dom/extend-expect';


// Mocking the navigation and fetch
const mocks = {
  navigateMock: jest.fn(),
};

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  
  return {
    ...originalModule,
    useNavigate: jest.fn(() => mocks.navigateMock),
  };
});

beforeEach(() => {
  jest.clearAllMocks();
});

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: "fail" }), // Default to fail, override in tests
  })
);

describe('<SPLogin />', () => {
  beforeEach(() => {
    fetch.mockClear();
    mocks.navigateMock.mockClear();
    // If you use alerts, mock them like this:
    global.alert = jest.fn();
  });

  test('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<SPLogin />);
    
    expect(getByText('Service Provider Login')).toBeInTheDocument();
    expect(getByPlaceholderText('Business Name')).toBeInTheDocument();
    expect(getByPlaceholderText('Password')).toBeInTheDocument();
  });

  test('updates input fields correctly', () => {
    const { getByPlaceholderText } = render(<SPLogin />);
    const businessNameInput = getByPlaceholderText('Business Name');
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.change(businessNameInput, { target: { value: 'Test Business' } });
    fireEvent.change(passwordInput, { target: { value: 'TestPassword' } });

    expect(businessNameInput.value).toBe('Test Business');
    expect(passwordInput.value).toBe('TestPassword');
  });

  test('fails to login with incorrect credentials', async () => {
    const { getByPlaceholderText, getByText } = render(<SPLogin />);
    const businessNameInput = getByPlaceholderText('Business Name');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Login');

    fireEvent.change(businessNameInput, { target: { value: 'Incorrect Business' } });
    fireEvent.change(passwordInput, { target: { value: 'IncorrectPassword' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  test('succeeds to login with correct credentials and navigates', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ status: "success", token: "test_token" }),
      })
    );

    const { getByPlaceholderText, getByText } = render(<SPLogin />);
    const businessNameInput = getByPlaceholderText('Business Name');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Login');

    fireEvent.change(businessNameInput, { target: { value: 'Correct Business' } });
    fireEvent.change(passwordInput, { target: { value: 'CorrectPassword1' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(localStorage.getItem("token")).toBe("test_token");
      expect(mocks.navigateMock).toHaveBeenCalledWith("/serviceProvider");
    });
  });
});
