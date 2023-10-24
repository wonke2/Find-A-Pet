import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Wishlist from './Wishlist';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(fn => fn()),
  useDispatch: jest.fn(),
}));

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: Router });
};

describe('<Wishlist />', () => {

  // Mocking global fetch before each test
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ status: 'success', wishlist: [] }),
      })
    );
  });

  // 1. Rendering Test
  test('renders without crashing', () => {
    const { getByText } = renderWithRouter(<Wishlist />);
    expect(getByText('Your Wishlist')).toBeInTheDocument();
  });

  // 2. API Calls
  test('should fetch the wishlist on component mount', async () => {
    render(<Wishlist />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('http://localhost:3000/auth/get-wishlist', {
        headers: {
          "Authorization": "Bearer undefined"
        }
      });
    });
  });

  test('should make an API call to remove an item from the wishlist', async () => {
    fetch
      .mockResolvedValueOnce({
        json: async () => ({ status: 'success', wishlist: [{ petID: 123, petName: 'Fido' }] }),
      })
      .mockResolvedValueOnce({
        json: async () => ({ status: 'success' }),
      });

    renderWithRouter(<Wishlist />);

    await waitFor(() => screen.getByText('Fido'));

    fireEvent.click(screen.getByText('Remove'));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("http://localhost:3000/auth/remove-from-wishlist", expect.any(Object));
    });
  });

  // 3. State Changes
  test('should update state with wishlist data', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({ status: 'success', wishlist: [{ petID: 123, petName: 'Fido' }] }),
    });

    renderWithRouter(<Wishlist />);

    await waitFor(() => {
      expect(screen.getByText('Fido')).toBeInTheDocument();
    });
  });

  // 4. User Interactions
  test('should remove item from wishlist in UI when remove button is clicked', async () => {
    fetch
      .mockResolvedValueOnce({
        json: async () => ({ status: 'success', wishlist: [{ petID: 123, petName: 'Fido' }] }),
      })
      .mockResolvedValueOnce({
        json: async () => ({ status: 'success' }),
      });

    renderWithRouter(<Wishlist />);

    await waitFor(() => screen.getByText('Fido'));

    fireEvent.click(screen.getByText('Remove'));

    await waitFor(() => {
      expect(screen.queryByText('Fido')).toBeNull();
    });
  });

});
