import Steppers from "components/Steppers";

const SteupSteppers = ({ step }: { step: number }) => {
  return (
    <Steppers
      steppers={["/product/add", "/product/add-2", "/product/add-3"]}
      currentStep={step}
    />
  );
};

export default SteupSteppers;
