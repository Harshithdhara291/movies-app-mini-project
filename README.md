In this project, I have built **Movies App** by applying the concepts I have learned.

Movies app that will fetch data from an internal server using a class component, displaying that data, using **component lifecycle** methods, **routing** concepts, **authentication**, and **authorization**, and adding responsiveness to the website.

The following functionalities I have implemented in this App :

- **Login Route**

  - When an invalid username and password are provided and the **Login** button is clicked, then the respective error message received from the response will be displayed
  - When a valid username and password are provided and the **Login** button is clicked, then the page will be navigated to the Home Route
  - When an _unauthenticated_ user tries to access the Home Route, Popular Route, Search Route, Account Route and Movie Item Details Route, then the page will be navigated to Login Route
  - When an _authenticated_ user tries to access the Home Route, Popular Route, Search Route, Account Route and Movie Item Details Route, then the page will be navigated to the respective route
  - When an _authenticated_ user tries to access the Login Route, then the page will be navigated to the Home Route

- **Home Route**

  - When an authenticated user opens the Home Route,

    - An HTTP Get request made to **Trending Now Movies API URL**, **Originals API URL** with `jwt_token` in the Cookies

      - **_Loader_** will be displayed while fetching the each data
      - After the data is successfully fetched from both the API's
        - A **random** movie title and movie poster with its details displayed from the **Originals Response**
        - Displayed the list of movies received from the Trending Now Movies Response
        - Displayed the list of movies received from the Originals Response
      - If any of the HTTP GET request made is unsuccessful, then the failure view will be displayed respectively
        - When the **Try Again** button is clicked, then the respective HTTP GET request made

    - When a **Movie** item is clicked, then the page navigate to the Movie Item Details Route

  - **Header**  

    - When the **Movies** logo in the header is clicked, then the page navigate to the Home Route
    - When the **Home** link in the Header is clicked, then the page navigate to the Home Route
    - When the **Popular** link in the header is clicked, then the page navigate to the Popular Route
    - When the **Search** icon in the header is clicked, then the page navigate to the Search Route
    - When the **Profile** logo in the header is clicked, then the page navigate to the Account Route

- **Popular Route**

  - When an authenticated user opens the Popular Route

    - An HTTP GET request made to **Popular Movies API URL** with `jwt_token` in the Cookies

      - **_Loader_** displayed while fetching the data
      - After the data is fetched successfully, the response received displayed
      - If the HTTP GET request made is unsuccessful, then the failure view displayed
        - When the **Try Again** button is clicked, an HTTP GET request made to **Popular Movies API URL**

    - When a **Movie** item is clicked, then the page navigate to the Movie Item Details Route
    - All the header functionalities mentioned in the Home Route work in this route accordingly

- **Movie Item details Route**

  - When an authenticated user opens the Movie Item Details Route

    - An HTTP GET request made to **Movie Item Details API URL** with `jwt_token` in the Cookies

      - **_Loader_**  displayed while fetching the data
      - After the data is fetched successfully,
        - Movie item details received from the response will be displayed
        - Display the list of similar movies received from the response
      - If the HTTP GET request made is unsuccessful, then the failure view will be displayed
        - When the **Try Again** button is clicked, an HTTP GET request will be made to **Movie Item Details API URL**

    - All the header functionalities mentioned in the Home Route will work in this route accordingly


- **Search Route**

  - When an authenticated user opens the Search Route

    - When a value is provided in the search input and the button with the search icon is clicked

      - An HTTP GET request to the **Search Movies API URL**  with `jwt_token` in the Cookies and query parameter `search` with value as the text provided in the search input
      - **_Loader_** will be displayed while fetching the data
      - After the data is fetched successfully, list of movies received from the response will be displayed
      - If the HTTP GET request made is unsuccessful, then the failure view will be displayed
        - When the **Try Again** button is clicked, an HTTP GET request will be made to **Search Movies API URL**
      - When the HTTP GET request made to the **Search Movies API URL** returns an empty list for movies then **Search no results** view will be displayed

    - When a **Movie** item is clicked, then the page will be navigate to the Movie Item Details Route
    - All the header functionalities mentioned in the Home Route will work in this route accordingly

- **Account Route**

  - When an authenticated user opens the Account Route

    - The username which was provided in the login, will be displayed
    - The password which was provided in the login, will be displayed in masked
    - When the **Logout** button is clicked, then the page will be navigated to the Login Route

  - All the header functionalities mentioned in the Home Route will work in this route accordingly


- **Not Found Route**

  - When a random path is provided as the URL, then the page will navigate to the Not Found Route

- Users will be able to view the website responsively in mobile view, tablet view as well



Third party packages I have used to achieve the design or functionality

  - React Slick
  - date-fns 
  - react-icons
  - react-loader-spinner



**You can use any one of the following credentials**

  username: aakash
  password: sky@007

  username: agastya
  password: myth#789

  username: advika
  password: world@5

  username: binita
  password: modest*6

  username: chetan
  password: vigor$life

  username: deepak
  password: lightstar@1

  username: harshad
  password: joy@85

  username: kapil
  password: moon$008

 username: rahul
 password: rahul@2021

  username: shravya
  password: musical#stone

  username: saira
  password: princess@9


