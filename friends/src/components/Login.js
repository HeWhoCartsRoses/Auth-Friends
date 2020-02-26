
import React from 'react';
import { auth } from './auth';

class Login extends React.Component {
    state = {
        credentials: {
            username: '',
            password: ''
        }
    };
    handleChange = (e) => {
        this.setState({
            credentials: { ...this.state.credentials, [e.target.name]: e.target.value }
        });
    };
    login = (e) => {
        e.preventDefault();

        auth()
            .post('/api/login', this.state.credentials)
            .then((res) => {
                console.log(res)
                localStorage.setItem('token', res.data.payload);
                this.props.history.push('/protected');
            })
            .catch((err) => console.log(err.response));
    };
    render() {
        return (
            <div className="login">
                <form onSubmit={this.login}>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={this.state.credentials.username}
                        onChange={this.handleChange}
                    /><br></br>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={this.state.credentials.password}
                        onChange={this.handleChange}
                    />
                    <br></br>
                    <button>Log in</button>
                </form>
            </div>
        );
    }
}

export default Login;