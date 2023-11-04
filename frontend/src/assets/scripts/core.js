import jQuery from "jquery";

(function($) {
    $(function() {
        window.jQuery = window.$ = $;
        window.addEventListener("load", function() {
            console.log("loaded.");
        });
    });
})(jQuery);
