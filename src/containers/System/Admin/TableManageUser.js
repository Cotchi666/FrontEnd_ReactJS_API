import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { getAllCodeService } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions"
import './TableManageUser.scss';
import 'react-image-lightbox/style.css'
class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRedux: [],

        }
    }

    async componentDidMount() {
        this.props.fetchUserRedux();


    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers !== this.props.listUsers) {
            let arrGenders = this.props.listUsers
            this.setState({
                userRedux: this.props.listUsers,
            })
        }

    }


    handleDeleteUser = (user) => {
        this.props.deleteAUserRedux(user.id)

    }

    render() {
        let arrUsers = this.state.userRedux;
        return (
            <table id="TableManageUser">
                <tbody>
                    <tr>
                        <th>Email</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Address</th>
                        <th>Actions</th>

                    </tr>
                    {arrUsers && arrUsers.length > 0 &&
                        arrUsers.map((item, index)=>{
                    return(
                    <tr key={index}>


                        <td>{item.email}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.address}</td>
                        <td>
                            <button className="btn-edit"><i className="fas fa-pencil-alt"></i></button>
                            <button onClick={() => this.handleDeleteUser(item)}

                                className="btn-delete"
                            ><i className="fas fa-trash"> </i>

                            </button>
                        </td>

                    </tr>
                    )
                })
                }
                </tbody>
            </table>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        listUsers: state.admin.users

    };
};
const mapDispatchToProps = (state) => {
    return {

        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteAUserRedux: () => dispatch(actions.deleteAUser(id)),
       
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
