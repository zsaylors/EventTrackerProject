# Event Tracker

## Overview

The purpose of the event tracker was to combine a JPA project with a RESTfull interactions with a database.  For my project I mad a database with rocket launches from NASA, SpaceX, etc.  The database contains a launch name, location, description, and date.  A user may read, create, update, and delete from the database.

## REST Endpoints
<table>
<tr>
<th>HTTP Method</th>
<th>URI</th>
<th>Purpose</th>
</tr>

<tr>
<td>GET</td>
<td>/api/events</td>
<td>Lists all launches</td>
</tr>

<tr>
<td>GET</td>
<td>/api/event/{id}</td>
<td>Lists single event by id</td>
</tr>


<tr>
<td>POST</td>
<td>/api/post</td>
<td>User creates/adds launch</td>
</tr>


<tr>
<td>PUT</td>
<td>/api/event/{id}</td>
<td>Updates event</td>
</tr>

<tr>
<td>DELETE</td>
<td>/api/event/{id}</td>
<td>Deletes event</td>
</tr>

</table>

| HTTP Method   | URI               | Purpose       |
| ------------- |------------------ | ------------- |
| GET           | /api/events       | Lists all launches |
| GET           | /api/event/{id}   | Lists single event by id |
| POST          | /api/post         | User creates/adds launch |
| PUT           | /api/event/{id}   | Updates event |
| DELETE        | /api/event/{id}   | Deletes event |


## Developer Instructions
The project does not have a front end, and therefore is not on AWS.  However, the full project and database may be downloaded from github.  Download a zip file to known location and load it in an IDE such as eclipse.  From an IDE the user can run the `RESTEventTracker` as a Spring Boot App from `RESTEventTracker > src/main/java > com.skilldistillery.event > EventRestApplication.java`.  When the program is run a user may go into Postman and perform full crud via the endpoints shown above.  For example, to create a launch event, the user would set Postman to `POST` and the address to `localhost:8093/api/post` and put in valid JSON.  By doing so, the program will add the event object and set the id to the next highest available (regardless of whether the user chooses the id).  Following the same paths as in the REST Endpoints section, the user may also view, update, and delete event objects.


## Technologies Used
MySQL - The project started by creating a database in MySQL to include an id, event name, location, description, and date.
JPA - To integrate the database an event entity was created in a JPA project.
JUnit5 - To ensure the JPA project was working properly prior to starting Spring REST, a few test cases were created.
Spring REST - A repository, service interface and impl class, and controller were created in the REST project.
Postman - The program was used to test and to perform CRUD operations by using it's GET, POST, PUT, and DELETE options.
JSON - JSON is the language used in Postman to perform CRUD operations.


## Lessons Learned
This was a short project, and I unfortunately did not have much time to explore the stretch goals.  The biggest hurdle was understanding the need for a repository.  As it stands while I am posting the readme, it only has one method.  This would have been more useful had I applied more JPA data methods.

I also struggled with the update portion, but that was mostly do to the silly mistake on my part.  I was trying to update an object that I had just created.  That was the second time I had done that, so hopefully that lesson is learned for good.
