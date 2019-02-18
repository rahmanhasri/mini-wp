# MINI-WP
This app is documented for Hacktiv8 Assignment
Built with Express and Mongoose

List: of basic routes:

|Route|HTTP|Header(s)|Body|Description|
|---------|---------|---------|---------|---------|
|_/login/google_|**POST**|none|token|login from google|
|_/register_|**POST**|none|email, name, password|register manual|
|_/login_|**POST**|none|email, password|login user|
|_/articles/_|**GET**|none|none|Get Articles|
|_/articles/_|**POST**|token:user| Formdata(title, content, image)|create articles and upload feature image|
|_/articles/:id_|**POST**|token:user]Formdata(title OR/AND content OR/AND image)|update articles|
|_/articles/:id_|**PUT**|token:user|status|modify article status (authorized user only)|
|_/articles/:id_|**DELETE**|token : user|none|delete articles (authorized user only)|
|_/user/articles_|**GET**|token : user|none|get all user articles|

Additional Information:

### - **Login Google**

Login and create user(if does not exists yet) from google sign-in

+ **URL**
  
  /login/google

+ **Method**

  POST

+ **Data Params**

+ **Success Response**

      { token : token }


+ **Error Response**

      { err : err }

### - **Register User**

Register Feature From Manual Register

+ **URL**
  
  /register

+ **Method**

  POST

+ **Data Params**
  
  email[string], name[string], password[string]

+ **Success Response**

      { token : token }


+ **Error Response**

      { message : error validation }

### - **Login User**

Login Feature From Manual Register

+ **URL**
  
  /login

+ **Method**

  POST

+ **Data Params**
  
  username[string], password[string]

+ **Success Response**

      { token : token }


+ **Error Response**

      { message : error validation }

### - **Get Articles**

Load Articles before user login

+ **URL**
  
  /articles/

+ **Method**

  GET

+ **Data Params**
  
+ **Success Response**

      { data : articles }


+ **Error Response**

      { message :`internal server error`}

### - **Post New Article**

Create New Article

+ **URL**
  
  /articles/

+ **Method**

  POST

+ **Data Params**

  headers : { token }
  title[string], content[string], image[string], author[ObjectId]

  
+ **Success Response**

      { newData }


+ **Error Response**

      { message : error validation }

### - **Update Articles**

Edit some / all attribute of articles (Authorized only)

+ **URL**
  
  /articles:id

+ **Method**

  POST

+ **Data Params**
  
  headers : { token }
  title[string], content[string], image[string], author[ObjectId]

+ **Success Response**

      { updated }

+ **Error Response**

      { message : error validation }

### - **Modify Status Articles**

Edit status of articles (Authorized only), from published to trash, or trash to published

+ **URL**
  
  /articles

+ **Method**

  PUT

+ **Data Params**
  
  headers : { token }
  status[string]

+ **Success Response**

      { updated }

+ **Error Response**


### - **Delete Article**

Delete Straight to Hell

+ **URL**
  
  /articles/:id

+ **Method**

  DELETE

+ **Data Params**

  headers : { token }
  
+ **Success Response**

      { }

+ **Error Response**

      { err }

### - **Get User  Articles **

Get Articles after user login

+ **URL**
  
  /user/articles

+ **Method**

  GET

+ **Data Params**

  headers : { token }
  query : ( 'published' **OR** 'archived')
  
+ **Success Response**

      { articles}

+ **Error Response**

      { err }

