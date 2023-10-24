import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PetDetails from './PetDetails';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('axios');

// Mocking useSelector hook
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn()
}));

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: Router });
};

describe('<PetDetails />', () => {

  // 1. Rendering Test
  test('renders without crashing', () => {
    const { getByText } = renderWithRouter(<PetDetails />);
    expect(getByText('Add to Wishlist')).toBeInTheDocument();
  });

  // 2. API Calls
  test('should fetch the API token on component mount', async () => {
    const mockResponse = { data: { accessToken: 'fakeToken123' }};
    axios.get.mockResolvedValueOnce(mockResponse);

    renderWithRouter(<PetDetails />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('/api/petfinder/token');
    });
  });

  test('should fetch pet details when API token is retrieved', async () => {
    const mockTokenResponse = { data: { accessToken: 'fakeToken123' } };
    const mockPetDetailsResponse = { data: { animal: { id: 123, name: 'Fido' } } };
    axios.get
      .mockResolvedValueOnce(mockTokenResponse)
      .mockResolvedValueOnce(mockPetDetailsResponse);

    renderWithRouter(<PetDetails />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('https://api.petfinder.com/v2/animals/undefined', expect.any(Object));
    });
  });

  // 3. User Interactions
  test('should trigger add to wishlist function when button is clicked', () => {
    const { getByText } = renderWithRouter(<PetDetails />);
    fireEvent.click(getByText('Add to Wishlist'));
    // Assuming you have a way to check the function call
  });

  // 4. State Changes 
  test('should update state with pet details', async () => {
    const mockTokenResponse = { data: { accessToken: 'fakeToken123' } };
    const mockPetDetailsResponse = { data: { animal: { id: 123, name: 'Fido' } } };
    axios.get
      .mockResolvedValueOnce(mockTokenResponse)
      .mockResolvedValueOnce(mockPetDetailsResponse);

    renderWithRouter(<PetDetails />);

    await waitFor(() => {
      expect(screen.getByText('Fido')).toBeInTheDocument();
    });
  });

  // ...more tests
});
