import app from "./app";

const PORT = process.env.BACKEND_PORT;
const port = process.env.PORT || PORT;

// listen for requests
const server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

export default app;
