import React, { forwardRef, Fragment, ReactNode, useMemo, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { AlignType } from 'react-bootstrap/types';

export interface ActionDropdownOption {
    value?: any;
    dropDownItemRef?: any;
    label: ReactNode | string;
    action?: (
        {
            option,
            setLoading,
        }: {
            option: ActionDropdownOption;
            setLoading: React.Dispatch<React.SetStateAction<boolean>>;
            valueData: any;
        },
        index: number,
    ) => void;
    disabled?: boolean;
    className?: string;
    [key: string]: any;
}

interface ActionDropdownProp {
    options: ActionDropdownOption[];
    value?: any;
    onChange?: (
        { option, valueData }: { option: ActionDropdownOption; valueData: any },
        index: number,
    ) => void;
    loading?: boolean;
    disabled?: boolean;
    buttonContent?: (selectedOption?: ActionDropdownOption) => ReactNode | string | null;
    button?: React.ElementType;
    valueData?: any;
    className?: string;
    autoClose?: boolean | 'outside' | 'inside';
    show?: boolean;
    shouldPrevent?: boolean;
    drop?: 'up' | 'start' | 'end' | 'down';
    align?: AlignType;
}

export const ActionDropdownContent = ({ option }: { option: ActionDropdownOption }) => (
    <div className='d-flex align-items-center dd-option'>
        {option.label}
    </div>
);

const stringifyValue = (value: any): string => {
    try {
        return JSON.stringify(value);
    } catch (error) {
        console.log(error);
        return '';
    }
};

const ActionDropdown = forwardRef(
    (
        {
            options,
            buttonContent,
            button,
            value,
            onChange,
            loading,
            disabled,
            valueData,
            className,
            autoClose,
            show,
            shouldPrevent,
            drop,
            align,
        }: ActionDropdownProp,
        _,
    ) => {
        const [localLoading, setLocalLoading] = useState(false);
        const localOptions = useMemo(
            () =>
                options.map((option) => ({
                    ...option,
                    __value: stringifyValue(option.value),
                })),
            [options],
        );

        const localOptionsMap = useMemo(() => {
            const optionsMap: { [key: string]: any } = {};
            localOptions.forEach((option) => {
                optionsMap[option.__value] = option;
            });
            return optionsMap;
        }, [localOptions]);

        const parsedValue = useMemo(() => stringifyValue(value), [value]);
        const selectedOption = localOptionsMap[parsedValue] || undefined;

        return (
            <>
                <Dropdown
                    show={show}
                    autoClose={autoClose || true}
                    drop={drop}
                    align={align}
                    className={className}
                >
                    <Dropdown.Toggle
                        disabled={!!loading || !!disabled || localLoading}
                        variant='light'
                        className='d-flex justify-content-between align-items-center'
                        selected-option={selectedOption}
                        as={button}
                    >
                        {buttonContent
                            ? buttonContent(selectedOption)
                            : selectedOption && <ActionDropdownContent option={selectedOption} />}
                    </Dropdown.Toggle>

                    <Dropdown.Menu renderOnMount align='end'>
                        {localOptions.map((option, index) => (
                            <Fragment key={index}>
                                {option?.label && (
                                    <Dropdown.Item
                                        key={index}
                                        as={'a'}
                                        ref={option?.dropDownItemRef}
                                        active={!!parsedValue && parsedValue === option.__value}
                                        disabled={!!option?.disabled}
                                        className={option?.className || ''}
                                        onClick={(e) => {
                                            if (shouldPrevent) {
                                                e.preventDefault();
                                                e.stopPropagation();
                                            }
                                            if (option.action)
                                                option.action({ option, setLoading: setLocalLoading, valueData }, index);
                                            if (onChange && typeof option.value !== 'undefined') {
                                                onChange({ option, valueData }, index);
                                            }
                                        }}
                                    >
                                        <ActionDropdownContent option={option} />
                                    </Dropdown.Item>
                                )}
                            </Fragment>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </>
        );
    },
);

export default ActionDropdown;
