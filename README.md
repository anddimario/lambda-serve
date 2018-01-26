Serve serverless microservices

### Features
- aws lambdas and google functions supported
- test your serverless functions in localhost
- pure nodejs, no modules
- run multiple lambdas as same app
- cors

### Example usage (aws)
- create a directory for all microservices (example: /myhome/myapp/microservices)
- in this directory, for this example, clone: `git clone git@github.com:anddimario/aws-lambda-user-microservice.git user` (/myhome/myapp/microservices/user)    
- clone this repo (path is not important)
- create an env.js, example:
```
module.exports = {
  PORT: 3000,
  lambdasDir: '/myhome/myapp/microservices',
  processEnv: {
    DYNAMO_REGION: 'eu-west-1',
    DYNAMO_ENDPOINT: 'http://localhost:8000',
    JWT_SECRET: 'mygreatsecret'
  },
  cors: true,
  provider: 'aws' // or 'google'
}
```
- run: `node server.js`
- registration curl:
```
curl -d"type=register&email=prova@example.com&password=testpw&fullname=prova" http://localhost:3000/user
```
- login curl:
```
curl -d"type=login&email=prova@example.com&password=testpw" http://localhost:3000/user
```

**NOTE** For google you can create a test directory with this code:
```
/**
 * Responds to any HTTP request that can provide a "message" field in the body.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.handler = function helloWorld (req, res) {
  if (req.body.message === undefined) {
    // This is an error case, as "message" is required
    res.status(400).send('No message defined!');
  } else {
    // Everything is ok
    console.log(req.body.message);
    res.status(200).end();
  }
};
```
Then test with curl: `curl -X POST -H "Content-Type:application/json"  -d '{"message1":"hello world!"}' http://localhost:3000/test`