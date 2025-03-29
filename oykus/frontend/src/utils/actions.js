export const okpScrollTo = (toElement, area = "okp-scroll") => {
    const scrollViewportElement = document.querySelector(
      `#${area} .okp-scrollarea-viewport`
    );

    if (toElement && scrollViewportElement) {
      const toElementRect = toElement.getBoundingClientRect();
      const viewportRect = scrollViewportElement.getBoundingClientRect();
      const scrollTop =
        toElementRect.top - viewportRect.top + scrollViewportElement.scrollTop;

        scrollViewportElement.scrollTo({
        top: scrollTop,
        behavior: "smooth",
      });
    }
};
