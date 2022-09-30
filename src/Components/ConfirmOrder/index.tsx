import * as S from "./styles";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlinePlusCircle, AiOutlineSend } from "react-icons/ai";
import { CardProducts } from './../CardProducts/index';
import IndustrialTable from "../../assets/IndustrialTable.jpg"
import IndustrialSofaTable from "../../assets/IndustrialSofaTable.jpg"
import { Input } from './../Input/styles';
import { useEffect, useState, useContext } from 'react'
import NortonIcon from "../../assets/NortonIcon.svg";
import { BsArrowRightShort } from "react-icons/bs";
import { StepContext } from "../../Contexts/Steps";

const products = [
  {
    name: "Industrial Table",
    price: "$15,00",
    image: IndustrialTable,
  },
  {
    name: "Industrial Sofa Table",
    price: "$15,00",
    image: IndustrialSofaTable,
  },
];

const coupons = [
  {
    code: '25OFFCOELHA',
    value: '25%'
  },
  {
    code: '10OFFSANFILIPPO',
    value: '10%'
  }
]

export const ConfirmOrder = () => {

  const [totalValueProducts, setTotalValueProducts] = useState("")
  const [inputCouponValue, setInputCouponValue] = useState('')
  const [sessionStorageState, setSessionStorageState] = useState(sessionStorage.getItem('coupon'))
  const [totalValueDiscount, setTotalValueDiscount] = useState("")
  const [totalOrder, setTotalOrder] = useState('')
  const [taxes, setTaxes] = useState({
    extraFee: '$8,12',
    shipping: '$2,02',
    tax: '$3,03'
  })

  const { setStepLevel } = useContext(StepContext);

  const getTotalValueOfItems = () => {
    let counter = 0
    products.map((element: any) => {
      counter = counter + parseFloat(element.price.replace("$", "").replace(",", "."))
    })
    return counter.toFixed(2);
  }

  const getTotalValueDiscount = (total: any) => {
    total = total.replace("$", "").replace(",", ".")
    total = parseFloat(total)
    let infoCoupon: any = sessionStorage.getItem('coupon')
    infoCoupon = JSON.parse(infoCoupon as any)
    infoCoupon = infoCoupon.value.replace("%", "")
    infoCoupon = Number(infoCoupon)
    return ((total * infoCoupon) / 100).toFixed(2);
  }

  const getTotalOrder = (
    subtotal: any,
    discount: any,
    extra: any,
    shipping: any,
    tax: any
  ) => {
    subtotal = subtotal.replace("$", "").replace(",", ".")
    subtotal = parseFloat(subtotal)
    discount = discount.replace("$", "").replace(",", ".");
    discount = parseFloat(discount);
    extra = extra.replace("$", "").replace(",", ".");
    extra = parseFloat(extra);
    shipping = shipping.replace("$", "").replace(",", ".");
    shipping = parseFloat(shipping);
    tax = tax.replace("$", "").replace(",", ".");
    tax = parseFloat(tax);
    return (subtotal + discount + extra + shipping + tax).toFixed(2)
  };

  useEffect(() => {
    let totalItems = getTotalValueOfItems()
    setTotalValueProducts("$" + totalItems.toString().replace(".", ","))
  }, [products])

  useEffect(() => {
    setSessionStorageState(sessionStorage.getItem("coupon"));
  }, [sessionStorage]);

  useEffect(() => {
    let totalCoupon = getTotalValueDiscount(totalValueProducts)
    setTotalValueDiscount("$" + totalCoupon.toString().replace(".", ","));
  }, [totalValueProducts])

  useEffect(() => {
    let totalOrderTemp = getTotalOrder(
      totalValueProducts,
      totalValueDiscount,
      taxes.extraFee,
      taxes.shipping,
      taxes.tax
    );
    setTotalOrder("$" + totalOrderTemp.toString().replace(".", ","));
  }, [totalValueDiscount]);

  return (
    <S.Container>
      <Accordion
        sx={{
          border: "0.383033px solid #B2BCCA",
          boxShadow: "none",
          borderRadius: "18.3856px !important",
        }}
      >
        <AccordionSummary
          expandIcon={<IoIosArrowDown />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            <S.FlexColumn>
              <h3>Order Review</h3>
              <p>2 items in cart ({totalValueProducts})</p>
            </S.FlexColumn>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <S.Cardsontainer>
              {products.map((element: any, index: number) => {
                return <CardProducts element={element} key={index} />;
              })}
            </S.Cardsontainer>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{
          border: "0.383033px solid #B2BCCA",
          boxShadow: "none",
          borderRadius: "18.3856px !important",
        }}
      >
        <AccordionSummary
          expandIcon={<AiOutlinePlusCircle />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            <h3>Coupons</h3>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <>
              {sessionStorageState && (
                <S.CouponContainer>
                  <p>
                    Coupon applied:{" "}
                    <strong>
                      {JSON.parse(sessionStorage.getItem("coupon") as any).code}
                    </strong>{" "}
                    ({JSON.parse(sessionStorage.getItem("coupon") as any).value}{" "}
                    off)
                  </p>
                </S.CouponContainer>
              )}
            </>
            <>
              <label>Enter coupon code:</label>
              <S.FlexWithGap>
                <Input
                  border={"0.775px solid #D0D5DD"}
                  boxShadow={"0px 0.775px 1.55px rgba(16, 24, 40, 0.05)"}
                  borderRadius={"6.2px"}
                  height={"2.156rem"}
                  padding={"8px 11px 8px 11px"}
                  onChange={(event: any) => {
                    setInputCouponValue(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    coupons.map((item: any) => {
                      if (item.code === "25OFFCOELHA") {
                        sessionStorage.setItem("coupon", JSON.stringify(item));
                        setSessionStorageState(
                          sessionStorage.getItem("coupon")
                        );
                      }
                    });
                  }}
                >
                  <AiOutlineSend />
                </button>
              </S.FlexWithGap>
            </>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{
          border: "0.383033px solid #B2BCCA",
          boxShadow: "none",
          borderRadius: "18.3856px !important",
        }}
        defaultExpanded
      >
        <AccordionSummary
          expandIcon={<IoIosArrowDown />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            <h3>Check out Summary</h3>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <S.SummaryContainer>
              <S.FlexSpaceBetween>
                <p>Subtotal:</p>
                <p>{totalValueProducts}</p>
              </S.FlexSpaceBetween>
              <S.FlexSpaceBetween>
                <p>Discount:</p>
                <p>{totalValueDiscount}</p>
              </S.FlexSpaceBetween>
              <S.FlexSpaceBetween>
                <p>Extra Fee:</p>
                <p>{taxes.extraFee}</p>
              </S.FlexSpaceBetween>
              <S.FlexSpaceBetween>
                <p>Shipping:</p>
                <p>{taxes.shipping}</p>
              </S.FlexSpaceBetween>
              <S.FlexSpaceBetween>
                <p>Tax:</p>
                <p>{taxes.tax}</p>
              </S.FlexSpaceBetween>
            </S.SummaryContainer>
            <S.FlexSpaceBetween>
              <h3>Total:</h3>
              <h3>{totalOrder}</h3>
            </S.FlexSpaceBetween>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <S.FlexWithGap>
        <input type="checkbox" />
        <aside>
          Please check to acknowledge our <span>Privacy & Terms Policy</span>
        </aside>
      </S.FlexWithGap>
      <S.NextContainer>
        <img src={NortonIcon} />
        <button
          onClick={() => {
            setStepLevel(4);
          }}
        >
          Pay {totalOrder}
        </button>
      </S.NextContainer>
    </S.Container>
  );
};
