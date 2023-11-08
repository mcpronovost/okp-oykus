import jQuery from "jquery";
import {
    updateHeightViewport
} from "@/assets/scripts/components/core/main.js";
import {
    toggleSidebar
} from "@/assets/scripts/components/core/sidebar.js";

(function($) {
    $(function() {
        window.jQuery = window.$ = $;
        window.addEventListener("load", function() {
            console.log("loaded.");
            updateHeightViewport();
            toggleSidebar();
        });
    });
})(jQuery);
