const {
	createBooking,
	getBookingByUserId,
} = require("../path/to/your/bookingController");
const Booking = require("../path/to/your/BookingSchema");

jest.mock("../path/to/your/BookingSchema");

describe("Booking Controller", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should create a new booking", async () => {
		const mockReq = {
			body: {
				userId: "user1",
				serviceId: "service1",
				serviceProviderId: "provider1",
				date: "2023-10-25",
				bookingLocation: "Location 1",
				bookingStatus: "Confirmed",
			},
		};
		const mockRes = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};

		await createBooking(mockReq, mockRes);

		expect(Booking.create).toHaveBeenCalledWith({
			userId: "user1",
			serviceId: "service1",
			serviceProviderId: "provider1",
			date: "2023-10-25",
			bookingLocation: "Location 1",
			bookingStatus: "Confirmed",
		});
		expect(mockRes.status).toHaveBeenCalledWith(201);
		expect(mockRes.json).toHaveBeenCalledWith({
			status: "success",
			booking: expect.any(Object),
		});
	});

	it("should get bookings by user id", async () => {
		const mockReq = {
			user: {
				_id: "user1",
			},
		};
		const mockRes = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};
		const mockBooking = [
			{
				_id: "booking1",
				userId: "user1",
				serviceId: "service1",
				serviceProviderId: "provider1",
				date: "2023-10-25",
				bookingLocation: "Location 1",
				bookingStatus: "Confirmed",
			},
		];

		Booking.find.mockResolvedValueOnce(mockBooking);

		await getBookingByUserId(mockReq, mockRes);

		expect(Booking.find).toHaveBeenCalledWith({ userId: "user1" });
		expect(mockRes.status).toHaveBeenCalledWith(200);
		expect(mockRes.json).toHaveBeenCalledWith({
			status: "success",
			booking: mockBooking,
		});
	});

	it("should handle errors in createBooking", async () => {
		const mockReq = {
			body: {},
		};
		const mockRes = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};
		const errorMessage = "Some error message";
		Booking.create.mockRejectedValueOnce(new Error(errorMessage));

		await createBooking(mockReq, mockRes);

		expect(mockRes.status).toHaveBeenCalledWith(500);
		expect(mockRes.json).toHaveBeenCalledWith({
			status: "fail",
			error: errorMessage,
		});
	});

	it("should handle errors in getBookingByUserId", async () => {
		const mockReq = {
			user: {
				_id: "user1",
			},
		};
		const mockRes = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};
		const errorMessage = "Some error message";
		Booking.find.mockRejectedValueOnce(new Error(errorMessage));

		await getBookingByUserId(mockReq, mockRes);

		expect(mockRes.status).toHaveBeenCalledWith(500);
		expect(mockRes.json).toHaveBeenCalledWith({
			status: "fail",
			message: errorMessage,
		});
	});
});
