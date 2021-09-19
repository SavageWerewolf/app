import { validateProps } from "../../common/types";

export default function validate(values: validateProps) {
  let errors = {} as validateProps;

  console.log(values)
  if (!values.qty) {
    errors.qty = "Quantity entered is a valid number!";

  } else if (!/\d/.test(values.qty) || (parseInt(values.qty) == 0) ){
    errors.qty = "Quantity entered is a valid number!";

  } else if ((parseInt(values.qty) > 10) ){
    errors.qty = "Max mint per transaction is 10!";

  } 
  
  console.log("validate: "+ errors)
  return errors;
}
