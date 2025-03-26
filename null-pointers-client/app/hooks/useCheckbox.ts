import { useState } from "react";

export function useCheckbox(initialState: boolean = false) {
  const [checked, setChecked] = useState(initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return { checked, handleChange };
}
