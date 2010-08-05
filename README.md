jQuery.instance
===============

Easy states and mixins for jQuery objects.

Usage
-----

Use one: make sure that there will only be one instance of an object.

    var $one = $("#sidebar").instance();
    $one.abc = 42;
    $one.hide(); // $one is still a jQuery object equivalent to $("#sidebar")
  
    var $two = $("#sidebar").instance();
    $two.abc; //=> 42
    $two.show();

Usage (two)
-----------

It can be used for pseudo-classes.

    // This is a mixin with properties/methods that will be added
    // to a jQuery object.
    var Rule = {
      name: 'John Doe',
      klass: 'Rule',
      expand: function () {
        // `this` here is a jQuery object.
        this.hide();
        this.slideDown('fast');
      }
    };
    
    // Use two: extend an object with a mixin.
    var $one = $("#sidebar").instance(Rule);
    $one.expand();
    $one.name; // 'Rule'
    
    var $two = $("#sidebar").instance();
    $two.expand(); // Methods from the mixin is retained since
                   // $one and $two are the same

Why?
----

When creating interfaces in JavaScript, things can get really
complicated and OOP is sometimes a very good solution.

For instance, if I were to create a spin button widget,
I can do something like this:

    var $spin = $.spinbutton();
    $spin.setValue(4);
    $spin.add();

    // $spin will still be a jQuery object!
    $spin.css({ 'top': '200px' });
    $spin.hide();

    $.spinbutton = function() {
      var $button = $("<div class='spin-button'>")
          .append($("<span class='display'>"))
          .append($("<a class='add'>")
              .click(function() { $this.add(); return false; }))
          .append($("<a class='subtract'>")
              .click(function() { $this.subtract(); return false; }))

      return $button.instance(SpinButton);
    },

    var SpinButton = {
      $display: function () { return this.find('span.display'); },
      setValue: function (val) { this.$display().html(val); },
      getValue: function () { return parseInt(this.$display().html()); },
      add:      function () { this.setValue(this.getValue + 1); },
      subtract: function () { this.setValue(this.getValue - 1); }
    };

Authors
-------

jQuery.instance is authored and maintained by Rico Sta. Cruz of Sinefunc, Inc.
See more of our work on [www.sinefunc.com](http://www.sinefunc.com)!

Copyright
---------

(c) 2010 Rico Sta. Cruz and Sinefunc, Inc. See the LICENSE file for more details.
