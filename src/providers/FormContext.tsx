import { createContext } from "react";

export interface FormContextType {
  [key: string]: any;
}

export const FormContext = createContext<FormContextType>({} as FormContextType);
