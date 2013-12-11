# marvel-universe
## A network visualisation of the Marvel Heros based on Foxx, ArangoDB and AngularJS.

### Setup

Before starting this app you have to download the [data files](https://github.com/triAGENS/ArangoDB-Data/tree/master/Graphs/Marvel%20Universe) (not included here)


## Installation

After [installing ArangoDB](http://www.arangodb.org/download), start your server:

    $ arangod /path/to/your/arango_db

Then start run the following commands:

    $ foxx-manager update
    $ foxx-manager install marvel-universe /superheros

The App gets mounted to '/superheros'. Point your browser to `http://localhost:8529/superheros/` to run the application.


## License

This code is distributed under the [Apache License](http://www.apache.org/licenses/LICENSE-2.0).
