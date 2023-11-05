# Videos

This folder contains a selection of videos that provide a walkthrough of several components of this web application. There are four videos, each focusing on one of the four main features of the application. 

## Video 1: PetListings_General
This video showcases the general functionalities related to PetListings, accessible to all users. It includes:

- Displaying the `/home` page.
- Navigating to the `/petlistings` page, which presents a list of pets fetched from a third-party API. Due to the API's limitations on request frequency, fetching the complete list may take some time.
- Demonstrating how to switch between the list and map views for PetListings. The placement of map markers also proceeds slowly, as the free third-party API service requires time to geocode the locations.
- Illustrating that clicking on pet names from either the listing or map views directs users to the `/petdetails` page, where more detailed information about the pet is available. This page also offers the option to add a listing to the wishlist. However, if not logged in, an alert will prompt users to log in to use the wishlist feature.
- The video further explores the search functionality and how to utilize the filter options, which include a sidebar and multiple checkboxes, on the `/petlistings` page.



## Video 2: ServiceListings_General
This video demonstrates the general functionalities associated with ServiceListings that are available to all users. It includes:
- Navigating to the `/services` page, which displays all available service listings.
- Utilizing the search functionality, which updates results with each letter typed.
- Demonstrating how to switch between list and map views for ServiceListings.
- Showing that clicking on a service name redirects to the `/services/serviceID` page, where service details and booking options are presented. However, an attempt to book a service without user authentication will trigger an alert message indicating that a user must be logged in to make a booking.


## Video 3: User_Functionalities
This video demonstrates the process of registering as a User and the various actions that registered Users can perform:
- The video shows the `/usersignup` page and the completion of the signup process for a new user.
- It displays the `/userlogin` page and logs in the new user. After logging in, the user is redirected to the `/user` profile page.
- Once logged in, the user can access the `/petdetails` page to add listings to their Wishlist. The video does not show that duplicate items cannot be added to the Wishlist, which was an oversight of the video.
- Users can also navigate to the service details page at `/services/serviceID` to book a service.
- From the `/userdashboard` page, users can proceed to the `/userbooking` page, which displays all the user's bookings. For simplicity, this MVP version does not include an option for users to cancel bookings.
- Users can visit the `/wishlist` page via the `/userdashboard` to view all the pet listings they have added to their Wishlist and remove any listings if desired.
- Lastly, the video shows how a user can log out, after which they will no longer have access to these authorized pages.


## Video 4: ServiceProvider_Functionalities
This video demonstrates the registration process for a Service Provider and the functionalities available to registered Service Providers. Key highlights include:
- The `/spsignup` page is shown, detailing the signup process completion for a new service provider.
- The login process for an existing service provider is featured on the `/SPlogin` page. This service provider has a booking made by the new user showcased in the previous video. Post-login, the service provider is directed to their `/serviceprovider` profile page.
- The service provider can access the `/spdashboard` page, which leads to the `/spdashboard/sp-services` page listing the services they offer. Here, they have the option to remove a service.
- To add a new service, the provider navigates to `/spdashboard/sp-services/addservice`. The creation of a new service is displayed.
- Bookings made by users for the service provider’s offerings can be reviewed on the `/spdashboard/sp-bookings` page. In this MVP, the service provider’s functionality is limited to the removal of bookings.
- Finally, the video shows the service provider logging out, after which they no longer have access to these restricted pages.
