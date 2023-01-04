import PhonebookForm from './PhonebookForm'
import PhonebookList from './PhonebookList'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Phonebookseach from './Phonebookseach'
import { useState } from 'react'

export default function Phonebook(props) {
    const [add, setAdd] = useState({
        isAdd: false
    });

    const handleAdd = () => {
        setAdd({
            isAdd: true
        })
    }

    const handleCenceladd = () => {
        setAdd({
            isAdd: false
        })
    }


    return (
        <div className="container-md" >
            <div className="row">
                <div className="col">
                    <div className="card">
                        <div className="card-header">
                            <h1 className="text-center">Phonebook Book Apps</h1>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <div className='row'>
                <div className='col'>
                    <button type="button" className='btn btn-primary' onClick={handleAdd}>
                        {/* <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> */}
                        <span>add</span>
                    </button>
                </div>
            </div>
            <br />
            <div className='row'>
                <div className='col'>
                    {add.isAdd ? <PhonebookForm cencelAdd={handleCenceladd} /> : false}
                </div>
            </div>
            <br></br>
            <div className="row">
                <div className="col">
                    <Phonebookseach />
                </div>
            </div >
            <br></br>
            <div className="row">
                <div className='col'>
                    <PhonebookList />
                </div>
            </div>
            <div className='col'>
            </div>
        </div >
    )
}