
export const toggleSidebar = () => {
    const sidebar = $("#okp-core-sidebar");
    const toggle = $("#okp-toggle-sidebar");

    if (sidebar.length && toggle.length) {
        toggle.on("click", () => {
            sidebar.toggleClass("okp-open");
        });
    }
};
