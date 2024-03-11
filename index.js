const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://blogy-sr.vercel.app',
      'https://blogy-sr.netlify.app',
    ],
    methods: ['POST', 'GET', 'PATCH', 'DELETE'],
    credentials: true,
  })
);
app.use(express.json());

const uri =
  'mongodb+srv://Shafayet:Shafayet111@cluster0.8laudjn.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const userRoutes = require('./routes/userRoutes');
const postsRoutes = require('./routes/postsRoutes');

async function run() {
  try {
    // await client.connect();

    const userCollection = client.db('blogy').collection('users');
    const postsCollection = client.db('blogy').collection('posts');

    app.use('/user', userRoutes(userCollection));
    app.use('/posts', postsRoutes(postsCollection));

    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Blogy server is running');
});

app.listen(port, () => {
  console.log(`Server is running at PORT: ${port}`);
});
