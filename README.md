# dna-mutation

dna-mutation is a service that process a DNA and determines if it has mutated or not. The project also offers some historical statistics.

It's a REST API developed in node.js with typescript.
It works with a NoSQL Database (MongoDB) by using mongoose library. 


# To start the project
    - make sure you have mongoDB installed on your machine
    - npm install
    - set .env file (see section below)
    - npm run dev
    - the application will start running on http://localhost:[PORT]


# .env example
    - PORT=3000 => the port where our server will listen to requests

# Tests
As a testing library we use jest (https://jestjs.io/):

    - npm test

# Services
This project offers 2 public services (endpoints) to be consumed:

## POST - [serverUrl]/mutation
This endpoint determines if the dna is mutated or not.
The result will be saved to the database for future stats.

### Input:
    - body:
        - dna: {String[]} The NxN DNA,

    - example:
        {
            "dna": [
                "ATGCGA",
                "CAGTGC",
                "TTATTT",
                "AGACGG",
                "GCGTCA",
                "TCACTG"
            ]
        }

### Output:
    - successful:
        - { status: 200 } => DNA has mutation
        - { status: 403 } => DNA doesn't have mutation
    - error: 
        - { status: 500, error }


## GET - [serverUrl]/stats
This endpoint returns historical data: 

    - Quantity of mutated dna processed.
    - Quantity of not mutated dna processed.
    - Ratio of mutation.

### Output:
    - successful:
        - { status: 200, {
                "count_mutations": number,
                "count_no_mutations": number,
                "ratio": number
            }
          }
    - error:
        - { status: 500, error }

# Thinking big
There are many things that can be added to this project if we think about a production environment:

To let the system support high volume of users, we should think about a cloud hosting service (like AWS EC2) that allows to easily scale up the infrastructure, but we may still consume from an unique origin of data (we may use MongoDB Atlas).

After that, I would develop some sort of authentication to allow only defined users to access our services. We could implement the standard openId with a clientId and clientSecret.

If the service grows, it would be great to document the REST API in a standard format like Swagger, to make it more accessible.

We could also think on adding more functionalities. At least to complete the CRUD operations or manage stats with dates or different parameters.