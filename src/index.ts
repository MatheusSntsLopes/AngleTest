// src/index.ts
import { app } from './app';
import { PORT } from './common/environment-consts';
import { sequelize } from "./models/AngleModel";

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.log(`Server is running on port ${PORT} 🚀`);
  });
}).catch((error: any) => {
  console.error('Unable to connect to the database:', error);
});
