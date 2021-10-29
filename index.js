const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
require('dotenv').config()
const cors = require('cors');
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.icwz7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// console.log(uri)

async function run() {
    try {
        await client.connect();
        const database = client.db('world_travel');
        const servicesCollection = database.collection('packages');



        // post api
        app.post('/services', async (req, res) => {
            const service = {
                "working": "holiday",
                "location": "canada",
                "reviews": 4.9,
                "totalReviews": 4532,
                "month": 6,
                "name": "Mammogram",
                "price": 453,
                "viewes": 234,
                "comments": 23,
                "description": "Mammography is the process of using low-energy X-rays to examine the human breast for diagnosis and screening. The goal of mammography is the early detection of breast cancer, typically through detection of characteristic masses or microcalcifications.",
                "imgURL": "https://media.istockphoto.com/photos/happy-best-friends-having-fun-on-a-kayaks-kayaking-on-the-river-picture-id1256457327?b=1&k=20&m=1256457327&s=170667a&w=0&h=FD5pEZkMCLEYx_U2FiNcwFXBWg9vueO33o1bFq44Nv4="
            }
            const result = await servicesCollection.insertOne(service);
            console.log(result)
        })

    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('World travel server');
});

app.listen(port, () => {
    console.log('Word travel listening on the port', port)
})

