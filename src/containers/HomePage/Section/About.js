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
            <iframe width="100%" height="400px" src="https://www.youtube.com/embed/K0ibBPhiaG0?list=RDK0ibBPhiaG0" title="Ed Sheeran - Castle On The Hill [Official Music Video]" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

            </div>
            <div className="content-right">
             <p>asssssssssssssdasdasdasdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        
                asssssssssssssdasdasdasdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaád
                asssssssssssssdasdasdasdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                asssssssssssssdasdasdasdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        
                asssssssssssssdasdasdasdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaád
                asssssssssssssdasdasdasdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                asssssssssssssdasdasdasdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        
                asssssssssssssdasdasdasdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaád
                asssssssssssssdasdasdasdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                asssssssssssssdasdasdasdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        
                asssssssssssssdasdasdasdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaád
                asssssssssssssdasdasdasdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa


             </p>
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
  return {    // changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
};
};
export default connect(mapStateToProps, mapDispatchToProps)(About);
