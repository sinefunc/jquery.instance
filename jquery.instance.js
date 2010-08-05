// jQuery.instance
// ---------------

;(function($) {
  $.fn.instance = function (type) {
    var $this = this.first();
    var $this = $this.data('instance') || ($this.data('instance', $this) && $this);

    if ((type) && ((!$this._className) || ($this._className != type))) {
      $this.extend(type);
      $this._className = type;
    }

    return $this;
  };
})(jQuery);

/* Quick usage guide:
 *
 *   var $one = $("#sidebar").instance();
 *   var $two = $("#sidebar").instance();
 *   $one.abc = 42;
 *   $two.abc; //=> 42
 *
 *   var Rule = {
 *     expand: function () { ... }
 *   };
 *   
 *   var $one = $("#sidebar").instance(Rule);
 *   $one.expand();
 */

