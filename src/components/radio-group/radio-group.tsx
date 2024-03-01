import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { ChangeEvent } from 'react';
import { FILTER_TYPES } from '../../shared/filter';

interface RadioGroupProps {
  value: string;
  setValue: (value: string) => void;
}

function RadioGroupCustom(props: RadioGroupProps) {
  const { value, setValue } = props;
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Фильтровать по:</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value={FILTER_TYPES.PRODUCT} control={<Radio />} label="Имя" />
        <FormControlLabel value={FILTER_TYPES.PRICE} control={<Radio />} label="Цена" />
        <FormControlLabel value={FILTER_TYPES.BRAND} control={<Radio />} label="Бренд" />
      </RadioGroup>
    </FormControl>
  );
}

export default RadioGroupCustom;
