import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
import Head from 'next/head'
import { Fragment } from 'react/cjs/react.production.min';


const HomePage = (props) =>{

    return (<Fragment>
        <Head>
            <title>Meetups</title>
            <meta name="description" content="Browse a list of meetups"/>
        </Head>
        <MeetupList meetups={props.meetups}/>
        </Fragment>)
};

// this function will not run during the build but on the server after deployment
// runs for any upcoming request 
// export async function getServerSideProps(context){

//     const req = context.req;
//     const res = context.res;

//     return {
//         props:{
//             meetups: DUMMY_MEETUPS
//         }
//     };

// }

export async function getStaticProps() {
    // here you can execute code that will normally run on a server, access file system , securetly connect to data base
    // this code will never end on the client side and won't ececute on the client side 
    // this is executed on the build process. This will always return an object 

    const client = await MongoClient.connect('mongodb+srv://miguelToMo:Watashinokuma55!@cluster0.6jwcu.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find().toArray();

    client.close();

    return {
        props: {
            meetups:meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        },
        // ensures this page is updated on the server every indicated time after deployment
        revalidate: 1
    };
}

export default HomePage;