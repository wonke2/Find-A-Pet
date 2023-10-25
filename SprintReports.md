# Weekly Sprints

### Week 9: FrontEnd & BackEnd Initialization, Basic pet listings & Home Page, User Database and ServiceProvider Database.
#### Plan:
- FrontEnd & BackEnd Initialization (Mohammad)
- Able to load a basic home page. (Waliullah) 
- Able to show a basic pet listing by fetching the pets from the third-party API. (Waliullah)
- User Database created and is ready to be used to store user's data during signup. (Avash)
- ServiceProvider Database is created and is ready to be used to store service provider's information during signup. (Mohammad)

#### Achievements:
Front-End and Back-End installation and set-up complete. (Mohammad & Waliullah)

Pet Listings (Waliullah):
- Shows a basic home page that displays a welcome message. Has the link to get redirected to the petlistings page. 
- Shows the basic pet listings.
- Renders a default placeholder image where the listing doesn't contain any image. This improves the user experience as won't see broken image icons.
- Used `he` and `sanitize-html` libraries to first decode any HTML entities fetched from the API and then sanitize the decoded HTML to implement protection against potential XSS attacks.
- Used .env file to retrieve the API Key and Secret from to hide it from exposing to the repository and keet it secure. 

User Database (Avash):
- Implemented the basic user schema.
- Has a prefunction to hash the password when a user is created.
- Has a validator function to validate the password with the hashed password during login
- More attributes can be added as per future requirements

Service Provider Database (Mohammad):
- Set up collaborative MongoDB Atlas database.
- Created a rough ER diagram for the database.
- Created an initial service provider model.
- Created a basic schema for the service provider.

#### Challenges Faced / Discuss:
Pet Listing:
- The Pet Listing API only shows listings available in a few selected countries. Since Australia was not one of the options, we had to choose USA as the location. Threrefore, our entire app will use USA as the location. 
- Since the Pet Listings are fetched from a third-party service, we do not want to include Pets for Adoption in our orders. Our orders will only include service providers. Pets for adoption has contact details of the owners that the users can contact independently and confirm adoption. Our app will only show the Pet Lists available for adoption with valuable information but will not bear any responsibility related to adoption. 

Backend Security
- While setting up the collaborative database, we noticed that having one universal user and pass for the database URI is not secure. We need to create and implement multiple separate users with different roles and permissions.
-  We need to implement a secure way to store the database URI and share it amoung the team members easily. 
- Storing the data in one collective database is not secure. Implementing multiple databases in a schema is ideal, however we need to solve how to allow the different entities to interact with each other.

Service Provider Database:
- For verification, we want to add the feature for service providers to upload documents. How can we use MongoDB to store documents like pdf, doc, jpg, etc? Should we keep this feature in our MVP?

User Database:


### Week 10: User and ServiceProvider Authentication Using Auth0, Basic Service Listing, and Pet Search and Filter Functionality
#### Plan:
- User can sign up, log in, and view a basic profile page. (Avash)
- ServiceProvider can sign up, log in, and view a basic profile page. (Mohammad)
- Service listings are added and displayed. (Mohammad & Avash)
- Pet Details page is added. (Waliullah)
- Pet Search and Filter Functionality is added. (Waliullah)
- Additional (if possible): Add Map functionality for Pet Listings. (Waliullah)

#### Achievements:

Pet Details (Waliullah):
- Clicking the pet name in pet listing page allows you to get redirected to page details page.
- The pet details page shows more information about the listing including the contact details of the pet owner and the link leading to the actual page of the listing. 
- Remove pet description from pet listing and only shown in pet details page.
- Used `he` and `sanitize-html` libraries to first decode any HTML entities fetched from the API and then sanitize the decoded HTML to implement protection against potential XSS attacks.

Pet Search and Filter Functionality (Waliullah):
- Implemented Real-Time Search: Users can now search through pet listings instantly by names.
- Enhanced Filters: Introduced dynamic, toggleable dropdown filters for pet types and statuses.
- Improved UI/UX: Added a clear button in the search bar and organized filters into nested dropdowns for a cleaner user interface.
- Increased Robustness: Enhanced error handling and provided fallback images for listings without pictures.
- Code Optimization: Refactored code for better readability and performance.

User Registration and Authentication (Avash):
- Created a login page for the user which sends a request to the backend and the backend sends a jwt token to the front end to access protected routes
- Created a signup page for the user which allows the user to create an account
- Create the profile page for a user to see their details 


Service Provider Registration and Authentication (Mohammad):
- Service Provider Controller is created to handle the registration and login of service providers
- Back-end to enable Service Provider registration and login is complete
- Passwords are hashed and salted before being stored for security
- The React Router Routes have been created to access the registration and login pages
- Service Providers have additional required fields compared to user signup

#### Challenges Faced / Discuss:

Pet Search and Filter Functionality:
- Pet listings were fetched based on search/filter input only. Therefore, adjusted logic to display all pets initially and refine as per user input.
- Clearing the search term didn’t instantly refresh the listings. Therefore, enhanced logic to auto-refresh listings upon clearing the search term.
- Integrating real-time search with filters. Had to modify states and useEffect to work harmoniously for both functionalities.
- Limited filtering options. Added checkboxes for multiple type and status selections.
Service listings are added and displayed:
- We could not complete this in time as we need to populate Service Providers and Services with sample data in order to accomplish this, which we could not do in time. We will complete this in the next sprint and re-evaluate the completion speed of features for more realistic targets.

### Week 11: User and ServiceProvider Dashboards, Maps functionality for Pets and Services, Booking Database and Search and Filter Functionality for Services
#### Plan:
- Maps functionality for pets (Waliullah).
- Maps functionality for services (Waliullah).
- Search and Filter functionality for services (Mohammad).
- Service Listings are added and displayed (Mohammad).
- Booking database created and is ready to be used for storing booking information (Avash). 
- Additional (if possible): Booking functionality (Avash).


#### Achievements:

Booking Database and Basic Functionality Backend (Avash):
- Booking basic controllers have been created
- Booking basic functionality to create and get implemented had been added
- Helped creating user dashboard but was empty as we had not implemented orders
- Modified the nav bar

Maps functionality for pets (Waliullah):
- Successfully integrated with the `LocationIQ Geolocation API` to convert the addresses of pets into geographical coordinates for accurate mapping.
- Used Leaflet to create an interactive map with custom markers and popups for visualizing the geographical locations of listed pets, enhancing user experience with a toggle feature between map and list views.
- Enabled dynamic rendering of pet data on the map, with markers being generated based on the real-time data fetched from the database.
- Linked the map markers to petdetails page. 
- Used the pet image as the icon and clicking the icon would show the name and a better view of the image. 

Maps functionality for services (Waliullah):
- Implemented a robust mechanism to fetch precise geolocation coordinates from external API: LocationIQ, ensuring the accurate representation of service locations on the map, further supported by a responsive design for optimal user engagement across various device sizes.
- Integrated the Leaflet library to create an interactive and dynamic mapping experience, allowing users to visualize real-time service locations enriched with custom markers and detailed popups for each service.
- Developed a toggle feature that enables users to effortlessly switch between the map and listing views, ensuring a tailored and intuitive browsing experience supported by enhanced error handling for uninterrupted navigation.

Sidebar and Enhanced Filter and Search Functionality (Waliullah):
- Implemented interactive UI elements, such as buttons and checkboxes, making the application of filters and searches intuitive and user-friendly, and enhancing overall user engagement.
- Added a sidebar for filter.
- Implemented interactive UI elements, such as buttons and checkboxes, making the application of filters and searches intuitive and user-friendly, and enhancing overall user engagement.

Service Provider Login and Signup (Mohammad):
- Created a functional service provider login page.
- Created a functional service provider signup page.
- Set validation methods for signup page to ensure that the user enters the correct information.
- Did not add it to navbar as we plan to integrate it with user login/signup in the coming week.

Service Listings (Mohammad):
- Generated sample data for service providers and services.
- Created a service listing page to display the services.
- Displayed the services on the service listing page.
- Reworked the Database to accomodate services and updated endpoint API's to get the services.
- Added a filter to keyword search for services in name and description.


#### Challenges Faced / Discuss:
- Tried 3 different Mapping APIs. Started with Google Maps and then had to shift to LocationIQ because Google Map only allows a $200 monthly usage for free. Since the location weren't being fetched based on longitude and latitude, I had to geocode the locations to get the longitude and latitude which would have been very costly with google maps. And since we will be fetching hundreds of times while working on the development, we might soon exceed the monthly credit limit and get charged. Therefore, changed to a free API service.
- Struggled to create a separate table for services and link the serviceProvider table to it via a foreign key, as a bandaid fix the services are stored in a sublist inside the ServiceProvider table. We will fix this in the next sprint.

### Week 12: PetListing Save Functionality with Database, Dashboards, Signup Pages, Booking Functionality and OverAll Design
#### Plan:
- PetListing Save Database (Mohammad)
- PetListing Save Functionality (Waliullah)
- PetListings and PetDetails Design & Styles (Waliullah)
- User dashboard created and functioning (Avash).
- Integrating ServiceProvider Signup with User Signup Page (Avash)
- ServiceProvider Dashboard to manage bookings, customer info, and other related tasks (Mohammad).
- Integrating booking functionality with ServiceProvider (Waliullah).
- All design related to Service Provider (Mohamamd).
- All designs related to Users (Avash).
- Home Page Designing (All of us).

#### Achievements:

(Avash)
-User dashboard created and functioning
-Integrating ServiceProvider Signup with User Signup Page
-Used global state to store user data using react-redux toolkit
-used redux-persist to save user data even after closing the browsere
-All designs realste to users completed

Service Provider Dashboard (Mohammad):
- Created a Service Provider Dashboard
- Shows all Bookings for the Service Provider's services
- Added API call for all bookings by service provider id

Services Booking [From services page] (Mohammad):
- Added Book Now button for each service
- Created function to implement quick booking in the future

Service Listing Testing (Mohammad):
- Made sure that the search returned all necessary data by scanning /api/services and crossreferenced it with basic search results (Manually)
- Made sure that no results returned when there were no applicable results (Manually)

Service Provider Sign Up Page (Mohammad):
- Fixed Variable name error which was causing issues when attempting to send data to the backend
- Created Testing File for the page to test the functionality of the page

#### Challenges Faced / Discuss:
- The Service Provider Sign Up Page didnt pass all the tests which means more adjustments are needed to the page in order for it to be optimal
- The Service Provider Dashboard is not fully functional as it is missing the ability to accept or reject bookings, And add Services Provided to the business
