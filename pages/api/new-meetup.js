import { MongoClient } from 'mongodb'

async function handler (req, res)  {
  if(req.method === 'POST'){
    const data = req.body
    const { title , image , address , description} = data

    const client = await MongoClient.connect('mongodb+srv://saqib:12345@cluster0.i6zpm.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db()

    const meetupsCollection = db.collection('meetups')
    const  result = await meetupsCollection.insertOne(data)

    console.log(result)
    client.close()
    
    res.status(200).json({message: 'Meetup Inserted'})
  
  
  }

}
export default handler