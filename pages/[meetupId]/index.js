import MeetUpDetail from '../../components/meetups/MeetUpDetail';
import { MongoClient, ObjectId } from 'mongodb';
import { Fragment } from 'react';
import Head from 'next/head'

const MeetupDetails = (props) => {
  return (
      <Fragment>
          <Head>
            <title>{props.meetupData.title}</title>
            <meta name="description" content={props.meetupData.description}/>
          </Head>
          <MeetUpDetail
            img={props.meetupData.image}
            imageTitle={props.meetupData.title}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description}
            />
      </Fragment>
  );
};

export async function getStaticPaths(){

    const client = await MongoClient.connect('mongodb+srv://miguelToMo:Watashinokuma55!@cluster0.6jwcu.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    // this will just fetch the id
    const meetups = await meetupsCollection.find({},{_id:1}).toArray();

    client.close();

    return {
        fallback: 'blocking',
        paths: meetups.map(meetup => ({ params: {meetupId: meetup._id.toString()},
    }))
    }
};

export async function getStaticProps(context){

    //fetch data for single meetup 

    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect('mongodb+srv://miguelToMo:Watashinokuma55!@cluster0.6jwcu.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    // this will just fetch the id
    const selectedMeetup = await meetupsCollection.findOne({_id: ObjectId(meetupId) });

    client.close();

    return {
        props:{
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description
            },
        },
    };
}

export default MeetupDetails;