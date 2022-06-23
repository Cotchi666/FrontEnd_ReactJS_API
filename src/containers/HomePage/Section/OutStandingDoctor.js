import React, { Component } from "react";
import { connect } from "react-redux";

import Slider from 'react-slick';


class OutStandingDoctor extends Component {


    render() {

        return (
            <div className="section-share section-outstanding-doctor">
                <div className="section-container">
                    <div className="section-header">

                        <span className="title-section">Bác sĩ nổi bật tuần qua</span>

                        <button className="btn-section"> Xem thêm  </button>

                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>

                            <div className="section-customize">
                                <div className="customize-border">
                                    <div className="outer-bg">                           
                                     <div className="bg-image  section-outstanding-doctor" />
                                    </div>
                                    <div className="position text-center">
                                        <div> Giáo sư, Tiến Sĩ Chiến Nguyễn</div>
                                        <div >Cơ xương khớp</div>
                                    </div>
                                   
                                </div>

                            </div>
                            <div className="section-customize">
                                <div className="customize-border">
                                    <div className="outer-bg">                           
                                     <div className="bg-image  section-outstanding-doctor" />
                                    </div>
                                    <div className="position text-center">
                                        <div> Giáo sư, Tiến Sĩ Chiến Nguyễn</div>
                                        <div >Cơ xương khớp</div>
                                    </div>
                                   
                                </div>

                            </div>
                            <div className="section-customize">
                                <div className="customize-border">
                                    <div className="outer-bg">                           
                                     <div className="bg-image  section-outstanding-doctor" />
                                    </div>
                                    <div className="position text-center">
                                        <div> Giáo sư, Tiến Sĩ Chiến Nguyễn</div>
                                        <div >Cơ xương khớp</div>
                                    </div>
                                   
                                </div>

                            </div>
                            <div className="section-customize">
                                <div className="customize-border">
                                    <div className="outer-bg">                           
                                     <div className="bg-image  section-outstanding-doctor" />
                                    </div>
                                    <div className="position text-center">
                                        <div> Giáo sư, Tiến Sĩ Chiến Nguyễn</div>
                                        <div >Cơ xương khớp</div>
                                    </div>
                                   
                                </div>

                            </div><div className="section-customize">
                                <div className="customize-border">
                                    <div className="outer-bg">                           
                                     <div className="bg-image  section-outstanding-doctor" />
                                    </div>
                                    <div className="position text-center">
                                        <div> Giáo sư, Tiến Sĩ Chiến Nguyễn</div>
                                        <div >Cơ xương khớp</div>
                                    </div>
                                   
                                </div>

                            </div><div className="section-customize">
                                <div className="customize-border">
                                    <div className="outer-bg">                           
                                     <div className="bg-image  section-outstanding-doctor" />
                                    </div>
                                    <div className="position text-center">
                                        <div> Giáo sư, Tiến Sĩ Chiến Nguyễn</div>
                                        <div >Cơ xương khớp</div>
                                    </div>
                                   
                                </div>

                            </div>
                            
                        </Slider>
                    </div>

                </div>

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        // changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
