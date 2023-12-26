import { TreeViewDataItem, MenuToggle, Panel, PanelMain, PanelMainBody, Title, TreeView, MenuContainer } from '@patternfly/react-core';
import { check } from 'prettier';
import * as React from 'react';

export interface SetSelectorProps {
    selectedItems?: number[];
    onChange: (sets) => void;
}

export const SetSelector: React.FC<SetSelectorProps> = ({
    selectedItems,
    onChange
}) => {
    const [selectedSets, setSelectedSets] = React.useState<TreeViewDataItem[]>([]);
    const [isOpen, setIsOpen] = React.useState(false);
    const toggleRef = React.useRef<HTMLButtonElement>(null);
    const menuRef = React.useRef<HTMLDivElement>();

    const setOptions: TreeViewDataItem[] = [
        {
            name: 'Sets 1-5',
            id: 'sets1to5',
            checkProps: { checked: false },
            children: [
                {
                    name: '1',
                    id: 'set1',
                    checkProps: { checked: false },
                },
                {
                    name: '2',
                    id: 'set2',
                    checkProps: { checked: false },
                },
                {
                    name: '3',
                    id: 'set3',
                    checkProps: { checked: false },
                },
                {
                    name: '4',
                    id: 'set4',
                    checkProps: { checked: false },
                },
                {
                    name: '5',
                    id: 'set5',
                    checkProps: { checked: false },
                },
            ]
        },
        {
            name: 'Sets 6-10',
            id: 'sets6to10',
            checkProps: { checked: false },
            children: [
                {
                    name: '6',
                    id: 'set6',
                    checkProps: { checked: false },
                },
                {
                    name: '7',
                    id: 'set7',
                    checkProps: { checked: false },
                },
                {
                    name: '8',
                    id: 'set8',
                    checkProps: { checked: false },
                },
                {
                    name: '9',
                    id: 'set9',
                    checkProps: { checked: false },
                },
                {
                    name: '10',
                    id: 'set10',
                    checkProps: { checked: false },
                },
            ]
        },
        {
            name: 'Sets 11-15',
            id: 'sets11to15',
            checkProps: { checked: false },
            children: [
                {
                    name: '11',
                    id: 'set11',
                    checkProps: { checked: false },
                },
                {
                    name: '12',
                    id: 'set12',
                    checkProps: { checked: false },
                },
                {
                    name: '13',
                    id: 'set13',
                    checkProps: { checked: false },
                },
                {
                    name: '14',
                    id: 'set14',
                    checkProps: { checked: false },
                },
                {
                    name: '15',
                    id: 'set15',
                    checkProps: { checked: false },
                },
            ]
        },
        {
            name: 'Sets 16-20',
            id: 'sets16to20',
            checkProps: { checked: false },
            children: [
                {
                    name: '16',
                    id: 'set16',
                    checkProps: { checked: false },
                },
                {
                    name: '17',
                    id: 'set17',
                    checkProps: { checked: false },
                },
                {
                    name: '18',
                    id: 'set18',
                    checkProps: { checked: false },
                },
                {
                    name: '19',
                    id: 'set19',
                    checkProps: { checked: false },
                },
                {
                    name: '20',
                    id: 'set20',
                    checkProps: { checked: false },
                },
            ]
        },
        {
            name: 'Sets 21-25',
            id: 'sets21to25',
            checkProps: { checked: false },
            children: [
                {
                    name: '21',
                    id: 'set21',
                    checkProps: { checked: false },
                },
                {
                    name: '22',
                    id: 'set22',
                    checkProps: { checked: false },
                },
                {
                    name: '23',
                    id: 'set23',
                    checkProps: { checked: false },
                },
                {
                    name: '24',
                    id: 'set24',
                    checkProps: { checked: false },
                },
                {
                    name: '25',
                    id: 'set25',
                    checkProps: { checked: false },
                },
            ]
        },
        {
            name: 'Sets 26-29',
            id: 'sets26-29',
            checkProps: { checked: false },
            children: [
                {
                    name: '26',
                    id: 'set26',
                    checkProps: { checked: false },
                },
                {
                    name: '27',
                    id: 'set27',
                    checkProps: { checked: false },
                },
                {
                    name: '28',
                    id: 'set28',
                    checkProps: { checked: false },
                },
                {
                    name: '29',
                    id: 'set29',
                    checkProps: { checked: false },
                },
            ]
        },
    ];

    // Helper functions for tree
    const isChecked = (dataItem: TreeViewDataItem) => selectedSets.some((item) => item.id === dataItem.id);
    const areAllDescendantsChecked = (dataItem: TreeViewDataItem) =>
        dataItem.children ? dataItem.children.every((child) => areAllDescendantsChecked(child)) : isChecked(dataItem);
    const areSomeDescendantsChecked = (dataItem: TreeViewDataItem) =>
        dataItem.children ? dataItem.children.some((child) => areSomeDescendantsChecked(child)) : isChecked(dataItem);
    const flattenTree = (tree: TreeViewDataItem[]) => {
        let result: TreeViewDataItem[] = [];
        tree.forEach((item) => {
            result.push(item);
            if (item.children) {
                result = result.concat(flattenTree(item.children));
            }
        });
        return result;
    };

    const mapTree = (item: TreeViewDataItem) => {
        const hasCheck = areAllDescendantsChecked(item);
        item.checkProps = item.checkProps || {};
        // Reset checked properties to be updated
        item.checkProps.checked = false;

        if (hasCheck) {
            item.checkProps.checked = true;
        } else {
            const hasPartialCheck = areSomeDescendantsChecked(item);
            if (hasPartialCheck) {
                item.checkProps.checked = null;
            }
        }

        if (item.children) {
            return {
                ...item,
                children: item.children.map(mapTree)
            };
        }
        return item;
    };

    const filterItems = (item: TreeViewDataItem, checkedItem: TreeViewDataItem) => {
        if (item.id === checkedItem.id) {
            return true;
        }

        if (item.children) {
            return (
                (item.children = item.children
                    .map((opt) => Object.assign({}, opt))
                    .filter((child) => filterItems(child, checkedItem))).length > 0
            );
        }
    };

    const onCheck = (evt: React.ChangeEvent, treeViewItem: TreeViewDataItem) => {
        const checked = (evt.target as HTMLInputElement).checked;

        let options: TreeViewDataItem[] = [];
        options = setOptions;

        const checkedItemTree = options
            .map((opt) => Object.assign({}, opt))
            .filter((item) => filterItems(item, treeViewItem));
        const flatCheckedItems = flattenTree(checkedItemTree);

        setSelectedSets((prevCheckedItems) => {
            const checkedStuff = flatCheckedItems.filter((item) => !prevCheckedItems.some((i) => i === item.name));
            const newCheckedStuff = checked
            ? prevCheckedItems.concat(checkedStuff)
            : prevCheckedItems.filter((item) => !flatCheckedItems.some((i) => i.id === item.id));
            onChange(newCheckedStuff.filter(i => !i.children).map(i => i.name));
            return newCheckedStuff;
        });
    };

    const onToggleClick = () => {
        setIsOpen(!isOpen);
    };

    const toggle = (
        <MenuToggle ref={toggleRef} onClick={onToggleClick} isExpanded={isOpen}>
            Select Sets
        </MenuToggle>
    );
    const setMapped = setOptions.map(mapTree);
    const menu = (
        <Panel
            ref={menuRef}
            variant="raised"
            style={{
                width: '300px'
            }}
        >
            <PanelMain>
                <section>
                    <PanelMainBody style={{ padding: 0 }}>
                        <TreeView
                            data={setMapped}
                            hasCheckboxes
                            onCheck={(event, item) => onCheck(event, item)}
                        />
                    </PanelMainBody>
                </section>
            </PanelMain>
        </Panel>
    );

    return (
        <MenuContainer
            isOpen={isOpen}
            onOpenChange={(isOpen) => setIsOpen(isOpen)}
            onOpenChangeKeys={['Escape']}
            menu={menu}
            menuRef={menuRef}
            toggle={toggle}
            toggleRef={toggleRef}
        />
    );
}