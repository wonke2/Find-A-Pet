export default {
    map: jest.fn(() => ({
      setView: jest.fn(),
      remove: jest.fn(),
    })),
    tileLayer: jest.fn(() => ({
      addTo: jest.fn(),
    })),
    icon: jest.fn(),
    marker: jest.fn(() => ({
      addTo: jest.fn(),
      bindPopup: jest.fn(),
      on: jest.fn(),
    })),
  };
  