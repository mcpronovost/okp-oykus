export const updateHeightViewport = () => {
  $("#testvh").text("test");
  $("#testvh").text(`${(window.innerHeight * 0.01) * 100}px`);
  document.documentElement.style.setProperty(
    "--vh", `${(window.innerHeight * 0.01) * 100}px`
  );

  $(window).on("resize", () => {
    $("#testvh").text(`${(window.innerHeight * 0.01) * 100}px`);
    document.documentElement.style.setProperty(
      "--vh", `${(window.innerHeight * 0.01) * 100}px`
    );
  });
};
