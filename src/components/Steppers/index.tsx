import { IonIcon } from "@ionic/react";
import { checkmarkOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import "./index.css";
interface SteppersProps {
  currentStep: number;
  steppers: string[];
}

const Steppers: React.FC<SteppersProps> = ({ currentStep, steppers }) => {
  const history = useHistory();
  return (
    <div className="wrapper option-1 option-1-1">
      <ol className="c-stepper">
        {steppers.map((stepper, index) => (
          <li
            className={`c-stepper__item `}
            onClick={() => index < currentStep - 1 && history.push(stepper)}
          >
            <h3
              className={`c-stepper__title ${
                index > currentStep - 1 && "c-stepper__title__undone"
              } `}
            >
              {index >= currentStep - 1 ? (
                index + 1
              ) : (
                <IonIcon
                  icon={checkmarkOutline}
                  style={{ fontSize: 18, fontWeight: 700 }}
                />
              )}
            </h3>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Steppers;
