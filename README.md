Serve Lambdas microservices

### Features
- aws style lambdas (test aws lambda in localhost)
- pure nodejs, no modules
- run multiple lambdas as same app
- cors

### Example usage
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
  cors: true
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