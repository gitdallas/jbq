import * as React from 'react';
import { InfoCircleIcon } from '@patternfly/react-icons';
import {
  Button,
  Card,
  CardBody,
  List,
  ListItem,
  PageSection,
  Progress,
  ProgressMeasureLocation,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  Tooltip,
} from '@patternfly/react-core';
import { SimpleSelect } from '../components/SimpleSelect'
import { questions } from '../data';
import { Answer, Reference } from '@app/utils/common';
import { SetSelector } from '@app/components/SetSelector';

// eslint-disable-next-line prefer-const
const FlashCards: React.FunctionComponent = () => {
  const [filteredQuestions, setFilteredQuestions] = React.useState(questions);
  const [question, setQuestion] = React.useState(questions[0]);
  const [showAnswer, setShowAnswer] = React.useState(false);
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [setsSelected, setSetsSelected] = React.useState([9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]);
  const [pointsSelected, setPointsSelected] = React.useState(['10', '20', '30']);
  const [totalRuns, setTotalRuns] = React.useState(0);

  const shuffle = (array: any[]) => { 
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array; 
  };

  React.useEffect( () => {
    const newQuestions = shuffle(
      questions.filter(q => setsSelected.includes(q.section) && pointsSelected.includes(q.points.toString()))
    );
    setFilteredQuestions(newQuestions);
  }, [setsSelected, pointsSelected, totalRuns]);

  React.useEffect( () => {
    setQuestionIndex(0);
    setQuestion(filteredQuestions[0]);
  }, [filteredQuestions]);

  const next = () => {
    if (showAnswer) {
      setShowAnswer(false);
      if (questionIndex+1 >= filteredQuestions.length) {
        setTotalRuns(totalRuns+1);
      } else {
        setQuestion(filteredQuestions[Math.min(filteredQuestions.length, questionIndex+1)]);
        setQuestionIndex(Math.min(filteredQuestions.length, questionIndex+1));
      }
    } else {
      setShowAnswer(true);
    }
  }

  const questionInfo = (<Tooltip content={`Question #${question?.number} from set #${question?.section}`}>
  <Button
    variant="plain"
  >
    <InfoCircleIcon />
  </Button>
</Tooltip>)

  return (
    <PageSection>
      <Toolbar>
        <ToolbarContent>
          <ToolbarItem>
            <SetSelector selectedItems={setsSelected} onChange={(newSets) => setSetsSelected(newSets)}></SetSelector>
          </ToolbarItem>
          <ToolbarItem>
            <SimpleSelect
              initialSelections={pointsSelected}
              options={[{value: '10', text: '10'}, {value: '20', text: '20'}, {value: '30', text: '30'}]}
              toggleText={pointsSelected ? `pts: ${pointsSelected.join(', ')}` : 'Select pts'}
              onChange={(newPoints) => setPointsSelected(newPoints)}>
            </SimpleSelect>
          </ToolbarItem>
          <ToolbarItem align={{default: 'alignRight'}}>
            <Button onClick={next} variant="primary" style={{width: '200px'}}>
              {!showAnswer ? 'Show answer' : (filteredQuestions.length > (questionIndex+1) ? 'Next question' : 'Reshuffle')}
            </Button>
          </ToolbarItem>
        </ToolbarContent>
      </Toolbar>
      <Card>
        {!!filteredQuestions.length && (<CardBody>
          <Progress value={
            ((questionIndex+(showAnswer ? 1 : 0))/filteredQuestions.length)*100
            } title={(<span>Question #{questionIndex + 1} of {filteredQuestions.length}. {questionInfo}</span>)} measureLocation={ProgressMeasureLocation.inside}/>
        </CardBody>)}
      </Card>
      <Card>
        {!filteredQuestions?.length && (
          <CardBody>No questions match your filters, please adjust.</CardBody>
        )}
        {!!question && (<CardBody>
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
        </CardBody>)}
      </Card>
    </PageSection>
  )
};

export { FlashCards };
