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
- Pet Search and Filter Functionality is added. (Waliullah)
- Additional (if possible): Add Map functionality for Pet Listings. (Waliullah)