import { useState, useEffect } from "react";
import { notification } from "antd";
import axios from "axios";
import {validateProps} from "../types"
import CryptoJS from 'crypto-js';
require('dotenv').config();

export const useForm = (validate: any) => {
  const [values, setValues] = useState({qty:"0"} as validateProps);
  const [errors, setErrors] = useState({});
  const [shouldSubmit, setShouldSubmit] = useState(false);

  const openNotificationWithIcon = () => {
    notification["success"]({
      message: "Success",
      description: "Your message has been sent!",
    });
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>, mintToken: (qty: number) => Promise<void>,
   redeemVoucher: (qty: number, voucherCode: string) => Promise<void>, contract: any) => {
    console.log("handleSubmit called")

    let errors = {} as validateProps;

    console.log(values)
    if (!values.qty) {
      errors.qty = "Quantity entered is a valid number!";
      setErrors(errors);
  
    } else{
      if (!/^\d+$/.test(values.qty) || (parseInt(values.qty) == 0) ){
        errors.qty = "Quantity entered is a valid number!";
        setErrors(errors);
    
      } else{
        if ((parseInt(values.qty) > 10) ){
          errors.qty = "Max mint per transaction is 10!";
          setErrors(errors);
        } else{
          const qty = parseInt(values.qty)
          if((values.hasOwnProperty('promo') && (values.promo?values.promo:"").length>0 || (process.env.REACT_APP_PROMO_CODE && process.env.REACT_APP_PROMO_CODE.length>0))){
            const defaultpromo = process.env.REACT_APP_PROMO_CODE?process.env.REACT_APP_PROMO_CODE:""
            const promoCode = values.promo? values.promo:defaultpromo
            const voucherJson = CryptoJS.AES.decrypt(promoCode,process.env.REACT_APP_ENCRYPTION_KEY?process.env.REACT_APP_ENCRYPTION_KEY: "" ).toString(CryptoJS.enc.Utf8)
            try{
              const voucher = JSON.parse(voucherJson)
              console.log(voucherJson)
              if(voucher.maxRedeem<qty){
                errors.qty = "Max promo redeem per transaction is "+ voucher.maxRedeem+"!";
                setErrors(errors); 
              }else{
                const getAvailableVoucher = async(voucher:any)=>{
                  const availableVoucher = await contract.methods.getAvailableVoucher(voucher).call()
                  if(availableVoucher<qty){
                    errors.qty = availableVoucher +" redeemption left";
                    setErrors(errors);
                  }else{
                    redeemVoucher(qty, promoCode)
                  }
                }
                getAvailableVoucher(voucher)
              }
            }catch(error){
              errors.qty = "OMG, fake promo code entered!";
              setErrors(errors);
            }
          }else{
            mintToken(qty)
          }
        }
      }
    }
    event.preventDefault();
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && shouldSubmit) {
      setValues({qty:"0"});
      openNotificationWithIcon();
    }
  }, [errors, shouldSubmit]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
    setErrors((errors) => ({ ...errors, [event.target.name]: "" }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
  };
};
