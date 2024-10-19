export default function svgHeaderPlugin() {
  const safariRegex = /Safari/;
  const chromeRegex = /Chrome/;
  return {
    name: "svg-header-plugin",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url.includes(".svg")) {
          return next();
        }
        const ua = req.headers["user-agent"];
        if (safariRegex.test(ua) && !chromeRegex.test(ua)) {
          res.setHeader(
            "Cache-Control",
            "no-cache, no-store, must-revalidate, max-age=0"
          );
          res.setHeader("Pragma", "no-cache");
          res.setHeader("Expires", "0");
        }
        next();
      });
    },
  };
}
