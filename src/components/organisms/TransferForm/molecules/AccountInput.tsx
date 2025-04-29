import { forwardRef } from 'react';
import { PatternFormat, PatternFormatProps } from 'react-number-format';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  format: string;
}

export const AccountInput = forwardRef<PatternFormatProps, CustomProps>(
  function AccountInput(props, ref) {
    const { onChange, format, ...other } = props;
    return (
      <PatternFormat
        {...other}
        format={format}
        getInputRef={ref}
        onValueChange={({ formattedValue }) => {
          onChange({
            target: {
              name: props.name,
              value: `PL${formattedValue.replace(/\s/g, '')}`,
            },
          });
        }}
      />
    );
  },
);
