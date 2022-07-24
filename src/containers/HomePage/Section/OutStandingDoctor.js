import { isBuffer } from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";

import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from 'react-intl';

class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux,
      });
    }
  }

  componentDidMount() {
    this.props.loadTopDocTors();
  }
  render() {
    let arrDoctors = this.state.arrDoctors;
    let { language } = this.props;

    // arrDoctors = arrDoctors.concat(arrDoctors).concat(arrDoctors)
    console.log('check doctor data react data ',arrDoctors)
    return (
      <div className="section-share section-outstanding-doctor">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section"><FormattedMessage id="homepage.outstanding-doctor"></FormattedMessage></span>
            <button className="btn-section"><FormattedMessage id="homepage.more-info"></FormattedMessage></button>
          </div>

          <div className="section-body">
            <Slider {...this.props.settings}>
              {arrDoctors &&
                arrDoctors.length > 0 &&
                arrDoctors.map((item, index) => {
                  let imageBase64 = "";
                  if (item.image) {
                    imageBase64 = new Buffer(item.image, "base64").toString(
                      "binary"
                    );
                  }
                  let nameVi = `${item.positionData.valueVi},${item.lastName} ${item.firstName}`;
                  let nameEn = `${item.positionData.valueEn},${item.lastName} ${item.firstName}`;
                  return (
                    <div className="section-customize" key={index}>
                      <div className="customize-border">
                        <div className="outer-bg">
                          <div
                            className="bg-image section-outstanding-doctor"
                            style={{ backgroundImage: `url(${imageBase64})` }}
                          />
                        </div>
                        <div className="position text-center">
                          <div>
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                          </div>
                          <div>Cơ xương khớp</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    topDoctorsRedux: state.admin.topDoctors,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    // changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    loadTopDocTors: () => dispatch(actions.fetchTopDoctor()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
