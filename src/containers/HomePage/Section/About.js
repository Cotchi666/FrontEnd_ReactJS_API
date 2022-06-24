import React, { Component } from "react";
import { connect } from "react-redux";

class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-about-header">
            Nguyễn Ngọc Chiến 

        </div>

        <div  className="section-about-content">
            <div className="content-left">
            <iframe width="100%" height="auto" src="https://www.youtube.com/embed/j57IzkTFnT8?list=RDj57IzkTFnT8" title="G-DRAGON - THAT XX (그 XX) M/V" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

            </div>
            <div className="content-right">
                    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbvvvvvvvvvvvvvvvvvvvvvvvvvvv
            </div>
            
        </div>

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
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
