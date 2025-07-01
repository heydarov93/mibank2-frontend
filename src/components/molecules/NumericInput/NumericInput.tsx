import { forwardRef } from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export const NumericInput = forwardRef<NumericFormatProps, CustomProps>(
  function NumericInput(props, ref) {
    const { onChange, ...other } = props;
    return (
      <NumericFormat
        getInputRef={ref}
        onValueChange={(values, sourceInfo) => {
          if (sourceInfo.source === 'event') {
            onChange({
              target: {
                name: props.name,
                value: values.value,
              },
            });
          }
        }}
        decimalSeparator=","
        decimalScale={2}
        fixedDecimalScale
        valueIsNumericString
        allowNegative={false}
        allowLeadingZeros={false}
        {...other}
      />
    );
  },
);
