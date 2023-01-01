import PhonebookForm from '../containers/PhonebookForm'
import PhonebookList from '../containers/PhonebookList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Phonebookseach from '../containers/Phonebookseach'

export default function Phonebook() {
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
                    <button type="button" className='btn btn-primary'>
                        <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                        <span>add</span>
                    </button>
                </div>
            </div>
            <br />
            <div className='row'>
                <div className='col'>
                    <PhonebookForm />
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