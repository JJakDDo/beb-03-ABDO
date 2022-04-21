# API Document #

## Create Account ##

### Request ###

`POST http://127.0.0.1:4000/account`

### Required Body ###

```
{
  "userId": "USER'S ID",
  "password": "USER'S PASSWORD",
  "nickname": "USER'S NICKNAME"
}
```

### Response ###

```
{
  "userId": "USER'S ID",
  "password": "USER'S PASSWORD",
  "nickname": "USER'S NICKNAME",
  "address": "0x1e6A6C5281F406A14a38025daB7Aa9de03c7F953",
  "privateKey": "0x1ad023a3be45192819c87528cd6537944367e4086536612b8250c596c13c5ccf",
  "token": 0,
  "nft": [],
  "_id": "6260cfc719f250d59b6ffca6",
  "__v": 0
}
```

## Get Account ##

### Request ###

`GET http://127.0.0.1:4000/account/:userId`

### Response ###

```
{
  "_id": "6260e8957f6c48c883d0fdc8",
  "userId": "USER'S ID",
  "password": "USER'S PASSWORD",
  "nickname": "USER'S NICKNAME",
  "address": "0x270a21c9bAEf14B4f2c78E3F9B38fe463f56B5ee",
  "privateKey": "0x3bed5a28e9bd3b5539dcdc5033806d303dd3c477e1b507534d9fa2420c1e74b3",
  "token": 0,
  "nft": [],
  "__v": 0
}
```

## Login ##

### Request ###

`POST http://127.0.0.1:4000/account/login`

### Required Body ###

```
{
  "userId": "USER'S ID",
  "password": "USER'S PASSWORD"
}
```

### Response ###

```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJyb2JpbjEiLCJuaWNrbmFtZSI6InJjIiwiaWF0IjoxNjUwNTE4NjUyfQ.am4JrhaKPJ_KyiA9EcdazNHnItJ-qgGFmt0ydDSjMck",
    "userId": "USER'S ID"
}
```
