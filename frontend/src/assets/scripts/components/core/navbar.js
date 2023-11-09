
export const okpUpdateNavbarActiveLink = () => {
    const navbar = $("#okp-core-navbar");

    if (navbar.length) {
        navbar.find("a[href='" + window.location.pathname + "']").addClass("okp-active");
    }
};
