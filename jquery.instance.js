// jQuery.instance
// http://github.com/sinefunc/jquery.instance

;(function($) {
  $.fn.instance = function (type) {
    var $this = this.first();
    var $this = $this.data('instance') || ($this.data('instance', $this) && $this);

    if ((type) && ((!$this._class) || ($this._class != type))) {
      $this.extend(type);
      $this._class = type;
    }

    return $this;
  };
})(jQuery);

/* Quick usage guide:
 *
 *   var $one = $("#sidebar").instance();
 *   var $two = $("#sidebar").instance();
 *   $one == $two; // true
 *
 *   var Sidebar = {
 *     expand: function () { ... }
 *   };
 *   
 *   var $one = $("#sidebar").instance(Sidebar);
 *   $one.expand();
 */

