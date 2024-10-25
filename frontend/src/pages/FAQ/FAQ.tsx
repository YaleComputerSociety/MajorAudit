import React from "react";
import Style from "./FAQ.module.css";
import NavBar from "../../navbar/NavBar";

const FAQ: React.FC = () => {
    return (
        <div>
            <NavBar />
            <div className={Style.container}>
                <div className={Style.heroSection}>
                    <h1>Frequently Asked Questions</h1>
                    <p>Find answers to the most common questions about MajorAudit.</p>
                </div>
                <div className={Style.contentSection}>
                    <section className={Style.faqItem}>
                        <h2>What is MajorAudit?</h2>
                        <p>
                            MajorAudit is a tool designed to help Yale students effectively plan and track their course requirements for their major, providing an intuitive and accessible overview of course options and major planning.
                        </p>
                    </section>
                    <section className={Style.faqItem}>
                        <h2>How do I use MajorAudit?</h2>
                        <p>
                            Simply log in using your Yale credentials and start selecting courses you have taken or plan to take. MajorAudit will automatically evaluate your progress based on the chosen major.
                        </p>
                    </section>
                    <section className={Style.faqItem}>
                        <h2>Who can use MajorAudit?</h2>
                        <p>
                            Any Yale student can use MajorAudit. It’s designed to make your academic planning smoother and help you stay on top of your major requirements.
                        </p>
                    </section>
                    <section className={Style.faqItem}>
                        <h2>Is MajorAudit affiliated with Yale?</h2>
                        <p>
                            MajorAudit was created by a group of Yale students but is not officially affiliated with Yale University.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
