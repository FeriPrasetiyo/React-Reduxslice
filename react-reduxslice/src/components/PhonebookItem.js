// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
// import { updateUser } from '../actions/users';
import { useDispatch } from 'react-redux';
import {
    updateUserAsync
} from '../features/user/userSlice';

export default function PhonebookItem(props) {
    const dispatch = useDispatch()
    const [user, setUser] = useState({
        name: props.user.name,
        phone: props.user.phone,
    });

    const [status, setStatus] = useState({
        isEdit: false
    });

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setUser({
            ...user,
            [name]: value,
        });
    }

    const handleEdit = () => {
        setStatus({
            isEdit: true
        })
    }

    const handleCencel = () => {
        setUser({
            name: props.user.name,
            phone: props.user.phone,
        })
        setStatus({
            isEdit: false
        })
    }

    const saveEdit = () => {
        dispatch(updateUserAsync({ id: props.user.id, name: user.name, phone: user.phone }))
        setStatus({ isEdit: false })
    }

    return (
        <tr>
            <td>{props.no}</td>
            <td>
                {status.isEdit ?
                    <input className='form-control' type='text' name='name' value={user.name} placeholder='masukan name' onChange={handleInputChange} />
                    :
                    user.name
                }
            </td>
            <td>
                {status.isEdit ?
                    <input className='form-control' type='number' name='phone' value={user.phone} placeholder='masukan name' onChange={handleInputChange} />
                    :
                    user.phone
                }
            </td>
            {
                props.user.sent ?
                    status.isEdit ?
                        <td>
                            <div className="row">
                                <div className="col-sm-5">
                                    <button type="button" className="btn btn-info" onClick={saveEdit}>
                                        {/* <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon> */}
                                        <span>Save</span>
                                    </button>
                                </div>
                                <div className="col-sm-6">
                                    <button className="btn btn-warning" type="button"
                                        onClick={handleCencel}>
                                        {/* <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon> */}
                                        <span>Cencel</span>
                                    </button>
                                </div>
                            </div>
                        </td>
                        :
                        <td>
                            <div className="row">
                                <div className="col-sm-4">
                                    <button type="button" className="btn btn-success" onClick={handleEdit}>
                                        {/* <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon> */}
                                        <span>Edit</span>
                                    </button>
                                </div>
                                <div className="col-sm-5">
                                    <button className="btn btn-danger" type="button"
                                        onClick={props.remove}>
                                        {/* <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon> */}
                                        <span>Delete</span>
                                    </button>
                                </div>
                            </div>
                        </td>
                    :
                    <td>
                        <div className="row">
                            <div className="col">
                                <button className="btn btn-warning" type="button"
                                    onClick={props.resend}>
                                    {/* <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon> */}
                                    <span>resend</span>
                                </button>
                            </div>
                        </div>
                    </td>
            }
        </tr >
    )
}