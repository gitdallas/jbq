import { Flex, FlexItem } from '@patternfly/react-core';
import { Table, Tbody, Td, Tr } from '@patternfly/react-table';
import React, { useState } from 'react';

export const MatchQuestionHelper = ({questions}) => {
    const tensLeft = Math.max(0, 10 - questions.filter(q => q.points === 10).length);
    const twentiesLeft = Math.max(0, 7 - questions.filter(q => q.points === 20).length);
    const thirtiesLeft = Math.max(0, 3 - questions.filter(q => q.points === 30).length);

    return (
        <>
            <Flex columnGap={{ default: 'columnGapXs' }}>
                <FlexItem>
                    <Table variant='compact'>
                        <Tr>
                            <Td>10 pointers left:</Td>
                            <Td>{tensLeft}</Td>
                            {!!tensLeft && <Td>({tensLeft * 10} pts)</Td>}
                        </Tr>
                    </Table>
                </FlexItem>
                <FlexItem>
                    <Table variant='compact'>
                        <Tr>
                            <Td>20 pointers left</Td>
                            <Td>{twentiesLeft}</Td>
                            {!!twentiesLeft && <Td>({twentiesLeft * 20} pts)</Td>}
                        </Tr>
                    </Table>
                </FlexItem>
                <FlexItem>
                    <Table variant='compact'>
                        <Tr>
                            <Td>30 pointers left</Td>
                            <Td>{thirtiesLeft}</Td>
                            {!!thirtiesLeft && <Td>({thirtiesLeft * 30} pts)</Td>}
                        </Tr>
                    </Table>
                </FlexItem>
            </Flex>


            <Table variant='compact'>
                <Tbody>
                    <Tr>
                        <Td>#s</Td>
                        {Array.from(Array(20)).map((q,i) => {
                            return (<Td>{i+1}</Td>)
                        })}
                        <Td colSpan={3}>overtime</Td>
                        <Td>SD</Td>
                    </Tr>
                    <Tr>
                        <Td>Pts</Td>
                        {questions?.map((q) => {
                            return (<Td>{q.points}</Td>)
                        })}
                    </Tr>
                </Tbody>
            </Table>
        </>
    )
}