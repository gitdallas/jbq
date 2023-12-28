import { MenuToggle, MenuToggleElement, Select, SelectList, SelectOption } from '@patternfly/react-core';
import * as React from 'react';

export interface SimpleSelectProps {
    initialSelections?: any[];
    toggleText?: string;
    options: any[];
    onChange: (selected) => void;
}

export const SimpleSelect: React.FC<SimpleSelectProps> = ({
    initialSelections = [],
    toggleText = 'Select...',
    options,
    onChange
}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedItems, setSelectedItems] = React.useState<any[]>(initialSelections);

    const onToggleClick = () => {
        setIsOpen(!isOpen);
    };

    const onSelect = (_event: React.MouseEvent<Element, MouseEvent> | undefined, value: any) => {
        let newSelected: any[] = []
        if (selectedItems?.includes(value)) {
            newSelected = selectedItems.filter((id) => id !== value);
        } else {
            newSelected = [...selectedItems, value];
        }
        setSelectedItems(newSelected);
        onChange(newSelected);
    };

    const toggle = (toggleRef: React.Ref<MenuToggleElement>) => (
        <MenuToggle
            ref={toggleRef}
            onClick={onToggleClick}
            isExpanded={isOpen}
            style={
                {
                    width: '200px'
                } as React.CSSProperties
            }
        >
            {toggleText}
        </MenuToggle>
    );

    return (
        <Select
            role="menu"
            isOpen={isOpen}
            selected={selectedItems}
            onSelect={onSelect}
            onOpenChange={(nextOpen: boolean) => setIsOpen(nextOpen)}
            toggle={toggle}
        >
            <SelectList>
                {options.map(o =>
                    (<SelectOption hasCheckbox value={o.value} isSelected={selectedItems?.includes(o.value)}>{o.text}</SelectOption>)
                )}
            </SelectList>
        </Select>
    );
}