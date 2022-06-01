
import { NextPage } from 'next'
import dynamic from 'next/dynamic'

const NewToy = dynamic(() => import('../components/NewToy'),
{ 
    ssr: false,
    loading: () => <p>...</p>
});

const NewToyTest: NextPage = () => {
    //@ts-ignore
    return <NewToy/>
}



export default NewToyTest

