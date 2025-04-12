import styles from "./Recommendation.module.css";
import { StudentCourse } from "@/types/type-user";

import { useAuth } from "../../providers";

import { FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";


type RecommendationProps = {
    user: any;
    currYear: number;
  };

  // hold a list of recommendations, each index is a tuple with 3 parts
  // logo (either warning or check), text, recommended courses to put below

  const recommendations = [
    ["warning", "You need to take a WR course in your Sophomore spring. Students with similar interests loved these courses:", []],
    ["warning", "You have 10/12 credits remaining in your major to do in 5 semesters.", []],
    ["good", "Your language requirement is 2/3 complete."]
  ];

  export function RecommendationList() {
    return (
      <div>
        {recommendations.map(([type, message], index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              //backgroundColor: type === "warning" ? "#fff3cd" : "#d4edda",
              //borderLeft: type === "warning" ? "5px solid #ffc107" : "5px solid #28a745",
              paddingTop: "12px",
              //borderRadius: "8px"
            }}
          >
            {type === "warning" ? (
              <FaExclamationTriangle color="#ffc107" />
            ) : (
              <FaCheckCircle color="#28a745" />
            )}
            <span className={styles.text}>{message}</span>
          </div>
        ))}
      </div>
    );
  }

function Recommendation({ user, currYear }: RecommendationProps)
{

return (
    <div className={styles.RecommendationContainer}>
    <p className={styles.text} style = {{fontSize: "17px", color: "black"}}>Hey {user.name}! We have some...</p>
    <div className={styles.title_text} style = {{ fontSize: "30px"}}>
        Recommendations
        </div> 
    <RecommendationList/>
  </div>
  );
}

export default Recommendation;
