import * as React from 'react';
import { BackToTop, Card, DataList, DataListCell, DataListItem, DataListItemCells, DataListItemRow, EmptyState, EmptyStateBody, EmptyStateHeader, Flex, FlexItem, List, ListItem, NumberInput, PageSection, Title } from '@patternfly/react-core';
import { questions } from '../data';
import { Answer, Reference } from '@app/utils/common';
const Sets: React.FunctionComponent = () => {
  const [set, setSet] = React.useState<number | ''>(1);
  const [activeQuestions, setActiveQuestions] = React.useState(questions);

  React.useEffect(() => {
    setActiveQuestions(questions.filter(q => q.section === set));
  }, [set]);

  const scrollTop = () => {
    document.querySelector('[name="main-content"]')?.scrollTo({ top: 0 });
  }

  const onMinus = () => {
    const newValue = (set || 0) - 1;
    setSet(Math.max(1, newValue));
    scrollTop();
  };

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    setSet(value === '' ? value : Math.min(29, Math.max(1, +value)));
  };

  const onPlus = () => {
    const newValue = (set || 0) + 1;
    setSet(Math.min(29, newValue));
    scrollTop();
  };
  return <>
  <PageSection name='main-content' hasOverflowScroll tabIndex={0}>
    <Title headingLevel="h1" size="lg">JBQ Set:{` `}
      <NumberInput
        value={set}
        onMinus={onMinus}
        onChange={onChange}
        onPlus={onPlus}
        inputName="input"
        inputAriaLabel="number input"
        minusBtnAriaLabel="minus"
        plusBtnAriaLabel="plus"
        widthChars={2}
      />
    </Title>
    <DataList aria-label={'jbq questions'}>
    {!activeQuestions.length && (
      <EmptyState>
        <EmptyStateHeader titleText="No results found" headingLevel="h4" />
        <EmptyStateBody>Please select a JBQ Set</EmptyStateBody>
      </EmptyState>
    )}
    {activeQuestions.map(q => 
        <DataListItem key={`question-${q.number}`}>
        <DataListItemRow>
          <DataListItemCells
            dataListCells={[
              <DataListCell key="question">
                <Flex flexWrap={{ default: 'wrap', sm: 'nowrap' }}  direction={{ default: 'column', sm: 'row' }}>
                  <FlexItem style={{'width':'65px', 'whiteSpace': 'nowrap'}}>{q.points} points</FlexItem>
                  <FlexItem style={{'width':'25px', 'whiteSpace': 'nowrap'}}>{q.number}.</FlexItem>
                  <FlexItem>
                    <span className='question-start'>
                      {q.quotation && 'Quotation question: '}{q.question.start}{` `}
                    </span>
                    <span>
                      {q.question.end && `${q.question.end} `}
                    </span>
                    {q.answer && <Answer answer={q.answer} reference={q.reference} />}
                    {q.answers && (
                      <List>
                        {q.answers.map( (a,i) => (
                          <ListItem key={`answer-${i+1}`}><Answer answer={a.answer} reference={a.reference} /></ListItem>
                        ))}
                        {!q.answer && q.reference && <Reference>{q.reference}</Reference>}
                      </List>
                    )}
                  </FlexItem>
                </Flex>
              </DataListCell>
            ]}
          />
        </DataListItemRow>
      </DataListItem>
    )}
  </DataList>
  <Title headingLevel="h1" size="lg">JBQ Set:{` `}
    <NumberInput
      value={set}
      onMinus={onMinus}
      onChange={onChange}
      onPlus={onPlus}
      inputName="input"
      inputAriaLabel="number input"
      minusBtnAriaLabel="minus"
      plusBtnAriaLabel="plus"
      widthChars={2}
    />
  </Title>
  </PageSection>
  <BackToTop scrollableSelector='[name="main-content"]'/>
  </>
}

export { Sets };