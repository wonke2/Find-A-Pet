import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PetListings from './PetListings';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('axios');

const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(ui, { wrapper: Router });
  };


describe('<PetListings />', () => {

  test('renders without crashing', () => {
    const { getByText } = render(<PetListings />);
    expect(getByText('Filter')).toBeInTheDocument();
  });

  test('toggles filters sidebar when filter button is clicked', async () => {
    const { getByText } = render(<PetListings />);
    fireEvent.click(getByText('Filter'));
    await waitFor(() => screen.getByText('Refine Listings'));
    expect(screen.getByText('Refine Listings')).toBeInTheDocument();
  });

  test('should fetch the API token on component mount', async () => {
    const mockResponse = { data: { accessToken: 'fakeToken123' }};
    axios.get.mockResolvedValueOnce(mockResponse);  // Mocking axios response

    render(<PetListings />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('/api/petfinder/token');  // Expecting axios.get to have been called with the correct endpoint
    });

    
  });

  test('should fetch pets data when API token is retrieved', async () => {
    axios.get.mockImplementationOnce((url) => {
      switch (url) {
        case '/api/petfinder/token':
          return Promise.resolve({ data: { accessToken: 'fakeToken123' } });
        case 'https://api.petfinder.com/v2/animals':
          return Promise.resolve({ data: { animals: [{ id: 69417879, name: 'Keiko' }] } });
        default:
          return Promise.reject(new Error('not found'));
      }
    });

    const { rerender } = renderWithRouter(<PetListings />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('/api/petfinder/token');
    });

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        'https://api.petfinder.com/v2/animals',
        expect.any(Object)  
      );
    });
  });

  test('should toggle map view when Show Map/Show Listings button is clicked', () => {
    const { getByText } = render(<PetListings />);
    fireEvent.click(getByText('Show Map'));
    expect(getByText('Show Listings')).toBeInTheDocument();
    fireEvent.click(getByText('Show Listings'));
    expect(getByText('Show Map')).toBeInTheDocument();
  });

  test('should update searchTerm state when text is entered in the search input', () => {
    const { getByPlaceholderText } = render(<PetListings />);
    const input = getByPlaceholderText('Search pets by name');
    fireEvent.change(input, { target: { value: 'Fido' } });
    expect(input.value).toBe('Fido');
  });

  test('should clear search input when clear button is clicked', () => {
    const { getByPlaceholderText, getByText } = render(<PetListings />);
    const input = getByPlaceholderText('Search pets by name');
    fireEvent.change(input, { target: { value: 'Fido' } });
    fireEvent.click(getByText('×'));
    expect(input.value).toBe('');
  });
});
