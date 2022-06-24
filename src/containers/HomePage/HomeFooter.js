import React, { Component } from "react";
import { connect } from "react-redux";

class HomeFooter extends Component {
  render() {
    return (
      <div className="home-footer">
        <p>
          &copy; 2022 Chien more infomation, please visit my github.
          <a target="_blank" href="https://github.com/Cotchi666">
            &#8594; Click here &#8592;
          </a>
        </p>

        <p>đoạn text này tôi không hiểu vì sao lại có nếu
             ko dùng thì footer lại không hiện</p>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    // changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
