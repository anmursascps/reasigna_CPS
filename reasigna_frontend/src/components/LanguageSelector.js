import React, { useEffect, useState } from "react";
import i18n from "../i18n";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { set } from "date-fns";

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language); // i18n.language contains the language assigned to lng in i18n.js file.

  const chooseLanguage = (e) => {
    e.preventDefault();
    i18n.changeLanguage(e.target.value); // i18n.changeLanguage() is used to change the language assigned to lng in i18n.js file.
    setSelectedLanguage(e.target.value);
  };

  useEffect(() => {
    i18n.changeLanguage("es");
    setSelectedLanguage("es");
  }, []);

  return (
    <FormControl fullWidth>
      <InputLabel id="language-select-label">Language</InputLabel>
      <Select
        labelId="language-select-label"
        value={selectedLanguage}
        onChange={chooseLanguage}
        label="Language"
      >
        <MenuItem value="es">CAS</MenuItem>
        <MenuItem value="ca">VAL</MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageSelector;
