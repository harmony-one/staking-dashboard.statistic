
### Developer mode

#### run docker-compose
`docker-compose -f docker-compose.dev.yml up -d`

#### run app

`npm run start`


### Build and push docker container

#### Build

`docker build --platform linux/amd64 -t ahiipsa/staking-dashboard-statistic:0.0.3 .`

### Push

`docker push ahiipsa/staking-dashboard-statistic:0.0.3`

### Production

`docker-compose up -d`