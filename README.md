# Bull Polling OPC UA
A system for reading values from OPC UA Server and managing continuous data recording using BullMQ Queue System.


## ⚙️ Setup and Installation

### System Requirements
- Node.js 
- MongoDB
- Redis Server
- OPC UA Server

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables Setup

Create `.env` file in the root directory:

```bash
PORT=3333
OPC_URL=opc.tcp://localhost:4840
MONGO_CONN_STR=mongodb://localhost:27017/express_bullmq?authSource=admin
REDIS_HOST=localhost
REDIS_PORT=6379
```

### 3. Getting Started
Make sure the following services are running:
- MongoDB Server
- Redis Server  
- OPC UA Server

Start the application:
```bash
npm run dev # Start main server and worker
npm run worker # Or start worker separately
```

## 🔌 API Endpoints

1. GET `/` : Check server status
2. POST `/opc` : Read data from specified OPC UA node and save to database
3. GET `/data` : etrieve all recorded data from database
4. POST `/start_record` : Start automatic data recording from OPC UA node at specified interval (milliseconds)
5. GET `/stop_record?node=1` : Stop automatic data recording for specified node 
