import React from 'react';
import { auth } from './auth';
class Form extends React.Component {
    state = {
        id: 0,
        name: '',
        age: '',
        email: ''
    };
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    createFriend = (e) => {
        e.preventDefault();
        const newFriend = {
            id: Date.now(),
            name: this.state.name,
            age: Number(this.state.age),
            email: this.state.email
        };
        this.addFriend(newFriend);
    };
    addFriend = (newFriend) => {
        auth()
            .post('/api/friends', newFriend)
            .then((res) => {
                console.log('Form post response', res);
                this.props.getData();
            })
            .catch((err) => console.log(err.response));
    };
    render() {
        return (
            <div className="Form">
                <form onSubmit={this.createFriend}>
                    <input type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        placeholder="Name" /><br />
                    <input type="text"
                        name="age"
                        value={this.state.age}
                        onChange={this.handleChange}
                        placeholder="Age" /><br />
                    <input type="text"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        placeholder="Email" /><br />
                    <button>Add Friend</button>
                </form>
            </div>
        );
    }
}
export default Form;