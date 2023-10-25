import React from "react";
import { render, screen, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import UserDashboard from "./UserDashboard";
import { useSelector } from "react-redux";
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const token = useSelector((state) => state.token);
describe("UserDashboard Component", () => {
	let store;

	beforeEach(() => {
		store = mockStore({
			token, 
		});
	});

	it("renders loading text when data is loading", async () => {
		await act(async () => {
			render(
				<Provider store={store}>
					<MemoryRouter>
						<UserDashboard />
					</MemoryRouter>
				</Provider>
			);
		});

		expect(screen.getByText("Loading...")).toBeInTheDocument();
	});

	it('renders "No bookings found" when no bookings are available', async () => {
		await act(async () => {
			render(
				<Provider store={store}>
					<MemoryRouter>
						<UserDashboard />
					</MemoryRouter>
				</Provider>
			);
		});

		expect(screen.getByText("No bookings found")).toBeInTheDocument();
	});

	it("renders booking details when bookings are available", async () => {
		const mockBookings = [
			{
				orderId: "1",
				serviceId: "service1",
				serviceProviderId: "provider1",
				date: "2023-10-25",
				bookingLocation: "Location 1",
				bookingStatus: "Confirmed",
			},
		];

		jest.spyOn(global, "fetch").mockImplementation(() =>
			Promise.resolve({
				json: () => Promise.resolve({ booking: mockBookings }),
			})
		);

		await act(async () => {
			render(
				<Provider store={store}>
					<MemoryRouter>
						<UserDashboard />
					</MemoryRouter>
				</Provider>
			);
		});

		expect(screen.getByText("Order Id")).toBeInTheDocument();
		expect(screen.getByText("Service Id")).toBeInTheDocument();
		expect(screen.getByText("Service Provider Id")).toBeInTheDocument();
		expect(screen.getByText("Date")).toBeInTheDocument();
		expect(screen.getByText("Booking Location")).toBeInTheDocument();
		expect(screen.getByText("Booking Status")).toBeInTheDocument();
		expect(screen.getByText("1")).toBeInTheDocument();
		expect(screen.getByText("service1")).toBeInTheDocument();
		expect(screen.getByText("provider1")).toBeInTheDocument();
		expect(screen.getByText("2023-10-25")).toBeInTheDocument();
		expect(screen.getByText("Location 1")).toBeInTheDocument();
		expect(screen.getByText("Confirmed")).toBeInTheDocument();
	});
});
