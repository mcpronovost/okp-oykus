import jQuery from "jquery";
import {
    toggleSidebar
} from "@/assets/scripts/components/core/sidebar.js";

(function($) {
    $(function() {
        window.jQuery = window.$ = $;
        window.addEventListener("load", function() {
            console.log("loaded.");
            toggleSidebar();
        });
    });
})(jQuery);
