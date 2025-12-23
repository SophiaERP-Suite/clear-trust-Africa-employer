import React, { createContext } from "react";

export const RegisterContext = createContext<{
  registerType: string;
  setRegisterType: React.Dispatch<React.SetStateAction<string>>;
}>(null!);

export const RequestContext = createContext<{
  requestType: "basic" | "standard" | "enhanced";
  setRequestType: React.Dispatch<
    React.SetStateAction<"basic" | "standard" | "enhanced">
  >;
}>(null!);
