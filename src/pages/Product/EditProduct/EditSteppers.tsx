import Steppers from "components/Steppers";

const EditSteppers = ({ step }: { step: number }) => {
  return (
    <Steppers
      steppers={["/product/edit", "/product/edit-2", "/product/edit-3"]}
      currentStep={step}
    />
  );
};

export default EditSteppers;
