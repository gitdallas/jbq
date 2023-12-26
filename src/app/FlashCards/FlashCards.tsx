import * as React from 'react';
import { CubesIcon } from '@patternfly/react-icons';
import {
  Button,
  Card,
  CardBody,
  Dropdown,
  EmptyState,
  EmptyStateActions,
  EmptyStateBody,
  EmptyStateFooter,
  EmptyStateHeader,
  EmptyStateIcon,
  EmptyStateVariant,
  Flex,
  FlexItem,
  List,
  ListItem,
  PageSection,
  Text,
  TextContent,
  TextVariants,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from '@patternfly/react-core';
import { questions } from '../data';
import { Answer, Reference } from '@app/utils/common';
import { SetSelector } from '@app/components/SetSelector';

// eslint-disable-next-line prefer-const
const FlashCards: React.FunctionComponent = () => {
  const [filteredQuestions, setFilteredQuestions] = React.useState(questions);
  const [question, setQuestion] = React.useState(questions[0]);
  const [showAnswer, setShowAnswer] = React.useState(false);
  const [questionIndex, setQuestionIndex] = React.useState(0);

  const shuffle = (array: any[]) => { 
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array; 
  };

  React.useEffect( () => { setFilteredQuestions(shuffle(questions)); console.log(filteredQuestions) }, []);

  const next = () => {
    if (showAnswer) {
      setShowAnswer(false);
      setQuestion(filteredQuestions[questionIndex]);
      setQuestionIndex(questionIndex+1);
    } else {
      setShowAnswer(true);
    }
  }

  return (
    <PageSection>
      <Toolbar>
        <ToolbarContent>
          <ToolbarItem>
            <Button onClick={next} variant="primary">
              {showAnswer ? 'Next Question' : 'Show Answer'}
            </Button>
          </ToolbarItem>
          <ToolbarItem>
            <SetSelector selectedItems={[1]} onChange={(foo) => {console.log(foo)}}></SetSelector>
          </ToolbarItem>
        </ToolbarContent>
      </Toolbar>
      <br /><br />
      <Card>
        <CardBody>
          <div>
            <span className='question-start'>
              For {question.points} points, {question.quotation && 'Quotation question: '}{question.question.start}{` `}
            </span>
            <span>
              {question.question.end && `${question.question.end} `}
            </span>
          </div>
          <div>
            {showAnswer && question.answer && <Answer answer={question.answer} reference={question.reference} />}
            {showAnswer && question.answers && (
              <List>
                {question.answers.map( (a, i) => (
                  <ListItem key={`answer-${i}`}><Answer answer={a.answer} reference={a.reference} /></ListItem>
                ))}
                {!question.answer && question.reference && <Reference>{question.reference}</Reference>}
              </List>
            )}
          </div>
        </CardBody>
      </Card>
    </PageSection>
  )
};

export { FlashCards };
