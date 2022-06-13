# Second Life Say (토큰 보상 커뮤니티)
> 커뮤니티 활동 참여 보상으로 토큰을 지급하는 어플리케이션

<img src="https://img.shields.io/badge/Javascript-F7DF1E?style=flat&logo=Javascript&logoColor=white"/></a>
<img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white"/></a>
<img src="https://img.shields.io/badge/Redux-764ABC?style=flat&logo=Redux&logoColor=white"/></a>
<img src="https://img.shields.io/badge/Solidity-363636?style=flat&logo=Solidity&logoColor=white"/></a>
<img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=Node.js&logoColor=white"/></a>
<img src="https://img.shields.io/badge/Express-000000?style=flat&logo=Express&logoColor=white"/></a>
<img src="https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=MongoDB&logoColor=white"/></a>

유저들이 명언 또는 좋은 글귀를 남길 수 있는 커뮤니티 어플리케이션입니다. 글을 작성 시 보상으로 토큰을 지급합니다. 그리고 다른 유저들이 해당 글에 좋아요를 누르면 글을 작성한 유저에게 토큰이 추가로 지급되고 댓글을 달면 댓글을 단 유저들에게 토큰을 지급합니다. 이렇게 토큰을 보상으로 주면서 유저들의 커뮤니티 참여를 유도하는 것이 프로젝트의 목표입니다. 그리고 이렇게 모은 토큰으로 NFT를 구매할 수 있습니다.  
추가로 유저들의 지갑 정보는 서버에서 관리를 하고 서버의 지갑 주소로 모든 트랜잭션을 관리한다.

<img src="https://user-images.githubusercontent.com/34996487/173279461-e3b932d4-4021-49ba-8867-c07c8c94aa3a.png" width="800"></img>

## 설치 방법
### 클라이언트 실행
```
cd client
npm install
npm start
```
### 서버 실행
```
cd server
npm install
npm run dev
```
### 데몬 시작
```
cd daemon
npm install
npm run start
```
### 데몬 중지
```
npm run stop
```

## 사용 예제 (기능)
### 회원가입 / 로그인
회원가입 시 서버에서 해당 유저의 지갑을 만들고 비밀키는 db에 저장한다.  
로그인을 하게되면 jwt을 발급받는다.

### 글 작성
db에 글 제목, 내용을 저장하고 50 INK 토큰을 서버 지갑 주소로 민팅하고 유저에게 보내준다.

### 좋아요 및 댓글
좋아요와 댓글 데이터를 db에 저장하고 그에 맞는 INK 토큰을 민팅하고 유저에게 보내준다.

### NFT 구매
보유한 INK 토큰으로 NFT를 구매할 수  있다.

## 업데이트 내역
- 1.0.0
  - 이더리움 Rinkeby 테스트넷 지원
  - daemon을 사용해서 주기적으로 트랜잭션 confirm 확인 후 db 업데이트
  - 회원가입 시 50 INK 토큰 지급
  - 글 작성 시 5 INK 토큰 지급
  - 좋아요와 댓글은 1 INK 토큰 지급
  - NFT 민팅

## 라이센스

## 외부 리소스
