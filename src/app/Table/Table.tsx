import React from 'react';
import { Checkbox, Flex, FlexItem, Form, FormGroup, FormSelect, FormSelectOption, Label, Radio, SearchInput, ToggleGroup, ToggleGroupItem, ToggleGroupItemProps } from '@patternfly/react-core';
import { Table, Caption, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';
import { questions } from '../data';


export const QuestionTable = ({ onQuestion, noQuoteDefault = false }) => {

    const [searchValue, setSearchValue] = React.useState('');
    const [filteredQuestions, setFilteredQuestions] = React.useState(questions);
    const [isQuotationQuestion, setIsQuotationQuestion] = React.useState<undefined | 'yes' | 'no'>(noQuoteDefault ? 'no' : undefined);
    const [pointValue, setPointValue] = React.useState<undefined | '10' | '20' | '30'>(undefined);

    React.useEffect(() => {
        setFilteredQuestions(questions.filter(q => {
            if (pointValue !== undefined && pointValue !== q.points.toString()) {
                return false;
            }
            if (isQuotationQuestion !== undefined && isQuotationQuestion !== (q.quotation ? 'yes' : 'no' )) {
                return false;
            }
            return `${q.question.start} ${q.question.end}`.toLowerCase().includes(searchValue.toLowerCase())
        }));
    }, [isQuotationQuestion, searchValue, pointValue]);

    const reset = () => {
        setIsQuotationQuestion(noQuoteDefault ? 'no' : undefined);
        setPointValue(undefined);
        setSearchValue('');
    }

    const columnNames = {
        number: '#',
        set: 'Set',
        points: 'Pts',
        quotation: 'Quote',
        question: 'Question',
        answer: 'Answer'
    };

    return (
        <React.Fragment>
            <Flex>
                <FlexItem>
                    <div style={{ width: '100px' }}>Points:</div>
                </FlexItem>
                <FlexItem>
                    <ToggleGroup>
                        <ToggleGroupItem
                            text="10"
                            isSelected={pointValue === '10'}
                            onChange={() => setPointValue('10')}
                        />
                        <ToggleGroupItem
                            text="20"
                            isSelected={pointValue === '20'}
                            onChange={() => setPointValue('20')}
                        />
                        <ToggleGroupItem
                            text="30"
                            isSelected={pointValue === '30'}
                            onChange={() => setPointValue('30')}
                        />
                    </ToggleGroup>
                </FlexItem>
            </Flex>
            <Flex>
                <FlexItem>
                    <div style={{ width: '100px' }}>Quotation:</div>
                </FlexItem>
                <FlexItem>
                    <ToggleGroup>
                        <ToggleGroupItem
                            text="no"
                            isSelected={isQuotationQuestion === 'no'}
                            onChange={() => setIsQuotationQuestion('no')}
                        />
                        <ToggleGroupItem
                            text="yes"
                            isSelected={isQuotationQuestion === 'yes'}
                            onChange={() => setIsQuotationQuestion('yes')}
                        />
                    </ToggleGroup>
                </FlexItem>
            </Flex>
            <Flex>
                <FlexItem><div style={{ width: '100px' }}>Search:</div></FlexItem>
                <FlexItem>
                    <SearchInput
                        style={{ width: '250px' }}
                        placeholder="Find by question text"
                        value={searchValue}
                        onChange={(_event, value) => setSearchValue(value)}/>
                </FlexItem>
            </Flex>
            <Table
                variant={'compact'}
                aria-label="jbq question table"
            >
                <Thead>
                    <Tr>
                        <Th>{columnNames.number}</Th>
                        <Th>{columnNames.set}</Th>
                        <Th>{columnNames.points}</Th>
                        <Th>{columnNames.quotation}</Th>
                        <Th>{columnNames.question}</Th>
                        <Th>{columnNames.answer}</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {filteredQuestions.map((q) => (
                        <Tr
                            key={`question-${q.number}`}
                            {...(onQuestion ? { onRowClick: () => {
                                onQuestion(q);
                            }} : {}) }
                            isClickable
                        >
                            <Td dataLabel={columnNames.number}>{q.number}</Td>
                            <Td dataLabel={columnNames.set}>{q.set}</Td>
                            <Td dataLabel={columnNames.points}>{q.points}</Td>
                            <Td dataLabel={columnNames.quotation}>{q.quotation ? 'yes' : 'no'}</Td>
                            <Td dataLabel={columnNames.question}>{q.question.start} {q.question.end}</Td>
                            <Td dataLabel={columnNames.answer}>{q.answer}{q.answers && ` - ${q.answers.map(a => a.answer).join(' | ')}`}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </React.Fragment>
    );
};
