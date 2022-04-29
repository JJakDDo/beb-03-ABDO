# API Document

## Create Account

### Request

`POST http://127.0.0.1:4000/account`

### Required Body

```
{
  "userId": "USER'S ID",
  "password": "USER'S PASSWORD",
  "nickname": "USER'S NICKNAME"
}
```

### Response

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

## Get Account

### Request

`GET http://127.0.0.1:4000/account/:userId`

### Response

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

## Login

### Request

`POST http://127.0.0.1:4000/account/login`

### Required Body

```
{
  "userId": "USER'S ID",
  "password": "USER'S PASSWORD"
}
```

### Response

```
{
  "jsonWebToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJyb2JpbjEiLCJuaWNrbmFtZSI6InJjIiwiaWF0IjoxNjUwNTE4NjUyfQ.am4JrhaKPJ_KyiA9EcdazNHnItJ-qgGFmt0ydDSjMck",
  "userId": "USER'S ID",
  "nickname": "USER'S NICKNAME",
  "nft": "USER'S NFT ARRAY",
  "token": "USER'S TOKEN"
}
```

## Post Writing

### Request

`POST http://localhost:4000/writing`

### Required Headers

```
Authorization: Bearer [Access Token]
Content-Type: application/json
```

### Required Body

```
{
  "title": "Writing's Title",
  "content": "Writing's Content"
}
```

### Response

```
{
  "status": "success or fail",
  "data": {
    "writingId": "Writing's Object ID"
  }
}
```

## Get All Writings

### Request

`GET http://localhost:4000/writing`

### Required Body

```

```

### Response

```
{
  "status": "success or fail",
  "data": [
    {
      "id": "Writing's Object ID",
      "title": "Writing's Title",
      "content": "Writing's Content",
      "writer": "Writer's ID",
      "nickname": "Writer's Nickname",
      "comments": [
        {
          "userId": "Commenter's ID",
          "nickname": "Commenter's Nickname",
          "comment": "Comments"
        }
      ],
      "likes": [
        "Liker's ID"
      ],
      "createdAt": "2022-04-21T05:22:05.709Z"
    }
  ]
}
```

## Get Writings By ID

### Request

`GET http://localhost:4000/writing/[:Writing's Object ID]`

### Required Body

```

```

### Response

```
{
  "status": "success or fail",
  "data": {
    "id": "Writing's Object ID",
    "title": "Writing's Title",
    "content": "Writing's Content",
    "writer": "Writer's ID",
    "nickname": "Writer's Nickname",
    "comments": [
      {
        "userId": "Commenter's ID",
        "nickname": "Commenter's Nickname",
        "comment": "Comments"
      }
    ],
    "likes": [
      "Liker's ID"
    ],
    "createdAt": "2022-04-21T07:49:47.675Z"
  }
}
```

## Like

### Request

`POST http://localhost:4000/writing/like`

### Required Headers

```
Authorization: Bearer [Access Token]
Content-Type: application/json
```

### Required Body

```
{
  "writingId": "Writing's Object ID"
}
```

### Response

```
{
  "status": "success"
}

{
  "status": "fail",
  "message": "Cannot send like again"
}
```

## Comment

### Request

`POST http://localhost:4000/writing/comment`

### Required Headers

```
Authorization: Bearer [Access Token]
Content-Type: application/json
```

### Required Body

```
{
  "writingId": "Writing's Object ID",
  "comment": "Comment"
}
```

### Response

```
{
  "status": "success"
}
```

## Deploy Contract

### Request

`POST http://localhost:4000/deploy`

### Required Headers

```
Content-Type: application/json
```

### Required Body

```
{
  "userId": "Admin's ID",
  "password": "Admin's Password"
}
```

### Response

```
{
  "status": "success"
}
```

## Create NFT

### Request

`POST http://127.0.0.1:4000/nft`

### Required Body

```
{
  "productId": 1,
  "name": "Book_Simple_Red",
  "url": "https://bafybeihx46cyzikbgrb6yxbmwyevlapkoksgp35xh4y7izl5xgg56egxxy.ipfs.nftstorage.link/metadata.json",
  "price": 3000
}
```

### Response

```
{
  "productId": 1,
  "name": "Book_Simple_Red",
  "url": "https://bafybeihx46cyzikbgrb6yxbmwyevlapkoksgp35xh4y7izl5xgg56egxxy.ipfs.nftstorage.link/metadata.json",
  "price": 3000,
  "_id": "6268e62cf439c03ef9ec69a0",
  "__v": 0
}
```

## Get NFTs

### Request

`GET http;//127.0.0.1:4000/nft`

### Response

```
[
    {
        "_id": "6268c3a4c453b8ba5146f2cf",
        "productId": 1,
        "name": "Book_Simple_Red",
        "url": "https://bafybeihx46cyzikbgrb6yxbmwyevlapkoksgp35xh4y7izl5xgg56egxxy.ipfs.nftstorage.link/metadata.json",
        "price": 3000,
        "__v": 0
    },
    {
        "_id": "6268c3bdc453b8ba5146f2d1",
        "productId": 2,
        "name": "Book_Traditional_Black",
        "url": "https://bafybeigsltclk7o5iskyvf5orhqsh54xa2twksmxhjymk3nqzv6ryfa3ri.ipfs.nftstorage.link/metadata.json",
        "price": 5000,
        "__v": 0
    },
    {
        "_id": "6268c3c8c453b8ba5146f2d3",
        "productId": 3,
        "name": "Book_Special_BlackGold",
        "url": "https://bafybeihza6z7pvbds2u6wz6mtmmce7re746jru2f2gx55nm2mierh77gve.ipfs.nftstorage.link/metadata.json",
        "price": 8000,
        "__v": 0
    },
    {
        "_id": "6268c3d1c453b8ba5146f2d5",
        "productId": 4,
        "name": "Book_Special_WhiteGold",
        "url": "https://bafybeid4ihocuofauv327ymzk4ifzrcdl35iodaqcnymkab4gxtwx6h72e.ipfs.nftstorage.link/metadata.json",
        "price": 8000,
        "__v": 0
    } 
]
```

## Get NFT

### Request

`GET http://127.0.0.1:4000/nft/:productId`

### Response

```
{
    "_id": "6268c3a4c453b8ba5146f2cf",
    "productId": 1,
    "name": "Book_Simple_Red",
    "url": "https://bafybeihx46cyzikbgrb6yxbmwyevlapkoksgp35xh4y7izl5xgg56egxxy.ipfs.nftstorage.link/metadata.json",
    "price": 3000,
    "__v": 0
}
```

## Buy NFT

### Request

`POST http://127.0.0.1:4000/nft/:productId`

### Required Body

```
{
  userId: BUYER'S USERID
}
```

### Response

```
[
  {
    "productId": 2,
    "name": "Book_Traditional_Black",
    "url": "https://bafybeigsltclk7o5iskyvf5orhqsh54xa2twksmxhjymk3nqzv6ryfa3ri.ipfs.nftstorage.link/metadata.json",
    "price": 5000,
    "_id": "626a3e844e7cabf2431a3c86"
  },
  // other nft products
]
```
