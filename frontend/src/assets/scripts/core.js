import jQuery from "jquery";
import {
    okpUpdateNavbarActiveLink
} from "@/assets/scripts/components/core/navbar.js";

(function($) {
    $(function() {
        window.jQuery = window.$ = $;
        window.addEventListener("load", function() {
            console.log("loaded.");
            okpUpdateNavbarActiveLink();
        });
    });
})(jQuery);
