import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SPSignup from '../SPSignup'
import { MemoryRouter, Route } from 'react-router-dom'

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}))

const mockNavigate = jest.fn()

beforeEach(() => {
    jest.resetModules()
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate)
})

describe('SPSignup', () => {
    it('should render without crashing', () => {
        render(
            <MemoryRouter>
                <SPSignup />
            </MemoryRouter>
        )
    })

    it('updates the state when inputs are changed', () => {
        const { getByPlaceholderText } = render(
            <MemoryRouter>
                <SPSignup />
            </MemoryRouter>
        )

        const businessNameInput = getByPlaceholderText('Business Name')
        const passwordInput = getByPlaceholderText('Password')
        const emailInput = getByPlaceholderText('Email')
        const phoneInput = getByPlaceholderText('Phone Number')
        const locationTextarea = getByPlaceholderText('Location')

        fireEvent.change(businessNameInput, { target: { value: 'TestName' } })
        expect(businessNameInput.value).toBe('TestName')

        fireEvent.change(passwordInput, { target: { value: 'Password1A' } })
        expect(passwordInput.value).toBe('Password1A')

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
        expect(emailInput.value).toBe('test@example.com')

        fireEvent.change(phoneInput, { target: { value: '1234567890' } })
        expect(phoneInput.value).toBe('1234567890')

        fireEvent.change(locationTextarea, { target: { value: 'TestLocation' } })
        expect(locationTextarea.value).toBe('TestLocation')
    })

     it('should make an API call when the signup button is clicked', async () => {
        const { getByPlaceholderText, getByText } = render(
            <MemoryRouter>
                <SPSignup />
            </MemoryRouter>
        )

        const businessNameInput = getByPlaceholderText('Business Name')
        fireEvent.change(businessNameInput, { target: { value: 'TestName' } })

        const passwordInput = getByPlaceholderText('Password')
        fireEvent.change(passwordInput, { target: { value: 'Password1A' } })

        const emailInput = getByPlaceholderText('Email')
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } })

        const phoneInput = getByPlaceholderText('Phone Number')
        fireEvent.change(phoneInput, { target: { value: '1234567890' } })

        const locationTextarea = getByPlaceholderText('Location')
        fireEvent.change(locationTextarea, { target: { value: 'TestLocation' } })

        const button = getByText('Signup')
        fireEvent.click(button)

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledTimes(1)
            expect(fetch).toHaveBeenCalledWith("/SPauth/signup", expect.anything())
        })
    })

    it('should handle a successful API response', async () => {
        global.fetch.mockImplementationOnce(() =>
            Promise.resolve({
                json: () => Promise.resolve({ status: "success" }),
            })
        )

        const { getByText } = render(
            <MemoryRouter>
                <SPSignup />
            </MemoryRouter>
        )

        const button = getByText('Signup')
        fireEvent.click(button)

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/SPlogin')
        })
    })

    it('should handle a failed API response', async () => {
        global.fetch.mockImplementationOnce(() =>
            Promise.resolve({
                json: () => Promise.resolve({ status: "fail", message: "Error message" }),
            })
        )

        const { getByText } = render(
            <MemoryRouter>
                <SPSignup />
            </MemoryRouter>
        )

        const button = getByText('Signup')
        fireEvent.click(button)

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith("Error message")
            expect(mockNavigate).not.toHaveBeenCalled()
        })
    })
})

