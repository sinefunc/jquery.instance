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

It can be used for making 'pseudo-classes' for jQuery objects by
letting you extend your objects with methods and properties
from another object (a 'mixin').

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
complicated and sometimes, doing things the OOP way is a very
sane solution.

For instance, if I were to create a spin button widget,
I can do something make a jQuery object like this:

    var $spin = $.spinbutton(); // Returns a jQuery object
    $("#container").append($spin);

    $spin.show();

But that object will also still be able to keep state, and
have some custom functions!

    $spin.setValue(4);
    $spin.add();
    $spin.comment = "Hello";

From here, `$.spinbutton` can be simply a $("...") generator
that, in the end, will call `instance()` to extend the
object:

    $.spinbutton = function() {
      var $button = $("<div class='spin-button'>")
          .append($("<span class='display'>"))
          .append($("<a class='add'>")
              .click(function() { $this.add(); return false; }))
          .append($("<a class='subtract'>")
              .click(function() { $this.subtract(); return false; }))

      return $button.instance(SpinButton);
    },

And the mixin can look like this:

    var SpinButton = {
      $display: function () { return this.find('span.display'); },
      setValue: function (val) { this.$display().html(val); },
      getValue: function () { return parseInt(this.$display().html()); },
      add:      function () { this.setValue(this.getValue + 1); },
      subtract: function () { this.setValue(this.getValue - 1); }
    };

Now, the functions can be used elsewhere!

    /* Elsewhere */ {
        var $button = $("#container .spin-button").instance();
        $button.setValue(200);
    }

Without the `.instance()`, the `$("#container .spin-button")` will simply
return a jQuery object /without/ the mixin we defined. Calling `.instance()`
will return the very same JavaScript object that was created earlier,
maintaining it's state and mixins.

Authors
-------

jQuery.instance is authored and maintained by Rico Sta. Cruz of Sinefunc, Inc.
See more of our work on [www.sinefunc.com](http://www.sinefunc.com)!

Copyright
---------

(c) 2010 Rico Sta. Cruz and Sinefunc, Inc. See the LICENSE file for more details.
