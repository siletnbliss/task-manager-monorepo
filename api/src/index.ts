import { env } from "@/common/utils/envConfig";
import { initApp, logger } from "@/server";

initApp().then((app) =>
  app.listen(env.PORT, () => {
    const { NODE_ENV, HOST, PORT } = env;
    logger.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);
  })
);
