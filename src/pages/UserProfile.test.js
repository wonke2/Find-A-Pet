import React from "react";
import { render, screen, act } from "@testing-library/react";
import { Provider, useSelector } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import UserProfile from "./UserProfile";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const token = useSelector((state) => state.token);
describe("UserProfile Component", () => {
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
						<UserProfile />
					</MemoryRouter>
				</Provider>
			);
		});

		expect(screen.getByText("Loading...")).toBeInTheDocument();
	});

	it("renders user profile data when user data is available", async () => {
		const mockUser = {
			_id: "1",
			username: "testUser",
			email: "test@example.com",
			phoneNo: "1234567890",
			address: "Test Address",
		};

		jest.spyOn(global, "fetch").mockImplementation(() =>
			Promise.resolve({
				json: () => Promise.resolve({ data: mockUser }),
			})
		);

		await act(async () => {
			render(
				<Provider store={store}>
					<MemoryRouter>
						<UserProfile />
					</MemoryRouter>
				</Provider>
			);
		});

		expect(screen.getByText("User Profile")).toBeInTheDocument();
		expect(
			screen.getByText(`User Id: ${mockUser._id}`)
		).toBeInTheDocument();
		expect(
			screen.getByText(`Username: ${mockUser.username}`)
		).toBeInTheDocument();
		expect(
			screen.getByText(`Email: ${mockUser.email}`)
		).toBeInTheDocument();
		expect(
			screen.getByText(`Phone No: ${mockUser.phoneNo}`)
		).toBeInTheDocument();
		expect(
			screen.getByText(`Address: ${mockUser.address}`)
		).toBeInTheDocument();
	});
});
