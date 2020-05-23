import React, {ChangeEvent, useState} from 'react';
import {InputBaseProps} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {ArrowBack, Clear} from "@material-ui/icons";
import InputBase from "@material-ui/core/InputBase";
import Tooltip from "@material-ui/core/Tooltip";

export interface SearchInputBaseProps extends Omit<InputBaseProps, 'onChange' | 'value'> {
    initialValue?: string;
    onChange?: (value: string) => void;
    onBack?: VoidFunction;
    onClear?: VoidFunction;
}

function SearchInputBase({
    placeholder = 'Search',
    initialValue = '',
    onBack,
    onClear,
    onChange,
    ...inputProps
}: SearchInputBaseProps) {
    const [value, setValue] = useState<string>(initialValue);
    const handleBack = () => {
        setValue('');
        onBack && onBack();
    };
    const handleClear = () => {
        setValue('');
        onClear && onClear();
    };
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setValue(value);
        onChange && onChange(value);
    };

    const startAdornment = (
        <InputAdornment position="start">
            <Tooltip title="Back">
                <IconButton
                    edge="start"
                    onClick={handleBack}
                >
                    <ArrowBack/>
                </IconButton>
            </Tooltip>
        </InputAdornment>
    );

    const endAdornment = value && (
        <InputAdornment position="end">
            <IconButton
                edge="end"
                onClick={handleClear}
            >
                <Clear/>
            </IconButton>
        </InputAdornment>
    );

    return (
        <InputBase
            placeholder={placeholder}
            fullWidth
            autoFocus
            {...inputProps}
            value={value}
            onChange={handleChange}
            startAdornment={startAdornment}
            endAdornment={endAdornment}
        />
    );
}

export default SearchInputBase;
