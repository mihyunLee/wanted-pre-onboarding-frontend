import { useState } from "react";
import { REG, WARNING_MSG } from "../constants/validate";

export default function useUserValidation(initialData, id) {
  const [value, setValue] = useState(initialData);
  const [valueError, setValueError] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);

    if (e.target.value && REG[id].test(e.target.value)) {
      setValueError("");
    } else if (!e.target.value) {
      setValueError("필수 입력사항을 입력해주세요");
    } else {
      setValueError(WARNING_MSG[id]);
    }
  };

  return [value, valueError, onChange];
}
