// ourdomain.com/new-meetup

import { useRouter } from 'next/router';
import { Fragment } from 'react';
import NewMeetupForm from '../../components/meetups/NewMeetupForm'
import Head from 'next/head'

const NewMeetupPage = () =>{

    const router = useRouter();

    const addMeetupHandler = async (enteredMeetupData) =>{
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        console.log(data);

        // TODO use replace to avoid going back to previous page 
        router.push('/');
    }

    return (<Fragment>
        <Head>
            <title> Add a new meetup</title>
            <meta name="description" content="Add your own meetup"/>
        </Head>
        <NewMeetupForm onAddMeetup={addMeetupHandler}/>
        </Fragment>)
};

export default NewMeetupPage;