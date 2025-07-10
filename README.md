# Bull Polling OPC UA

A system for reading values from OPC UA Server and managing continuous data recording using BullMQ Queue System.

## 📋 Features

- **OPC UA Data Reading**: Connect and read values from OPC UA Server
- **Queue System**: Use BullMQ for managing background jobs
- **Data Recording**: Continuously record data to MongoDB database
- **REST API**: API endpoints for controlling operations
- **Worker Process**: Process jobs with concurrent execution

## 🛠 Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **BullMQ** - Queue management system
- **Redis** - Message broker
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **node-opcua** - OPC UA client library

## 📁 Project Structure

```
bull-polling/
├── config/
│   ├── bull.conf.js       # BullMQ configuration
│   └── db/
│       └── config.js      # MongoDB database configuration
├── models/
│   └── opcValue.js        # Model for storing OPC data
├── routes/
│   └── index.routes.js    # API routes
├── services/
│   ├── opc.js            # Service for OPC UA data reading
│   └── worker.js         # Worker process for job processing
├── index.js              # Main application file
├── package.json
└── README.md
```

## ⚙️ Setup and Installation

### System Requirements
- Node.js (version 18+)
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
# Start main server and worker
npm run dev

# Or start worker separately
npm run worker
```

## 🔌 API Endpoints

### 1. Health Check
```http
GET /
```
Check server status

### 2. Read OPC UA Data
```http
POST /opc
Content-Type: application/json

{
    "node": "1"
}
```
Read data from specified OPC UA node and save to database

### 3. View Recorded Data
```http
GET /data
```
Retrieve all recorded data from database

### 4. Start Automatic Data Recording
```http
POST /start_record
Content-Type: application/json

{
    "node": "1",
    "everyMs": 3000
}
```
Start automatic data recording from OPC UA node at specified interval (milliseconds)

### 5. Stop Automatic Data Recording
```http
GET /stop_record?node=1
```
Stop automatic data recording for specified node

## 💾 Data Structure

### OpcValue Model
```javascript
{
    value: String,      // Value read from OPC UA
    node: String,       // Node name where data is read
    createdAt: Date     // Date and time when data was recorded
}
```

## 🔧 System Architecture

1. **OPC UA Reading**: System connects to OPC UA Server and reads values from specified nodes
2. **Queue Management**: Uses BullMQ for managing scheduled data reading jobs
3. **Data Storage**: Stores read data into MongoDB
4. **Worker Processing**: Worker process handles jobs concurrently (up to 50 jobs simultaneously)

## 🚀 Deployment

### Using Docker
```bash
# Build image
docker build -t bull-polling-app .

# Run container
docker run -p 3333:3333 --env-file .env bull-polling-app
```

## 🐛 Troubleshooting

### Common Issues

1. **Cannot connect to OPC UA Server**
   - Check OPC UA Server URL and port
   - Check firewall settings

2. **Cannot connect to MongoDB**
   - Check connection string
   - Check database access permissions

3. **Redis connection error**
   - Ensure Redis Server is running
   - Check host and port settings

## 📄 License

ISC License
