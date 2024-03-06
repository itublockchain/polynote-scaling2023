# Polynote

Private note taking application #buidl on [Polybase](https://polybase.xyz/) for [ETHGlobal Scaling 2023 Hackathon](https://ethglobal.com/events/scaling2023).

<img style="width: 320px" src="https://raw.githubusercontent.com/itublockchain/polynote-scaling2023/master/docs/logo.png">

## Project description

Polybase is a great tool for storing your scaling data on Web3. Our main goal is to create an application which reaches to end-users and used in daily basis. We decided to build a private note taking application on Polybase. The users will connect their wallets and start taking notes, which are going to be written to Polybase collections after being encrypted. Users will be able to whitelist wallets through a smart contract which is going to be deployed on Zksync. We are sending a push notification to shared addresses through Push SDK to let them know about the note link. Our text editor supports various features like image upload, text highlighting, headlines, code blocks, and more.

## zkSync Smart Contract

[0x29e362244AB911d7Adc78dc08561a1C514D9096C](https://sepolia.explorer.zksync.io/address/0x7e615C0ad8C5BD894e42d3E3c7b0C533dFfC1cA0)

## Build

**Build frontend**

```bash
$ cd ./polynote-frontend
$ npm install # Install dependencies
$ npm run dev  # Run development server
```

**Build backend**

**Step 1 - Create docker compose**

1. Create `docker-compose.yaml` on `./polynote-backend` directory.

2. Copy the file below and fill environment section

```
version: '3.8'
services:
  polynote-api:
    image: asgarovfarhad/polynote-api:1.0.0
    container_name: polynote-api
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - 8000:8000
    environment:
      - APP_CORS=*
      - APP_PORT=8000
      - API_VERSION=1
      - APP_VERSION=development
      - PRIVATE_KEY= # Your private key
      - ENCRYPTION_KEY=[] # Read more at https://polybase.xyz/docs/encrypt-data#encrypt-data-using-symmetric-encryption
      - NETWORK_RPC_URL=https://sepolia.era.zksync.dev
      - POLYNOTE_CONTRACT= # Your zksync contract address (Default is 0x29e362244AB911d7Adc78dc08561a1C514D9096C)
      - DB_NAMESPACE= # Your unique namespace string (default is polynote)
      - WEB3_STORAGE_TOKEN= # Read more at https://web3.storage/
      - OPEN_AI_KEY=sk-
    platform: linux/amd64
    restart: always
```

### Note

The https://web3.storage/ is under maintenance after sunset and we are working on integrating new APIs.

**Step 2 - Run Docker**

```bash
$ docker compose build
$ docker compose up -d
```

The server will run on port specified in `docker-compose.yaml`, which defaults to 8000.

## Tech Stack

| Tech                               | Field                 |
| ---------------------------------- | --------------------- |
| [Polybase](https://polybase.xyz/)  | Web3 Database         |
| [Filecoin](https://filecoin.io/)   | Decentralized Storage |
| [NestJS](https://nestjs.com/)      | Backend               |
| [ReactJS](https://react.dev/)      | Frontend              |
| [Hardhat](https://hardhat.org/)    | Smart Contracts       |
| [Zksync](https://zksync.io/)       | L2                    |
| [Push Protocol](https://push.org/) | Notification service  |
| [TiptapJS](https://tiptap.dev/)    | Text Editor           |
