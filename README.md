# Welcome to Find-A-Pet - Your One-Stop Pet Adoption and Service Platform

## Application Outline

### Application Link
https://findapet-hsme.onrender.com/

### Introduction

Find-a-Pet is envisioned to be a comprehensive platform dedicated to connecting pet enthusiasts with the resources they need for pet adoption and ongoing pet care services. This application is built with the goal of simplifying the journey of pet adoption and providing a community and a marketplace for pet-related services.
Authors
- Avash Neupane (46144706)
- Mohammad Hassouneh (47083840)
- Waliullah Ferdous (46810080)

### Application Aim

The primary aim of the Find-a-Pet platform is to establish a central hub that makes the pet adoption process more streamlined and intuitive while also providing a suite of pet care services. Using the MERN stack, the application facilitates connections among potential pet owners, current pet owners, and service providers such as pet sitters, groomers, and veterinarians, fostering a unified ecosystem for pet-related activities.

### Target Users
The platform caters to a diverse range of users including:
- Individuals looking for new pets to adopt.
- Pet owners/Users in search of services such as pet sitting, grooming, and veterinary care.
- Service providers who wish to offer their pet-related services to a broad audience. Users can create comprehensive profiles to list pets for adoption, discover pets or services, and advertise pet-related services.

## Initial Plan

### Data Sources

To create a rich and functional experience, the platform integrates various data sources:
- Pet Adoption Details: Leveraged through the Petfinder API or RescueGroups API.
- User Profiles, Listings, and Services Database: Stored and managed using MongoDB.
- Geolocation Services: Implemented using the Google Maps API to offer location-based service searching and filtering.

### Minimum Viable Product (MVP) 

In this MVP, we have focused on laying down the critical foundation for the Find-a-Pet platform by implementing core features such as:
- User Authentication and Profiles: Secure sign-up/log-in processes and user profile management.
- Pet Listings: Functionalities for searching and filtering pet adoption options.
- Service Listings: Basic capabilities for users to search and filter various pet-related services.
- User Feedback System: Preliminary structure for users to review and rate services.
- Appointment Management: Fundamental booking and scheduling features for services.

For service providers, the MVP includes:
- Registration and Profile Creation: Allowing business users to register and create profiles with their service details.
- Listing and Booking Management: Tools for service providers to manage their offerings and appointments.
- Notifications: An internal system for alerts about bookings, cancellations, and feedback.

## Achieved MVP and Team Contribution

### Achievements and Contributions
Over the course of the development sprints, the team has successfully executed a series of milestones that have incrementally built the application's capabilities.

- Technical Foundations: Mohammad initiated the project with a strong technical foundation by setting up the initial FrontEnd and BackEnd structures. This early groundwork was crucial for the seamless integration of subsequent features.
- Interface and User Experience: Waliullah created an engaging home page and integrated the pet listings with a third-party API - PetFinder, which was initially set to display a variety of pets to the users. His further contributions included enhancing the Pet Details and Search functionalities, which improved the platform’s interactivity and user experience. He also made sure the data being fetched from the third-party API is properly sanitized using React packages like `sanitize-html` and `he`.
- Security and Database Management: Avash established a User Database with heightened security, integrating jwt token-based authentication. He also managed to build a secure Booking Database backend, which prepared the app for future expansion.
- Service Provider Interfacing: Mohammad was instrumental in developing both the ServiceProvider Database and implementing a registration and authentication system for service providers, thereby laying the foundation for a key aspect of the application's functionality.
- Enhanced Search Capabilities: Waliullah at the forefront, refined the Search and Filter functionality for PetListings, resulting in an intuitive and responsive interface that allowed users to navigate and interact with the application effortlessly. Additionally, a sidebar was introduced to improve the filtering options for PetListings, further enhancing the UI/UX.
- Interactive Maps Integration: The incorporation of Maps functionality done by Waliullah provided users with geolocational context and a visually engaging experience when looking for pets and services. The integration with the LocationIQ Geolocation API allowed the conversion of pet addresses into exact geographical coordinates, enabling accurate mapping on the platform. An interactive map created with Leaflet, featuring custom markers and popups, enhances the platform's user experience by providing a toggle option between map and list views.
- Dashboard Development: Avash and Mohammad took the lead in developing dashboards for both users and service providers, incorporating features like persistent state management and groundwork for booking management.
Wishlist Implementation: Waliullah further enhanced user engagement by introducing a Wishlist feature for pet listings, seamlessly integrated into the user dashboards with proper authentication flows. The Wishlist was incorporated into the user’s database schema as a 'sublist'. Only an authenticated user can save a pet listing to their Wishlist. Robust error messaging and handling mechanisms have been implemented as well.
- Booking Integration: Waliullah contributed to both the backend and frontend, integrating the booking functionality with seamless user and service provider authentication. He developed a booking schema and API endpoints for creating, retrieving, and deleting bookings tailored to different users. Additionally, distinct booking interfaces were designed for Users and Service Providers on the frontend.

A user can successfully book services, with these bookings reflected in the user’s dashboard. Similarly, a service provider can view bookings made for their services from their dashboard. Currently, service providers can only remove bookings. In the future, enhancements will include the ability for users to request cancellations and for service providers to accept, cancel, or mark bookings as completed. Robust error messaging and handling mechanisms have been implemented as well.

### Challenges and Adaptations

The development journey was punctuated by a variety of challenges that required the team to adapt their strategies and approaches.

- Geographic Limitations: The restriction of pet listings third-party API to certain countries necessitated a shift in the target location from Australia to the USA, altering the app's initial geographic focus.
- PetListing Disclaimer: To maintain simplicity in the MVP, the application does not enable users to adopt pets directly through the platform; it merely functions as an interface to display available pets for adoption. Consequently, Waliullah included a disclaimer on the PetDetails page noting the use of a third-party API for the listings and clarifying that the website is not responsible for the legitimacy of the listings or the adoption process and its outcomes. The PetDetails page also provides with the Link of the actual adoption post. 
- Backend Security Concerns: As the team prioritized backend security, they faced the need to develop more intricate user role controls and secure database URI sharing methods, which led to implementing individualized user roles and reinforced security measures.
- Database Structuring Complications: The structuring of databases to support the complex functionalities of the app without compromising security posed a significant challenge, leading to the exploration of multiple databases and adjustments in database schemas.
- Authentication Hurdles: Implementing JWT for user and service provider authentication required careful attention, as the team had to ensure reliable and secure systems for the handling of sensitive user data.
- Search Functionality Refinement: The pet search functionality encountered issues, prompting a revision of the logic to improve usability and performance.
- Cost-Effective Mapping Solutions: The high cost of geolocation services led the team to replace Google Maps with LocationIQ, which offered a more cost-effective solution for the application. Since the location weren't being fetched based on longitude and latitude, the locations needed to be geocoded to get the longitude and latitude which would have been very costly with google maps. And since while working on the development, the need for fetching hundreds of times is quite apparent, the team was likely to exceed the monthly credit limit and get charged. Therefore, the team decided to change to a free API service LocationIQ.
- Optimization and Testing: Challenges with testing, particularly the Service Provider Signup page, highlighted the need for thorough review and optimization to ensure smooth user experiences.
- Change of Initial Plan: The team had to discard the Review and Feedback functionality and replaced it with the WishList (an addition to the project). The option for the Users to post PetListings for adoption was also needed to be removed as this would require thorough verification of documents and legitimacy of the listings. The notifications system for Service Provider had to be discarded as well due to the shortage of time and the other aspects of the broad scope of this project. 

### Designing

The team divided the designing parts based on components. User components like User Login/Signup pages, Profile, Navbar and the Home page were designed by Avash. Avash also ensured the overall consistency of designs throughout all the components of the application.  

Similarly, the Service Provider components like Service Provider Login/Signup pages, Profile, ServiceListings and ServiceDetails, ViewServices and AddServices were designed by Mohammad. 

All the other components, i.e., PetListings, PetDetails, WishList, UserBooking, ServiceProviderBooking, User and Service Provider Dashboards were designed by Waliullah. 

### Project Management and Team Communications

Throughout each sprint, the team demonstrated resilience and flexibility, adeptly pivoting when necessary to maintain the momentum of the project's development. Each feature was implemented with careful consideration for security, user experience, and alignment with overall project goals. In addition to weekly sprints, the team held brief daily meetings for at least 15 minutes to discuss individual progress and any encountered challenges. The Discord platform served as the primary medium for sharing information, including sensitive details like .env files, with the understanding that secure methods were employed for particularly sensitive data.

Weekly extended meetings, lasting at least one hour, provided opportunities to review accomplishments and plan for upcoming tasks. Although communication was mostly smooth, there were instances when some team members fell behind. However, the team collectively ensured a timely recovery and completion of tasks. The team also diligently maintained a GitHub project board, detailing assignments and tracking ongoing work. Although this project did not have any designated team leader, Waliullah played a pivotal role in dividing tasks equally among everyone, providing daily reminders, and facilitating smooth communication between team members.

## Guide to Project Source Code

## Prospective Features

- Payment Gateway Integration: To facilitate in-app transactions for services securely.
- Notifications: To inform users about service statuses and other updates.
- PetListings Posting: Allows users/pet owners to post pets for adoption.
- Reviews and Ratings: Users should be able to review a service. Service Providers should be able to view and respond to user reviews.
- Extended Booking Features: Allows users to request cancellations and for service providers to accept, cancel, or mark bookings as completed.
- Community Building: Establishing forums and sharing platforms for pet stories and advice.
- Enhanced Analytics for Service Providers: To offer insights into business operations and customer preferences.
- Accessibility Features: To make the platform more inclusive, such as adding voice commands and text-to-speech capabilities.
- 24/7 Customer Support: Implementing round-the-clock chat support for users.

