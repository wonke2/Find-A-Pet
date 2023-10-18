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
- User dashboard created and functioning (Avash).
- ServiceProvider Dashboard to manage bookings, customer info, and other related tasks (Mohammad).
- Maps functionality for pets (Waliullah).
- Maps functionality for services (Waliullah).
- Search and Filter functionality for services (Mohammad).
- Booking database created and is ready to be used for storing booking information (Avash). 
- Additional (if possible): Booking functionality (Avash).


#### Achievements:



-Booking basic controllers have been created  (avash)
-Booking basic functionality to create and get implemented had been added
-helped creating user dashboard but was empty as we had not implemented orders
-modified the nav bar





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

#### Challenges Faced / Discuss:
- Tried 3 different Mapping APIs. Started with Google Maps and then had to shift to LocationIQ because Google Map only allows a $200 monthly usage for free. Since the location weren't being fetched based on longitude and latitude, I had to geocode the locations to get the longitude and latitude which would have been very costly with google maps. And since we will be fetching hundreds of times while working on the development, we might soon exceed the monthly credit limit and get charged. Therefore, changed to a free API service.
- 


### Week 11: PetListing Save Functionality with Database, 
#### Plan:
- PetListing Save Database (Waliullah)
- PetListing Save Functionality (Waliullah)
- PetListing Design & Styles (Waliullah)
