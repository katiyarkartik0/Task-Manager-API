## Objective
Built a RESTful API for a simple task manager application.

## Project Description:
In this project, we have create a RESTful API using Node.js, Express.js, and NPM packages. The API allows users to perform CRUD operations (Create, Read, Update, and Delete) on tasks. The tasks have mandatory fields such as id, title, description, and flag for completion status, and optional as, priority_level). The API has been tested using Postman.

## Implementation:
### GET /tasks 
Retrieve all tasks.

### GET /tasks/:id 
Retrieve a single task by its ID.

### POST /tasks
Create a new task.
The above request is to create a new task with its unique id as passed in the query string. The task should be passed in the req body as follows
```
{   
    "id": 5,
    "title": "dsvkmcjkzxhjbdjwkd_",
    "description": "new du",
    "flag": true,

}
```
> The below attributes are optional. If the attribute priority_level is not passed explicitly, it will automatically be created as low. The attribute creation_date will be created automatically in the server(No need to pass explicitly).
```
{
    "priority_level": "low" 
}
```
#### Validations of the incoming task body
validations have been added such that the incoming task body contains the id(unique, mandatory), title(mandatory), description(mandatory), flag(mandatory)

### PUT /tasks/:id
Update an existing task by its ID.
The above request is to manipulate the contents of an already present task with its unique id as passed in the query string
the content should be passed in the req body as follows
```
{   
    "id": 5,
    "title": "dsvkmcjkzxhjbdjwkd_",
    "description": "updated du",
    "flag": true,
    "priority_level": "low"  
}
```
#### Validations of the incoming task body
validations have been added such that the updating task body contains the id(mandatory), title(mandatory), description(mandatory),flag(mandatory)


### DELETE /tasks/:id
Delete a task by its ID.

>further more...

### GET /tasks?taskStatus=true&filterBasis=latest
### GET /tasks?taskStatus=false&filterBasis=latest
### GET /tasks?taskStatus=true&filterBasis=earliest
### GET /tasks?taskStatus=false&filterBasis=earliest

#### When 'taskStatus' or/and 'filterBasis' are passed in query params

```
if(taskStatus==true){
  A list of tasks with completion status as true, are returned;
}
else if(taskStatus==false){
  A list of tasks with completion status as true, are returned;
}

if(filterBasis=='latest'){
  A list of tasks sorted on the basis of 'creation_date' being the latest, is returned;
}
else if(filterBasis=='earliest'){
  A list of tasks sorted on the basis of 'creation_date' being the earliest, is returned;
}
```
> if creation_date does not exist, we assume it was one of the very earliest entries

### GET /tasks/priority/:level
A list of tasks with priority_level(eg. 'low', 'medium', 'high') as passed in the query string, is returned;
### PUT /tasks/priority/:id
The above request is to manipulate the priority level of an already present task with its unique id as passed in the query string
the priority should be passed in the req body as follows
```
{
    "priority_level": "high"
}
```


