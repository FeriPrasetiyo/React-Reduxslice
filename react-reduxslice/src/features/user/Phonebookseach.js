import { useCallback, useState } from "react";
// import { searchUser } from "../actions/users";
import { useDispatch } from 'react-redux'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBan, faCheck } from '@fortawesome/free-solid-svg-icons'

import {
    searchUser
} from './userSlice';

export default function PhonebookForm(props) {
    const dispatch = useDispatch()
    const [user, setUser] = useState({
        name: '',
        phone: ''
    });

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setUser({
            ...user,
            [name]: value
        });
    }

    const handleSubmit = useCallback((event) => {
        event.preventDefault()
        dispatch(searchUser({ name: user.name, phone: user.phone }))
        setUser({ name: '', phone: '' })
    }, [dispatch, user])

    const handleCencel = () => {
        setUser({ name: '', phone: '' })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h6>Search Form</h6>
                        </div>
                        <div className="card-body">
                            <div className='row justify-content-around'>
                                <div className='col-4'>
                                    <div className="mb-3 row">
                                        <label htlmfor="name" className="col-sm-2 col-form-label">Name</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" name='name' onChange={handleInputChange} value={user.name} />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-4'>
                                    <div className="mb-3 row">
                                        <label htlmfor="phone" className="col-sm-2 col-form-label">Phone</label>
                                        <div className="col-sm-10">
                                            <input type="number" className="form-control" name='phone' onChange={handleInputChange} value={user.phone} />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-1'>
                                    <div className="mb-3 row">
                                        <button type="submit" className="btn btn-primary">
                                            {/* <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon> */}
                                            <span>Search</span>
                                        </button>
                                    </div>
                                </div>
                                <div className='col-1'>
                                    <div className="mb-3 row">
                                        <button type="button" onClick={handleCencel} className="btn btn-warning">
                                            {/* <FontAwesomeIcon icon={faBan}></FontAwesomeIcon> */}
                                            <span>Cencel</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
