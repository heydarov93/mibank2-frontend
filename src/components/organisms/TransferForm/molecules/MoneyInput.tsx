import { forwardRef } from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export const MoneyInput = forwardRef<NumericFormatProps, CustomProps>(
  function MoneyInput(props, ref) {
    const { onChange, ...other } = props;
    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        decimalScale={2}
        fixedDecimalScale
        thousandSeparator
        valueIsNumericString
        allowNegative={false}
        allowLeadingZeros={false}
      />
    );
  },
);
