import React, { useReducer, useState } from "react";
import { formState } from "./types/types";
import { companyList, clientList, servicesList } from "./data/data";
import { formInvoiceStyle } from "./FormInvoiceStyle";

const initialFormState: formState = {
  date: new Date().toLocaleDateString(),
  company: "",
  client: "",
  service: [],
  unitPrice: [],
  quantity: "",
  total: 0,
  note: "",
};

const reducer = (state: formState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case "select company":
      return {
        ...state,
        company: action.payload.company,
        client: action.payload.resetString,
        service: action.payload.resetList,
        unitPrice: action.payload.resetList,
        quantity: action.payload.resetString,
        total: 0,
        note: action.payload.resetString,
      };
      break;

    case "select client":
      return {
        ...state,
        client: action.payload.client,
        service: action.payload.resetList,
        unitPrice: action.payload.resetList,
        quantity: action.payload.resetString,
        total: 0,
        note: action.payload.resetString,
      };
      break;

    case "select service":
      return {
        ...state,
        service: [action.payload.service],
        unitPrice: [action.payload.unitPrice],
        quantity: action.payload.resetString,
        total: 0,
        note: action.payload.resetString,
      };
      break;

    case "insert quantity":
      const actionValue = isNaN(action.payload.quantity)
        ? action.payload.quantity2
        : Number(action.payload.quantity);
      return {
        ...state,
        quantity: actionValue,
        total: actionValue * state.unitPrice[0],
      };
      break;

    case "write note":
      return {
        ...state,
        note: action.payload.note,
      };
      break;

    case "reset button":
      return {
        date: new Date().toLocaleDateString(),
        company: action.payload.resetString,
        client: action.payload.resetString,
        service: action.payload.resetList,
        unitPrice: action.payload.resetList,
        quantity: action.payload.resetString,
        total: 0,
        note: action.payload.resetString,
      };
      break;

    default:
      return state;
  }
};

function FormInvoice() {
  const [formState, dispatch] = useReducer(reducer, initialFormState);
  const [hasBlur, setHasBlur] = useState({
    selectCompany: false,
    selectClient: false,
    selectService: false,
    insertQuantity: false,
  });

  return (
    <>
      <div style={formInvoiceStyle.container}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert(JSON.stringify(formState, null, 2));
            // console.log(formState);
          }}
        >
          <div style={formInvoiceStyle.labelDivSpan}>
            <label htmlFor="date">
              Date:
              <span style={formInvoiceStyle.spanText} id="date">
                {formState.date}
              </span>
            </label>
          </div>
          <div>
            <label style={formInvoiceStyle.label} htmlFor="company">
              Company:
            </label>
            <br />
            <select
              style={formInvoiceStyle.inputSelect}
              onBlur={() => {
                setHasBlur({ ...hasBlur, selectCompany: true });
              }}
              onChange={(e) => {
                setHasBlur({ ...hasBlur, selectClient: false });
                dispatch({
                  type: "select company",
                  payload: {
                    company: e.currentTarget.value,
                    resetString: "",
                    resetList: [],
                  },
                });
              }}
            >
              <option value="" hidden>
                Please select...
              </option>
              {companyList.map((company) => (
                <option key={company.label} value={company.value}>
                  {company.label}
                </option>
              ))}
            </select>
            {!formState.company && hasBlur.selectCompany && (
              <div style={{ color: "red", fontSize: "small" }}>
                Please select Company Name
              </div>
            )}
          </div>
          {formState.company && (
            <div>
              <label style={formInvoiceStyle.label} htmlFor="client">
                Client:
              </label>{" "}
              <br />
              <select
                style={formInvoiceStyle.inputSelect}
                onBlur={() => {
                  setHasBlur({ ...hasBlur, selectClient: true });
                }}
                onChange={(e) => {
                  setHasBlur({ ...hasBlur, selectService: false });
                  dispatch({
                    type: "select client",
                    payload: {
                      client: e.currentTarget.value,
                      resetList: [],
                      resetString: "",
                    },
                  });
                }}
              >
                <option value="" hidden>
                  Please select..
                </option>
                {clientList[formState.company as keyof typeof clientList].map(
                  (client) => (
                    <option key={client.label} value={client.value}>
                      {client.label}
                    </option>
                  )
                )}
              </select>
              {!formState.client && hasBlur.selectClient && (
                <div style={{ color: "red", fontSize: "small" }}>
                  Please select Client Name
                </div>
              )}
            </div>
          )}
          {formState.client && (
            <div>
              <label style={formInvoiceStyle.label} htmlFor="service">
                Service:
              </label>{" "}
              <br />
              <select
                style={formInvoiceStyle.inputSelect}
                onBlur={() => {
                  setHasBlur({ ...hasBlur, selectService: true });
                }}
                onChange={(e) => {
                  setHasBlur({ ...hasBlur, insertQuantity: false });
                  const valuesJson = JSON.parse(e.currentTarget.value);
                  dispatch({
                    type: "select service",
                    payload: {
                      service: valuesJson.values[0],
                      unitPrice: valuesJson.values[1],
                      resetString: "",
                      resetList: [],
                    },
                  });
                }}
              >
                <option value="" hidden>
                  Please select..
                </option>
                {servicesList[
                  formState.client as keyof typeof servicesList
                ].map((service) => (
                  <option
                    key={service.label}
                    value={`{"values":["${service.value}",${service.unitPrice}]}`}
                  >
                    {service.label}
                  </option>
                ))}
              </select>
              {!formState.service[0] && hasBlur.selectService && (
                <div style={{ color: "red", fontSize: "small" }}>
                  Please select service
                </div>
              )}
            </div>
          )}
          {formState.service.length !== 0 && (
            <div>
              <div style={formInvoiceStyle.labelDivSpan}>
                <label htmlFor="unitprice">
                  Unit Price:
                  <span style={formInvoiceStyle.spanText} id="unitprice">
                    ${formState.unitPrice[0]}
                  </span>
                </label>
              </div>
              <label style={formInvoiceStyle.label} htmlFor="quantity">
                Quantity:
              </label>{" "}
              <br />
              <input
                style={formInvoiceStyle.inputText}
                onFocus={() => {
                  setHasBlur({ ...hasBlur, insertQuantity: true });
                }}
                value={formState.quantity}
                id="quantity"
                onChange={(e) => {
                  dispatch({
                    type: "insert quantity",
                    payload: { quantity: e.target.value, quantity2: "" },
                  });
                }}
                placeholder="Insert quantity.."
              />
              {(formState.quantity === "" || formState.quantity === 0) &&
                hasBlur.insertQuantity && (
                  <div style={{ color: "red", fontSize: "small" }}>
                    Please insert correct quantity
                  </div>
                )}
            </div>
          )}
          {!isNaN(formState.quantity) && formState.quantity > 0 && (
            <div>
              <div style={formInvoiceStyle.labelDivSpan}>
                <label htmlFor="total">
                  Total:
                  <span style={formInvoiceStyle.spanText} id="total">
                    $<strong>{formState.total}</strong>
                  </span>
                </label>
              </div>
              <label style={formInvoiceStyle.label} htmlFor="note">
                Note:
              </label>{" "}
              <br />
              <textarea
                style={formInvoiceStyle.inputText}
                onChange={(e) => {
                  dispatch({
                    type: "write note",
                    payload: { note: e.target.value },
                  });
                }}
                placeholder="if any.."
              />{" "}
              <br />
            </div>
          )}{" "}
          <br />
          <div style={formInvoiceStyle.divBtn}>
            <button
              style={
                formState.total
                  ? formInvoiceStyle.btnGenerate
                  : formInvoiceStyle.btnGenerateDisable
              }
              type="submit"
              disabled={
                !isNaN(formState.total) && formState.total > 0 ? false : true
              }
            >
              Generate
            </button>
            <button
              style={formInvoiceStyle.btnReset}
              type="reset"
              onClick={() => {
                setHasBlur({
                  selectCompany: false,
                  selectClient: false,
                  selectService: false,
                  insertQuantity: false,
                });
                dispatch({
                  type: "reset button",
                  payload: { resetString: "", resetList: [] },
                });
              }}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default FormInvoice;
