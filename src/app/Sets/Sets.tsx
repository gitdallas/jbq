import * as React from 'react';
import { BackToTop, DataList, DataListCell, DataListItem, DataListItemCells, DataListItemRow, EmptyState, EmptyStateBody, EmptyStateHeader, Flex, FlexItem, List, ListItem, NumberInput, PageSection, Title } from '@patternfly/react-core';
import { questions } from '../data';
import { Answer, Reference } from '@app/utils/common';
import { SetQuestion } from '@app/components/SetQuesetion';
const Sets: React.FunctionComponent = () => {
  const [set, setSet] = React.useState<number | ''>(1);
  const [activeQuestions, setActiveQuestions] = React.useState(questions);

  React.useEffect(() => {
    setActiveQuestions(questions.filter(q => q.set === set));
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
    {activeQuestions.map(q => <SetQuestion q={q} />)}
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