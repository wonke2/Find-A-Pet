# Project Proposal: Find-a-Pet - Your One-Stop Pet Adoption and Service Platform
 
Find-A-Pet aims to be more than just an adoption platform; it seeks to be the centralized hub for all things pet-related. The platform will connect potential and existing pet owners with a wide range of services including adoption, pet sitting, grooming, and veterinary care, all offered by verified service providers.
 
#### Authors:
- Mohammad Hassouneh (47083840)
- Avash Neupane (46144706)
- Waliullah Ferdous ()
 
## Outline of the Proposed Web Application
###  Main Purpose:
The main purpose of Find-a-Pet is to be a centralized platform that streamlines the pet adoption process and offers access to various pet services. The application aims to connect potential pet owners, existing pet owners, and service providers (such as pet sitters, groomers, and veterinarians) in a seamless manner.
 
### Target User Groups:
- Individuals looking to adopt pets
- Existing pet owners seeking various pet services
- Service providers like veterinarians, pet sitters, and groomers
- Users will create profiles to either list pets for adoption, search for pets/services, or offer pet-related services.
 
### Data Sources:
- Petfinder API or RescueGroups API: For fetching pet adoption details
- Internal Database (MongoDB): To store user profiles, pet listings, and service listings
- Google Maps API: For geolocation-based services
 
### Target Minimum Viable Product (MVP)
#### Features:
- User authentication and profile management: Sign up, log in, and edit profile.
- Basic pet listings for adoption: Search and filter functionalities.
- Basic service listings: Search and filter functionalities.
- User reviews and ratings for services: Basic version without deep analytics.
- Booking and Scheduling: Basic booking and scheduling for services.
 
### For Service Providers:
#### Sign-Up / Registration
- Allow service providers to register as a "Business" during the sign-up process.
#### Profile Creation
- Collect and verify essential business details like services offered, hours of operation, location, contact info, etc.
#### Listing Management
- Enable providers to manage their service listings (e.g., descriptions, availability, prices).
#### Booking Management
- A dashboard to manage bookings, customer info, and other related tasks.
#### Reviews and Ratings
- An area to view and respond to customer reviews.
#### Notifications (Internal within the web app)
- Receive notifications for new bookings, cancellations, and reviews.
 
### Technical Considerations for Service Providers:
#### Backend Extensions:
- Add additional fields in the user model for service providers.
- Create specific API endpoints for provider-related functionalities.
#### User Interface Enhancements:
- Add a ‘For Service Providers’ section with features like dashboard, booking management, and service listing.
#### Database Schema Updates:
- Extend schema to include ServiceProviders, Services, Bookings, Reviews.
#### User Authentication and Role Management:
- Introduce roles using Auth0 to differentiate between general users and service providers.
#### Onboarding and Verification:
- Create an onboarding flow specific to service providers. This could include verification steps to ensure authenticity.
- By combining these technical features and project management elements, the Find-a-Pet platform can offer a comprehensive pet care experience that caters to a wide variety of users and needs.
 
### For Customers:
#### Search and Filter
- Users should be able to search for services by type, location, ratings, etc.
#### Booking
- Enable users to book services directly via the platform.
#### Reviews and Ratings
- Users should be able to rate and review services they have used.
 
### Features Not Included (or might add depending on progress):
#### Payment Gateway Integration (Stripe):
- This requires extensive security measures and would be implemented in later sprints.
#### Notifications for pet adoption statuses (SendGrid):
- While important, it's complex to implement due to dependency on external APIs.
#### Community Building:
- One of the unspoken features that we aim to build into Find-a-Pet is a sense of community. People can share their pet stories, advice, and experiences, fostering a positive environment. The community section will be moderated to ensure the conversations are helpful and respectful.
#### Ratings and Reviews - Extended Features:
- While our MVP focuses on basic rating systems, we aim to integrate an advanced analytics dashboard for service providers in later versions. It will provide insights into customer behavior, popular services, and peak business hours, among other things.
#### Accessibility Features:
- Find-a-Pet aims to be an inclusive platform. We plan on adding accessibility features such as voice commands and text-to-speech functionalities. While these features will not be a part of the MVP due to time constraints, they hold significant importance in our overall vision.
#### 24/7 Customer Support:
- We understand that pet-related emergencies can happen at any time. As such, we aim to offer a 24/7 customer support chat within the application. This feature, however, will be scoped out for a future release due to the human resource requirements.
 
## Project Plan with Weekly Milestones:
### Week 9: Basic application structure up and running. User authentication using Auth0.
- User can sign up, log in, and view a basic profile page.
### Week 10: Basic pet listings and service listings available.
- Pet listings are displayed from the database, service listings can be added and displayed.
### Week 11: User reviews and booking functionalities added. Designing styles added.
- Users can review services and book them. Add styling and responsive design. Try to add payment and email notification options if possible.
### Week 12: Final touches and debugging.
- All MVP features are debugged and fully functional.
#### Note: Plans for Weeks 10, 11, and 12 may be reevaluated based on the progress in previous weeks.
 
## Github Project Board
### The Project board is set up here:
- Backlog and To-Do columns have been populated with task cards.
- Priority is given to tasks related to user authentication and basic listing functionalities.
 
## Ethical and Legal Considerations:
### Data Privacy and Security:
- Given that we'll be handling sensitive user data, adhering to data protection regulations such as GDPR/APA is critical. We will also obtain explicit consent from users before accessing any of their personal data for features like geolocation.
### Verifying Service Providers:
- One of our challenges is to ensure that all listed service providers are certified and experienced. We will have a strict verification process to avoid fraudulent listings. We might consider partnerships with recognized organizations to aid in this verification process (in the future).
### Animal Welfare:
- Our platform is expected to uphold high standards when it comes to animal welfare. Every pet listed for adoption will require proper documentation to prevent any illegal trading of animals.

## Risks and Mitigation Strategies:
### Resource Constraints:
- Being a small team with a broad vision, one of our significant risks is resource constraints. We plan to mitigate this by utilizing agile methodologies to ensure that we always focus on high-impact tasks first.
### API Reliability:
- Since we're dependent on third-party APIs, any downtime or issues with these services could impact our platform's functionality. To mitigate this risk, we'll have fallback mechanisms in place (in the future).
 
## External Resources
- Auth0 - https://auth0.com/
- Petfinder API - https://www.petfinder.com/developers/
- Google Maps Platform - https://developers.google.com/maps
- SendGrid - https://sendgrid.com/
- Stripe - https://stripe.com/