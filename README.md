# dna-mutation

dna-mutation is a service that process a DNA and determines if it has mutated or not. The project also offers some historical statistics.

It's a REST API developed in node.js with typescript.
It works with a NoSQL Database (MongoDB) by using mongoose library. 


# To start the project
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