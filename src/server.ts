import type { Request, Response } from "express";
import app from "./app.js";
import setupRoutes from "./routes/index.js";

const PORT = process.env.PORT || 3000;

setupRoutes(app);

app.use((req: Request, res: Response) => {
  res.status(404).send("Sorry can't find that!");
});

app.listen(PORT, () =>
  console.log(`🚀 Server ready at: http://localhost:${PORT}`),
);
