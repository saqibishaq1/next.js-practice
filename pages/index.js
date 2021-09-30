import { Fragment } from 'react'
import Head from 'next/head'
import { MongoClient } from 'mongodb'
import MeetupList from '../components/meetups/MeetupList'
import Layout from '../components/layout/Layout'

function Home (props) {

 return (<Fragment>
          <Head>
          <title>Learning Next.JS</title>
            
          </Head>
          <MeetupList meetups={props.meetups} />
        </Fragment>
        )
}
// export async function getServerSideProps(context) {
//   const req = context.req
//   const res = context.req 
  
//   return {
//         props: {
//           meetups: DUMMY_MEETUPS
//       }
//     }
// }
export async function getStaticProps () {
  const client = await MongoClient.connect('mongodb+srv://saqib:12345@cluster0.i6zpm.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db()

    const meetupsCollection = db.collection('meetups')
    const meetups = await meetupsCollection.find().toArray()
    client.close()

  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        id: meetup._id.toString(),
        image: meetup.image,
        address: meetup.address
      }))
  },
  revalidate: 1
}
}

export default Home