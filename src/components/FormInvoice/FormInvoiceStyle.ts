import { CSSProperties } from "react";

export const formInvoiceStyle: { [key: string]: CSSProperties } = {
  container: {
    display: "flex",
    // flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  label: {
    fontSize: 26,
    color: "black",
    paddingRight: 35,
  },

  labelDivSpan: {
    fontSize: 26,
    color: "black",
    paddingRight: 35,
    paddingBottom: 0,
    paddingTop: 4,
  },

  spanText: {
    fontSize: 22,
    color: "black",
    paddingLeft: 5,
  },

  inputText: {
    fontSize: 22,
    paddingBottom: 8,
    paddingTop: 8,
    width: 300,
    borderWidth: 1,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingLeft: 5,
  },

  inputSelect: {
    fontSize: 22,
    paddingBottom: 8,
    paddingTop: 8,
    width: 300,
    borderWidth: 1,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingLeft: 5,
  },

  divBtn: {
    marginBottom: 20,
  },

  btnGenerate: {
    marginRight: 3,
    backgroundColor: "blue",
    color: "white",
    height: 30,
    borderRadius: 5,
    border: "none",
  },

  btnGenerateDisable: {
    marginRight: 3,
    height: 30,
    borderRadius: 5,
    border: "none",
  },

  btnReset: {
    backgroundColor: "red",
    color: "white",
    height: 30,
    border: "none",
    borderRadius: 5,
  },
};
