import React, { useState } from 'react';
import { ActionGroup, Button, Card, CardBody, CardFooter, CardTitle, Flex, FlexItem, Form, FormFieldGroup, FormGroup, SearchInput, TextInput, ToggleGroup, ToggleGroupItem, ToggleGroupItemProps } from '@patternfly/react-core';
import { Table, Caption, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';
import { questions } from '../data';
import { QuestionTable } from '@app/Table/Table';
import { MatchQuestionHelper } from '@app/components/MatchQuestionHelper';
import { JbqItem, MatchQuestion, MatchQuestionPoints, Player, Team } from 'src/types';
import { SetQuestion } from '@app/components/SetQuesetion';
import { TeamsForm } from './TeamsForm';

export const CoachHelper: React.FunctionComponent = () => {
    const [matchQuestions, setMatchQuestions] = React.useState<MatchQuestion[]>([]);
    const [activeQuestion, setActiveQuestion] = React.useState<JbqItem | undefined>(questions[34]);
    const [greenTeam, setGreenTeam] = React.useState<Team | undefined>(undefined);
    const [redTeam, setRedTeam] = React.useState<Team | undefined>(undefined);
    const [selectedBuzzer, setSelectedBuzzer] = React.useState<string | undefined>(undefined);
    const [selectedAnswerPoints, setSelectedAnswerPoints] = React.useState<MatchQuestionPoints[]>([]);

    const addMatchQuestion = (answerPoints) => {
        if (!activeQuestion) return;
        const newMatchQuestion = {
            question: activeQuestion,
            points: answerPoints
        };
        setMatchQuestions([...matchQuestions, newMatchQuestion]);
        setActiveQuestion(undefined);
        setSelectedAnswerPoints([]);
        setSelectedBuzzer(undefined);
    }

    const getPlayerAtBuzzer = (team, buzzerNumber) => {
        const numberMap = ['','One','Two','Three','Four'];
        return team[`buzzer${numberMap[buzzerNumber]}`].length
    }

    const onPlayerAnswered = (type) => {
        if (!selectedBuzzer) return;

        const buzzer = Number(selectedBuzzer.replace(/\D/, ''));
        const teamColor = selectedBuzzer.includes('r') ? 'red' : 'green';
        const team = teamColor === 'red' ? redTeam : greenTeam;
        const mqp = {
            teamColor,
            buzzer,
            playerAtBuzzer: getPlayerAtBuzzer(team, buzzer),
            correct: type === 'correct'
        };
        const answerPoints = [...selectedAnswerPoints, mqp];
        setSelectedAnswerPoints(answerPoints)
        if (type.includes("interupt")) {
            setSelectedBuzzer(undefined);
        } else {
            addMatchQuestion(answerPoints);
        }
    }

    const onBuzzerClick = (buzzer) => {
        if (buzzer === selectedBuzzer) {
            setSelectedBuzzer(undefined);
        } else {
            setSelectedBuzzer(buzzer);
        }
    }

    const createTeams = (teams) => {
        setRedTeam(teams.red);
        setGreenTeam(teams.green);
    }

    if (!redTeam || !greenTeam) {
        return (
            <Card>
                <CardTitle>Teams</CardTitle>
                <CardBody>
                    <TeamsForm onCreate={createTeams} />
                </CardBody>
            </Card>
        );
    }

    return (
        <>
            <MatchQuestionHelper questions={matchQuestions}></MatchQuestionHelper>

            {activeQuestion && <>
                <Card>
                    <CardTitle>Active Question</CardTitle>
                    <CardBody>
                        <SetQuestion q={activeQuestion} />
                    </CardBody>
                    <CardFooter>
                        <Flex spaceItems={{default: 'spaceItemsXs'}}>
                            <FlexItem>
                                <Button isDisabled={selectedAnswerPoints[0]?.teamColor === 'red'} style={{backgroundColor: selectedBuzzer === 'r1' ? 'red' : '#550000'}} onClick={() => onBuzzerClick('r1')}>1</Button>
                            </FlexItem>
                            <FlexItem>
                                <Button isDisabled={selectedAnswerPoints[0]?.teamColor === 'red'} style={{backgroundColor: selectedBuzzer === 'r2' ? 'red' : '#550000'}} onClick={() => onBuzzerClick('r2')}>2</Button>
                            </FlexItem>
                            <FlexItem>
                                <Button isDisabled={selectedAnswerPoints[0]?.teamColor === 'red'} style={{backgroundColor: selectedBuzzer === 'r3' ? 'red' : '#550000'}} onClick={() => onBuzzerClick('r3')}>3</Button>
                            </FlexItem>
                            <FlexItem>
                                <Button isDisabled={selectedAnswerPoints[0]?.teamColor === 'red'} style={{backgroundColor: selectedBuzzer === 'r4' ? 'red' : '#550000'}} onClick={() => onBuzzerClick('r4')}>4</Button>
                            </FlexItem>
                        </Flex><br />
                        <Flex spaceItems={{default: 'spaceItemsXs'}}>
                            <FlexItem>
                                <Button isDisabled={selectedAnswerPoints[0]?.teamColor === 'green'} style={{backgroundColor: selectedBuzzer === 'g1' ? '#00aa00' : '#003300'}} onClick={() => onBuzzerClick('g1')}>1</Button>
                            </FlexItem>
                            <FlexItem>
                                <Button isDisabled={selectedAnswerPoints[0]?.teamColor === 'green'} style={{backgroundColor: selectedBuzzer === 'g2' ? '#00aa00' : '#003300'}} onClick={() => onBuzzerClick('g2')}>2</Button>
                            </FlexItem>
                            <FlexItem>
                                <Button isDisabled={selectedAnswerPoints[0]?.teamColor === 'green'} style={{backgroundColor: selectedBuzzer === 'g3' ? '#00aa00' : '#003300'}} onClick={() => onBuzzerClick('g3')}>3</Button>
                            </FlexItem>
                            <FlexItem>
                                <Button isDisabled={selectedAnswerPoints[0]?.teamColor === 'green'} style={{backgroundColor: selectedBuzzer === 'g4' ? '#00aa00' : '#003300'}} onClick={() => onBuzzerClick('g4')}>4</Button>
                            </FlexItem>
                        </Flex><br />
                        {!selectedBuzzer && (
                            <Button onClick={() => addMatchQuestion(selectedAnswerPoints) }>No answer</Button>
                        )}
                        {selectedBuzzer && (
                            <>
                                <Button onClick={() => onPlayerAnswered('correct')}>Correct</Button>{' '}
                                <Button onClick={() => onPlayerAnswered('incorrect')}>Incorrect</Button>{' '}
                                {!selectedAnswerPoints?.length && <Button onClick={() => onPlayerAnswered('interuptincorrect')}>Interrupted & Incorrect</Button>}
                            </>
                        )}
                    </CardFooter>
                </Card>
            </> }

            {(redTeam && greenTeam && !activeQuestion) && <QuestionTable noQuoteDefault onQuestion={setActiveQuestion} /> }
        </>
    )
}