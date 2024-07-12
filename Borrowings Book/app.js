const express = require('express');
const bodyParser = require('body-parser');
const route = require('./src/infrastructure/routes/route');
const swaggerUi = require('swagger-ui-express');
const swaggerSumDocument = require('./src/infrastructure/documentation/doc.json');

const app = express();

app.use(bodyParser.json());
app.use("/api", route)
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerSumDocument));

app.listen(3000, () => {
  console.log('Server is running at port 3000');
});