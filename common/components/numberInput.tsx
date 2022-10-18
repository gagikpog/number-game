import { TextField } from '@mui/material';
import { ChangeEvent, Ref, useImperativeHandle, forwardRef } from 'react';

interface INumberInputProps {
    value: string;
    onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    unique?: boolean;
    disabled?: boolean;
    className?: string;
}

export interface INumberInputRef {
    isValid: () => boolean;
}

function validateChars(value: string): boolean {
    return /^\d{0,4}$/.test(value);
}

function validateUniqueChars(value: string): boolean {
    return /^.*(.).*\1.*$/.test(value);
}

function validateNumberLength(value: string): boolean {
    return !/^\d{4}$/.test(value);
}

function getMessage(val: string, unique = false): { message: string, error: boolean } {
    const invalidedLength = validateNumberLength(val);
    const invalidedUnique = unique ? validateUniqueChars(val) : false;
    const message = invalidedLength ? 'Number must be four digits' :
        (invalidedUnique ? 'Numbers must not be repeated' : ' ');
    return {
        error: invalidedLength || invalidedUnique,
        message
    };
}

const NumberInput = forwardRef((props: INumberInputProps, ref: Ref<INumberInputRef>) => {

    const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (validateChars(event.target.value) && typeof props.onChange === 'function') {
            props.onChange(event);
        }
    }

    const {error, message} = getMessage(props.value, props.unique);

    useImperativeHandle(ref, () => ({
        isValid(): boolean {
            return !error;
        }
    }));

    return (
        <TextField
            onChange={onChange}
            className={props.className}
            value={props.value}
            error={error}
            helperText={message}
            variant="standard"
            disabled={props.disabled}
            inputProps={{ style: { textAlign: 'end' } }}
        />
    );
});

NumberInput.displayName = 'NumberInput';

export default NumberInput;
