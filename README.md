# api-infinite



## requirement
1. DB - POSTGRES


| environment variable         | value                                                   |
|------------------------------|---------------------------------------------------------|
| DATABASE                     | infinite                                                |
| PASSWORD                     | ***(db password)                                        |
| DB_HOST                      | localhost                                               |
| USERNAME                     | db userName                                             |
| DB_PORT                      | 5432                                                    |
| DEV_DATABASE_URL             | postgres://<USERNAME>:<PASSWORD>@<DB_HOST>:<DB_PORT>/<> |
| NODE_ENV                     | development                                             |
| JWT_AUDIENCE                 | example.com                                             |
| JWT_ISSUER                   | example.com                                             |
| JWT_SECRET_KEY               | JWT_SECRET_KEY                                          |
| JWT_REFRESH_KEY              | JWT_REFRESH_KEY                                         |
| REFRESH_TOKEN_COOKIE_EXPIRES | 30                                                      |
| ACCESS_TOKEN_COOKIE_EXPIRES  | 60                                                      |
| JWT_ACCESS_TOKEN_EXPIRES     | 5m                                                      |
| JWT_REFRESH_TOKEN_EXPIRES    | 2h                                                      |
  
  
After setting of env variables

1. npm install
2. sequelize db:migrate. // to create tables in db
3. npm start

