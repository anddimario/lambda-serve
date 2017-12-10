const querystring = require('querystring');
const fs = require('fs');
const http = require('http');
const url = require('url');
const env = require('./env');

// set env variables
for (const varEnv in env.processEnv) {
  process.env[varEnv] = env.processEnv[varEnv];
}

const requestHandler = (req, res) => {

  const parsedUrl = url.parse(req.url, true);
  const service = parsedUrl.pathname.split('/')[1];
  fs.exists(`${env.lambdasDir}/${service}/index.js`, (exists) => {
    if (exists) {
      const body = [];
      req.on('error', function (err) {
        console.log(err);
      }).on('data', function (chunk) {
        body.push(chunk);
      }).on('end', function () {
        let stringBody = Buffer.concat(body).toString();
        if (stringBody) {
          stringBody = querystring.parse(stringBody);

        }

        const event = {
          httpMethod: req.method,
          body: JSON.stringify(stringBody),
          queryStringParameters: parsedUrl.query
        };
        const lambda = require(`${env.lambdasDir}/${service}/index`);
        lambda.handler(event, {}, (err, result) => {
          if (err) {
            res.statusCode = 500;
            res.end(`Event not writed ${err}`);
          } else {
            res.statusCode = result.statusCode;
            for (const header in result.headers) {
              res.setHeader(header, result.headers[header]);
            }
            res.end(result.body);
          }
        });
      });

    } else {
      res.statusCode = 500;
      res.end('Service not exists');
    }
  });
};

const server = http.createServer(requestHandler);

server.listen(env.PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Started on ${env.PORT}`);
})

