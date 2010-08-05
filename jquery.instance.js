/* jQuery.instance
 * ---------------
 *
 * Quick guide:
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

;(function($) {
  $.fn.instance = function (type) {
    var $this = this.first();
    var $this = $this.data('instance') || ($this.data('instance', $this) && $this);

    // Tip: Implement a 'klass' property to make sure extending doesn't happen twice.
    if ((type) && ((!$this.klass) || (!type.klass) || ($this.klass != type.klass))) {
      $this.extend(type);
    }

    return $this;
  };
})(jQuery);
