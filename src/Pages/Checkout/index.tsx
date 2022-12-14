import { Stepper } from "../../Components/Stepper";
import * as S from "./styles";
import { Title } from "../../Components/Title";
import { useContext, useState } from "react";
import { StepContext } from "../../Contexts/Steps";
import { BillingAdress } from "../../Components/BillingAdress";
import { ShippingMethod } from "../../Components/ShippingMethod";
import { PaymentMethod } from "../../Components/PaymentMethod";
import { ConfirmOrder } from "../../Components/ConfirmOrder";
import { ThanksPage } from "../../Components/ThanksPage";

export const Checkout = () => {
  const { stepLevel } = useContext(StepContext);
  const [totalOrder, setTotalOrder] = useState("");

  return (
    <S.Container>
      {stepLevel === 0 && (
        <Title
          title={"Where should we sent the order?"}
          subtitle={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore."
          }
        />
      )}
      {stepLevel === 1 && (
        <Title
          title={"How would you like to sent this order?"}
          subtitle={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore."
          }
        />
      )}
      {stepLevel === 2 && (
        <Title
          title={"How would you like to pay?"}
          subtitle={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore."
          }
        />
      )}
      {stepLevel === 3 && (
        <Title
          title={"Confirm and enjoy your order 🎉"}
          subtitle={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore."
          }
        />
      )}
      {stepLevel === 4 && (
        <Title
          title={"Yes, you’ve successfully ordered!"}
          subtitle={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore."
          }
        />
      )}
      {stepLevel < 4 && <Stepper />}
      {stepLevel === 0 && <BillingAdress />}
      {stepLevel === 1 && <ShippingMethod />}
      {stepLevel === 2 && <PaymentMethod />}
      {stepLevel === 3 && (
        <ConfirmOrder setTotalOrder={setTotalOrder} totalOrder={totalOrder} />
      )}
      {stepLevel === 4 && <ThanksPage totalOrder={totalOrder} />}
    </S.Container>
  );
};
