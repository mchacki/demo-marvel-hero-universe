/*jslint indent: 2, nomen: true, maxlen: 100 */
/*global require, exports*/

////////////////////////////////////////////////////////////////////////////////
/// @brief A user profile management Foxx  written for ArangoDB and Angular JS
///
/// @file This Document represents the repository communicating with ArangoDB
///
/// DISCLAIMER
///
/// Copyright 2010-2012 triagens GmbH, Cologne, Germany
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///     http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///
/// Copyright holder is triAGENS GmbH, Cologne, Germany
///
/// @author Michael Hackstein
/// @author Copyright 2011-2013, triAGENS GmbH, Cologne, Germany
////////////////////////////////////////////////////////////////////////////////

(function () {
  "use strict";

  var _ = require("underscore"),
    Foxx = require("org/arangodb/foxx"),
    db = require("internal").db,
    Heroes;

  Heroes = Foxx.Repository.extend({

    like: function(content) {
      var query = "FOR h in @@col filter like(h.name, @str, true) return h";
      return _.map(db._query(query, {
        "@col": this.collection.name(),
        str: "%" + content + "%"
      }).toArray(), function (rawHero) {
        var hero = new this.model(rawHero);
        return hero;
      }, this);
    }
  });

  exports.Repository = Heroes;
}());
