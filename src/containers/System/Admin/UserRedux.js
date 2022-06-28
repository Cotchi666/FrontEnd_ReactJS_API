import React, { Component } from "react";
import { connect } from "react-redux";

class UserRedux extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="user-redux-container">
                <div className="title">
                    User redux chien
                </div>
                <div className="user-redux-body">
                    <div className="container" >
                        <div className="row">

                            <div className="col-12"><FormattedMessage id ="manage-user.add"/></div>
                            <div className="col-3">
                                <label> <FormattedMessage id ="manage-user.email"/></label>
                                <input className="form-control" type="email" />
                            </div>
                            <div className="col-3">
                                <label> <FormattedMessage id ="manage-user.password"/></label>
                                <input className="form-control" type="password" />
                            </div>
                            <div className="col-3">
                                <label> <FormattedMessage id ="manage-user.first-name"/> </label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-3">
                                <label> <FormattedMessage id ="manage-user.last-name"/></label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-3">
                                <label> <FormattedMessage id ="manage-user.phone-number"/> </label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-3">
                                <label> <FormattedMessage id ="manage-user.address"/> </label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-3">
                                <label> <FormattedMessage id ="manage-user.position"/> </label>
                                <select className="form-control" >
                                    <option selected> Choose</option>
                                    <option > ...</option>

                                </select>
                            </div>
                            <div className="col-3">
                                <label>  <FormattedMessage id ="manage-user.role"/> </label>
                                <select className="form-control" >
                                    <option selected> Choose...</option>
                                    <option > ...</option>

                                </select>
                            </div>
                            <div className="col-3">
                                <label>  <FormattedMessage id ="manage-user.image"/> </label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-12">   
                            <button className="btn btn-primary">
                            <FormattedMessage id ="manage-user.save"/>
                             </button>
                             </div>


                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {};
};
const mapDispatchToProps = (state) => {
    return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
