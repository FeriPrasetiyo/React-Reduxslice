import React, { Component } from 'react';
import { connect } from 'react-redux'
import { loadmoreUser, loadUser, removeUser, resendUser, updateUser } from "../actions/users";
import PhonebookItem from "../components/PhonebookItem"

class PhonebookList extends Component {
    componentDidMount() {
        this.props.load()
    }

    scrolling = (event) => {
        var element = event.target;
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            this.props.loadmore()
            console.log('masuk')
        }
    }
    render() {
        return (
            <div className="col" onScroll={this.scrolling} style={{ overflowY: 'scroll', height: 200 }}>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.users.map((user, index) => (
                            <PhonebookItem
                                key={user.id + 1}
                                no={index + 1}
                                user={user}
                                remove={() => this.props.remove(user.id)}
                                resend={() => this.props.resend(user.id, user.name, user.phone)}
                                update={this.props.update}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        users: state.phoneBook.users
    }
}

const mapDispatchToProps = (dispatch) => ({
    load: () => dispatch(loadUser()),
    remove: (id) => dispatch(removeUser(id)),
    resend: (id, name, phone) => dispatch(resendUser(id, name, phone)),
    update: (id, name, phone) => dispatch(updateUser(id, name, phone)),
    loadmore: () => dispatch(loadmoreUser())
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PhonebookList)