import React from "react";
import Style from "./About.module.css";
import NavBar from "../../navbar/NavBar";

const About: React.FC = () => {
    return (
        <div>
            <NavBar />
            <div className={Style.container}>
                <div className={Style.heroSection}>
                    <h1>About MajorAudit</h1>
                    <p>
                        MajorAudit is a project aimed at simplifying the course selection and major planning process for Yale students.
                    </p>
                </div>
                <div className={Style.contentSection}>
                    <section className={Style.section}>
                        <h2>Our Mission</h2>
                        <p>
                            We provide students with accessible, up-to-date tools that assist them in making well-informed decisions about their academic future.
                        </p>
                    </section>
                    <section className={Style.section}>
                        <h2>Our Story</h2>
                        <p>
                            MajorAudit was created by a group of Yale students who experienced the difficulties of academic planning firsthand and wanted a better solution.
                        </p>
                    </section>
                    <section className={Style.section}>
                        <h2>Team</h2>
                        <div className={Style.teamContainer}>
                            <div className={Style.teamMember}>
                                <img
                                    src="https://via.placeholder.com/150"
                                    alt="Team Member 1"
                                    className={Style.teamImage}
                                />
                                <h3>Alex Johnson</h3>
                                <p>Lead Developer</p>
                            </div>
                            <div className={Style.teamMember}>
                                <img
                                    src="https://via.placeholder.com/150"
                                    alt="Team Member 2"
                                    className={Style.teamImage}
                                />
                                <h3>Samantha Lee</h3>
                                <p>Product Designer</p>
                            </div>
                            <div className={Style.teamMember}>
                                <img
                                    src="https://via.placeholder.com/150"
                                    alt="Team Member 3"
                                    className={Style.teamImage}
                                />
                                <h3>Michael Brown</h3>
                                <p>Backend Engineer</p>
                            </div>
                            <div className={Style.teamMember}>
                                <img
                                    src="https://via.placeholder.com/150"
                                    alt="Team Member 4"
                                    className={Style.teamImage}
                                />
                                <h3>Emily Davis</h3>
                                <p>Frontend Engineer</p>
                            </div>
                        </div>
                    </section>
                    <section className={Style.section}>
                        <h2>MajorAudit Alumni</h2>
                        <div className={Style.teamContainer}>
                            <div className={Style.teamMember}>
                                <img
                                    src="https://via.placeholder.com/150"
                                    alt="Alumni Member 1"
                                    className={Style.teamImage}
                                />
                                <h3>John Smith</h3>
                                <p>Former Data Scientist</p>
                            </div>
                            <div className={Style.teamMember}>
                                <img
                                    src="https://via.placeholder.com/150"
                                    alt="Alumni Member 2"
                                    className={Style.teamImage}
                                />
                                <h3>Rachel Adams</h3>
                                <p>Former UX/UI Designer</p>
                            </div>
                            <div className={Style.teamMember}>
                                <img
                                    src="https://via.placeholder.com/150"
                                    alt="Alumni Member 3"
                                    className={Style.teamImage}
                                />
                                <h3>James Wilson</h3>
                                <p>Former Project Manager</p>
                            </div>
                            <div className={Style.teamMember}>
                                <img
                                    src="https://via.placeholder.com/150"
                                    alt="Alumni Member 4"
                                    className={Style.teamImage}
                                />
                                <h3>Olivia Thompson</h3>
                                <p>Former Backend Engineer</p>
                            </div>
                            <div className={Style.teamMember}>
                                <img
                                    src="https://via.placeholder.com/150"
                                    alt="Alumni Member 5"
                                    className={Style.teamImage}
                                />
                                <h3>David Martinez</h3>
                                <p>Former Marketing Lead</p>
                            </div>
                            <div className={Style.teamMember}>
                                <img
                                    src="https://via.placeholder.com/150"
                                    alt="Alumni Member 6"
                                    className={Style.teamImage}
                                />
                                <h3>Laura Chen</h3>
                                <p>Former Full Stack Developer</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default About;
export {};
