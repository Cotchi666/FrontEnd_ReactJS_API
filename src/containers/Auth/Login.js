import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import "./Login.scss";
// import { FormattedMessage } from "react-intl";
import {handleLoginAPI} from "../../services/userService";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            isShowPassword: false,
            errMessage :''
        };
    }

    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value,
        });
    };
    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value,
        });
    }
    handleLogin = async () => {
        this.setState({
            errMessage:''
        })
        try{
            let data = await handleLoginAPI(this.state.username,this.state.password);
            if(data &&  data.errCode !== 0){
                this.setState({
                    errMessage : data.message
                })
            }
            if(data &&  data.errCode === 0){
               this.props.userLoginSuccess(data.user)
               console.log('login well')
               console.log(data.user)

            }
        }catch(error){
            if(error.response){
                if(error.response.data){
                    this.setState({
                        errMessage : error.response.data.message
                    })
                }
            }
            console.log("chien", error.response)
        }
    };
    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        });
    };
    render() {
        return (
            //jsx
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-login">login</div>
                        <div className="col-12 form-group login-input">
                            <label> Username: </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your username"
                                value={this.state.username}
                                onChange={(event) => this.handleOnChangeUsername(event)}
                            ></input>
                        </div>
                        <div className="col-12 form-group login-input">
                            <label> Password: </label>
                            <div className="custom-input-password">
                                <input
                                    className="form-control"
                                    placeholder="Enter your password"
                                    type={this.state.isShowPassword ? "text" : "password"}
                                    onChange={(event) => {
                                        this.handleOnChangePassword(event);
                                    }}
                                ></input>
                                <span
                                    onClick={() => {
                                        this.handleShowHidePassword();
                                    }}
                                >
                                    <i
                                        className={
                                            this.state.isShowPassword
                                                ? "far fa-eye"
                                                : "far fa-eye-slash"
                                        }
                                    ></i>
                                </span>
                            </div>
                            <div className="col-12" style={{color :"red"}}></div>
                            {this.state.errMessage}
                        </div>
                        <div className="col-12">
                            <button
                                className="btn-login"
                                onClick={() => {
                                    this.handleLogin();
                                }}
                            >
                                login
                            </button>
                        </div>
                        <div className="col-12">
                            <span className="forgot-password">Forgot your password?</span>
                        </div>
                        <div className="col-12 text-center mt-3">
                            <span className="text-other-login">Or login with:</span>
                        </div>
                        <div className="col-12 social-login">
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
       
        userLoginSuccess:(userInfo) =>   dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
