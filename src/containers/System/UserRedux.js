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
                    <div >
                        thêm mới người dùng
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
