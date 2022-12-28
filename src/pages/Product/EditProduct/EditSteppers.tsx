import Steppers from "components/Steppers";

const EditSteppers = ({ step, code }: { step: number; code: string }) => {
  return (
    <Steppers
      steppers={[
        `/product/edit/${code}`,
        `/product/edit-2/${code}`,
        `/product/edit-3/${code}`,
      ]}
      currentStep={step}
    />
  );
};

export default EditSteppers;
