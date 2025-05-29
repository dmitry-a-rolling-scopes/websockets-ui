# RSSchool NodeJS websocket task template
> Static http server and base task packages. 
> By default WebSocket client tries to connect to the 3000 port.

## Installation
1. Clone/download repo
2. `npm install`

## Usage
**Development**

```bash

npm run start:server:dev
```

* App WebSocket served @ [ws://localhost:3000](ws://localhost:3000) with `tsx watch`

```bash

npm run start:dev
```

* App UI served @ [http://localhost:8181](http://localhost:8181) with `nodemon`

**Production**

```bash

npm run start:server
```

* App WebSocket served @ [ws://localhost:3000](ws://localhost:3000) without `tsx`

```bash

npm run start
```

* App UI served @ [http://localhost:8181](http://localhost:8181) without `nodemon`

---

**All commands**

Command | Description
--- | ---
`npm run start:server:dev` | App WebSocket served @ [ws://localhost:3000](ws://localhost:3000) with `tsx watch`
`npm run start:dev` | App UI served @ [http://localhost:8181](http://localhost:8181) with `nodemon`
`npm run start:server` | App WebSocket served @ [ws://localhost:3000](ws://localhost:3000) without `tsx`
`npm run start` | App UI served @ [http://localhost:8181](http://localhost:8181) without `nodemon`

**Note**: replace `npm` with `yarn` in `package.json` if you use yarn.
