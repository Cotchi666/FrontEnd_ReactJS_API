import React, { Component } from "react";
import { connect } from "react-redux";
import "./UserManage.scss";

import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import ModalUser from "./ModalUser";
import { emitter } from '../../utils/emitter'
import ModalEditUser from "./ModalEditUser";
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenEditModalUser: false,

            userEdit: {}
        };
    }
    async componentDidMount() {
        await this.getAllUsersFormReact();
    }
    getAllUsersFormReact = async () => {
        let response = await getAllUsers("All");
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        })
    }
    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModalUser: false
                })
                emitter.emit("EVENT_CLEAR_MODAL_DATA", { 'id': 'your id' })
            }
        } catch (e) {
            console.log(e)
        }
    }
    handleDeleteUser = async (user) => {
        console.log("click delete", user)
        try {
            let response = await deleteUserService(user.id);
            if (response && response.errCode === 0) {
                await this.getAllUserFromReact();
            } else {

                alert(response.errMessage);
            }


        } catch (e) {
            console.log(e)
        }
    }
    handleEditUser = async (user) => {

        console.log("click delete", user)
        this.setState({

            isOpenEditModalUser: true,
            userEdit: user
        })
    }
    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }
    toggleEditUserModal = () => {
        this.setState({
            isOpenEditModalUser: !this.state.isOpenEditModalUser,
        })
    }
    doEditUser = async (user) => {
        try {
            let res = await editUserService(user);
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenEditModalUser: false
                })
                await this.getAllUsersFormReact()
            } else {
                alert(res.errCode)
            }
        } catch (e) {
            console.log(e)
        }

    }
    render() {

        let arrUsers = this.state.arrUsers;
        console.log(arrUsers);
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                {this.state.isOpenEditModalUser && 
                    <ModalEditUser
                        isOpen={this.state.isOpenEditModalUser}
                        toggleFromParent={this.toggleEditUserModal}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    //  createNewUser={this.createNewUser}
                    />
                }

                <div className="title text-center"> Manage users with Chien ne1</div>
                <div className="mx-1">
                    <button
                        className="btn btn-primary px-3"
                        onClick={() => this.handleAddNewUser()}
                    >
                        <i className="fas fa-plus"></i>
                        Add new users{" "}
                    </button>
                </div>
                <div className="users-table mt-3 mx-1">
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                            {arrUsers &&
                                arrUsers.map((item, index) => {
                                    console.log("eric check map", item, index);
                                    return (
                                        <tr key={index}>
                                            <td> {item.email}</td>
                                            <td> {item.firstName}</td>
                                            <td> {item.lastName}</td>
                                            <td> {item.address}</td>
                                            <td>
                                                <button
                                                    className="btn-edit"
                                                    onClick={() => this.handleEditUser(item)}
                                                >
                                                    <i className="fas fa-pencil-alt"></i>{" "}
                                                </button>
                                                <button
                                                    className="btn-delete"
                                                    onClick={() => this.handleDeleteUser(item)}
                                                >
                                                    <i className="fas fa-trash"></i>{" "}
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
