<p align="center">
	<img src="https://i.ibb.co/Fm08DF6/Screen-Shot-2019-12-16-at-4-02-27-AM.png">
</p>

http://3.132.170.184:8080/RESTEventTracker/

## Overview

The purpose of the event tracker was to combine a JPA project with a RESTfull interactions with a database.  During week two, front end functionality was added using JavaScript.   On week three, the front end received an overhaul by changing the front end from vanilla JavaScript to Angular.  For my project, I made a database with rocket launches from NASA, SpaceX, etc.  The database contains a launch name, location, description, and date.  A user may read, create, update, and delete from the database.

The single page website allows a user to perform full CRUD operations. A table will all events will display.  At the bottom of the page there is an option that will allow a user to add an event.  If an event is clicked on from the table, an option will popup next to the create event box in order to update or delete events.

In order to add data aggregation, I made a JavaScript function that would determining when the next closest event was an output that with the number of days until the launch at the top of the page.  If there are no future events in the database, it will say so.  It add an additional display, when viewing an individual event page, it will say how many days until an even or how many days since the event has passed.

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


## Developer Instructions
Prior to adding Angular and JavaScript the project did not have a front end.  The following instructions are how to access it prior to the front end existing.  The full project and database may be downloaded from github.  Download a zip file to known location and load it in an IDE such as eclipse.  From an IDE the user can run the `RESTEventTracker` as a Spring Boot App from `RESTEventTracker > src/main/java > com.skilldistillery.event > EventRestApplication.java`.  When the program is run a user may go into Postman and perform full crud via the endpoints shown above.  For example, to create a launch event, the user would set Postman to `POST` and the address to `localhost:8093/api/post` and put in valid JSON.  By doing so, the program will add the event object and set the id to the next highest available (regardless of whether the user chooses the id).  Following the same paths as in the REST Endpoints section, the user may also view, update, and delete event objects.


## Technologies Used
- **Angular** - Week three completely overhauled the project by utilizing Angular instead of JS.
- **TypeScript** - Angular uses the TypeScript language.
- **MySQL** - The project started by creating a database in MySQL to include an id, event name, location, description, and date.
- **JPA** - To integrate the database an event entity was created in a JPA project.
- **JUnit5** - To ensure the JPA project was working properly prior to starting Spring REST, a few test cases were created.
- **Spring REST** - A repository, service interface and impl class, and controller were created in the REST project.
- **Postman** - The program was used to test and to perform CRUD operations by using it's GET, POST, PUT, and DELETE options.
- **JSON** - JSON is the language used in Postman to perform CRUD operations.
- **JavaScript** - JavaScript handled all front end interactions via creating tables and using event listeners.
- **XMLHttpRequest** - Allows JavaScript to use Spring REST controllers and to add data to the front end.
- **Bootstrap** - The application is completely mobile friendly due to utilizing BootStrap.

## Lessons Learned
### Week 1:
This was a short project, and I unfortunately did not have much time to explore the stretch goals.  The biggest hurdle was understanding the need for a repository.  As it stands while I am posting the readme, it only has one method.  This would have been more useful had I applied more JPA data methods.

I also struggled with the update portion, but that was mostly do to the silly mistake on my part.  I was trying to update an object that I had just created.  That was the second time I had done that, so hopefully that lesson is learned for good.

### Week 2:
The biggest challenge of this project was getting the table to update.  I eventually went with reloading the page when the create, update, or delete button was pushed. The biggest challenge was getting the row to update without having to refresh the page.  All it took was a simple while loop similar to:
```
while (dataDiv.firstElementChild) {
		dataDiv.removeChild(dataDiv.firstElementChild);
}
```
In addition to expanding knowledge XMLHttpRequest()'s, I learned a few new JavaScript functions involving dates.

### Week 3:
The hardest part of the project was not Angular.  It was figuring out how to subtract using TypeScript.  It seems every language must have a different way to dealing with dates.  One thing that also made life harder was not being able to use a `break;` in a for each loop.

Angular took a lot of logic out of the equation, but seemed rather more procedural.  This makes it easier to add interactive functionality.  It also seemed easier to debug with the given console errors.



## Future Additions
#### *Note that all future additions listed below where from week two.  They have been fixed after the Angular revamp.*

Agile will be learned in the upcoming week, so that will be applied later to the project.

To add extra data aggregation, I added a table column that calculates the days in between launches.  Unfortunately, using `required` with an `<input type="date">` does not work, and allows the value to be 0.  This creates a flaw, that if a user does not enter a correct date, the following calculation will not make sense.  This could easily be solved with some logic like `if (date == 0) -> skip`; however, it would be better to add an exception that prevents a user from not adding an invalid date.  I may look into that next week. *days in between events was removed*

Time-zone adjustment needs to be added when creating and updating the time.  This may be handled better on the Java side, but it was the only numerics I had in my database to be able to add aggregation.
