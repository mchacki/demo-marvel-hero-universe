# marvel-universe
## A network visualisation of the Marvel Heros based on Foxx, ArangoDB and AngularJS.


## Installation

1. After [installing ArangoDB](http://www.arangodb.org/download), start your server:

    $ arangod /path/to/your/arango_db

2. Then start run the following commands:

    $ foxx-manager update
    $ foxx-manager install marvel-universe /superheroes


3. Then download the download the [data files](https://github.com/triAGENS/ArangoDB-Data/tree/master/Graphs/Marvel%20Universe) (not included here). The repo is quite large, note that you only need the files in the "Marvel Universe" directory. Use the import.sh script in the "Marvel Universe" directory to load the data into ArangoDB.

4. The App gets mounted to '/superheroes'. Point your browser to `http://localhost:8529/superheroes/` to run the application. 

## License

This code is distributed under the [Apache License](http://www.apache.org/licenses/LICENSE-2.0).
