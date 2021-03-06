define("ember-data/-private/system/model/attr", ["exports", "ember", "ember-data/-private/debug"], function (exports, _ember, _emberDataPrivateDebug) {
  "use strict";

  var get = _ember["default"].get;
  var Map = _ember["default"].Map;

  /**
    @module ember-data
  */

  /**
    @class Model
    @namespace DS
  */

  var AttrClassMethodsMixin = _ember["default"].Mixin.create({
    /**
      A map whose keys are the attributes of the model (properties
      described by DS.attr) and whose values are the meta object for the
      property.
       Example
       ```app/models/person.js
      import DS from 'ember-data';
       export default DS.Model.extend({
        firstName: attr('string'),
        lastName: attr('string'),
        birthday: attr('date')
      });
      ```
       ```javascript
      import Ember from 'ember';
      import Person from 'app/models/person';
       var attributes = Ember.get(Person, 'attributes')
       attributes.forEach(function(meta, name) {
        console.log(name, meta);
      });
       // prints:
      // firstName {type: "string", isAttribute: true, options: Object, parentType: function, name: "firstName"}
      // lastName {type: "string", isAttribute: true, options: Object, parentType: function, name: "lastName"}
      // birthday {type: "date", isAttribute: true, options: Object, parentType: function, name: "birthday"}
      ```
       @property attributes
      @static
      @type {Ember.Map}
      @readOnly
    */
    attributes: _ember["default"].computed(function () {
      var _this = this;

      var map = Map.create();

      this.eachComputedProperty(function (name, meta) {
        if (meta.isAttribute) {
          (0, _emberDataPrivateDebug.assert)("You may not set `id` as an attribute on your model. Please remove any lines that look like: `id: DS.attr('<type>')` from " + _this.toString(), name !== 'id');

          meta.name = name;
          map.set(name, meta);
        }
      });

      return map;
    }).readOnly(),

    /**
      A map whose keys are the attributes of the model (properties
      described by DS.attr) and whose values are type of transformation
      applied to each attribute. This map does not include any
      attributes that do not have an transformation type.
       Example
       ```app/models/person.js
      import DS from 'ember-data';
       export default DS.Model.extend({
        firstName: attr(),
        lastName: attr('string'),
        birthday: attr('date')
      });
      ```
       ```javascript
      import Ember from 'ember';
      import Person from 'app/models/person';
       var transformedAttributes = Ember.get(Person, 'transformedAttributes')
       transformedAttributes.forEach(function(field, type) {
        console.log(field, type);
      });
       // prints:
      // lastName string
      // birthday date
      ```
       @property transformedAttributes
      @static
      @type {Ember.Map}
      @readOnly
    */
    transformedAttributes: _ember["default"].computed(function () {
      var map = Map.create();

      this.eachAttribute(function (key, meta) {
        if (meta.type) {
          map.set(key, meta.type);
        }
      });

      return map;
    }).readOnly(),

    /**
      Iterates through the attributes of the model, calling the passed function on each
      attribute.
       The callback method you provide should have the following signature (all
      parameters are optional):
       ```javascript
      function(name, meta);
      ```
       - `name` the name of the current property in the iteration
      - `meta` the meta object for the attribute property in the iteration
       Note that in addition to a callback, you can also pass an optional target
      object that will be set as `this` on the context.
       Example
       ```javascript
      import DS from 'ember-data';
       var Person = DS.Model.extend({
        firstName: attr('string'),
        lastName: attr('string'),
        birthday: attr('date')
      });
       Person.eachAttribute(function(name, meta) {
        console.log(name, meta);
      });
       // prints:
      // firstName {type: "string", isAttribute: true, options: Object, parentType: function, name: "firstName"}
      // lastName {type: "string", isAttribute: true, options: Object, parentType: function, name: "lastName"}
      // birthday {type: "date", isAttribute: true, options: Object, parentType: function, name: "birthday"}
     ```
       @method eachAttribute
      @param {Function} callback The callback to execute
      @param {Object} [binding] the value to which the callback's `this` should be bound
      @static
    */
    eachAttribute: function eachAttribute(callback, binding) {
      get(this, 'attributes').forEach(function (meta, name) {
        callback.call(binding, name, meta);
      });
    },

    /**
      Iterates through the transformedAttributes of the model, calling
      the passed function on each attribute. Note the callback will not be
      called for any attributes that do not have an transformation type.
       The callback method you provide should have the following signature (all
      parameters are optional):
       ```javascript
      function(name, type);
      ```
       - `name` the name of the current property in the iteration
      - `type` a string containing the name of the type of transformed
        applied to the attribute
       Note that in addition to a callback, you can also pass an optional target
      object that will be set as `this` on the context.
       Example
       ```javascript
      import DS from 'ember-data';
       var Person = DS.Model.extend({
        firstName: attr(),
        lastName: attr('string'),
        birthday: attr('date')
      });
       Person.eachTransformedAttribute(function(name, type) {
        console.log(name, type);
      });
       // prints:
      // lastName string
      // birthday date
     ```
       @method eachTransformedAttribute
      @param {Function} callback The callback to execute
      @param {Object} [binding] the value to which the callback's `this` should be bound
      @static
    */
    eachTransformedAttribute: function eachTransformedAttribute(callback, binding) {
      get(this, 'transformedAttributes').forEach(function (type, name) {
        callback.call(binding, name, type);
      });
    }
  });

  exports.AttrClassMethodsMixin = AttrClassMethodsMixin;

  var AttrInstanceMethodsMixin = _ember["default"].Mixin.create({
    eachAttribute: function eachAttribute(callback, binding) {
      this.constructor.eachAttribute(callback, binding);
    }
  });
  exports.AttrInstanceMethodsMixin = AttrInstanceMethodsMixin;
});