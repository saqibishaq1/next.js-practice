import Axios from 'axios'
import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm'
function NewMeetups () {
  const router = useRouter()
  
  async function addMeetupHandler(enteredMeetupData) {
    const res = await Axios.post('/api/new-meetup' , enteredMeetupData)

    console.log(res.data);
    
    router.push('/')

  }
  return <NewMeetupForm  onAddMeetup={addMeetupHandler} />
}

export default NewMeetups