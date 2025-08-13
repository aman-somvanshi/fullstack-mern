// Actionable Docker

// Using docker to run packages locally

// This tutorial is on actionable docker to start packages locally.



// Installing Docker
// Docker GUI is the easiest way to get off the ground.


// What are we using docker for?
// Docker let's you do a lot of things.
// It lets you containerize your applications.
// It lets you run other people's (code + packages) in your machine.
// It lets you run common software packages inside a container. e.g., Mongo, Postgres, etc.


// A container can be assumed as a mini-computer running inside your computer. It has its own file system, network and ports.
// If in a container, I am running a process on port 3000. Then this mini-machine is listening on port 3000 but our main machine isn't listening on port 3000.

// We can map the main machine's port to the container's portm so that it can be asily accessed.




// Where can we get packages from?

// Just like you cna push you code to Github, you can push images to docker registries.




// Docker Image 

// Refer to Docker-images.png
// A Docker image is a read-only template that contains:
// 1. The application code
// 2. Required runtime (e.g., Node.js, Python interpreter)
// 3. System tools and libraries the app needs
// 4. Environment configuration

// They are stored in registries (like Docker Hub) and can be pulled onto any system to run.
// When you create a container, you’re essentially making a writable instance from that image.

// Vague example - It can be understood as a CD that holds all the files required to install OS.


// A container is nothing but an image in execution.

// An image can be understood as all the code of a particuar project that exists on github (in this case, Docker Hub).
// If we pull this code and start it, then it becomes a container.








// Common commands to know

// 1. docker run --> This command is used to create and start a Docker container from a specified image. It's like saying "start this application" in the Docker world. For example, docker run mongo starts a MongoDB container using the official MongoDB image from Docker Hub.

// 2. docker ps --> This command lists all currently running containers, much like the ps command in Unix-based systems that shows running processes. It's like looking at a list of active applications on your computer.

// 3. docker kill <container_id> --> This command stops a running container immediately. It's similar to force-quitting an application on your computer. It provides details such as container ID, image used, command executed, creation time, status, and ports.






// Running a simple image: 
// When you run docker run mongo, you're starting a MongoDB container. You will notice you can't open it in MongoDB Compass because without port mapping, you won't be able to access the MongoDB instance from your host machine.

// Adding a port mapping
// The reason for above bahaviour is that you haven't added a port mapping.

// docker run -p 27017:27017 mongo --> will run on localhost:27017
// docker run -p 27015:27017 mongo --> will run on localhost:27015



//  Starting in detached mode
// Adding -d will ensure it starts in the background
// This allows you to continue using your terminal.

// docker run -d -p 27017:27017 mongo




// Inspect running containers
// docker ps



// Stopping a container: 
// When you want to stop a container, you use docker kill followed by the container ID.

// docker kill <container_id> -->(Stop the specified container)







// Common Packages

// MongoDB: 
// docker run -d -p 27017:27017 mongo


// PostgreSQL:
// docker run -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres

// This command runs a PostgreSQL container with a specified environment variable (-e) setting the default user's password to "mysecretpassword".

// The connection string for this postgres would be 

// postgresql://postgres:mysecretpassword@localhost:5432/postgres

// Now try running index.js which will connect to the postgres instance you created through docker in your local machine