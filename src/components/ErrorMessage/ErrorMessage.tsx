import React from "react";
import css from "./ErrorMessage.module.css";

export const ErrorMessage: React.FC = () => {
  return <p className={css.text}>There was an error, please try again ...</p>;
};
