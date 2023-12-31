import React, { useState } from 'react';
import { SearchInput, ToggleGroup, ToggleGroupItem, ToggleGroupItemProps } from '@patternfly/react-core';
import { Table, Caption, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';
import { questions } from '../data';
import { QuestionTable } from '@app/Table/Table';


export const CoachHelper: React.FunctionComponent = () => {
    const [redTeam, setRedTeam] = React.useState()

    return (
        <>
            
            <QuestionTable />
        </>
    )
}