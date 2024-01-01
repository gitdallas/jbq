import React, { useState } from 'react';
import { Button, Card, CardBody, CardFooter, CardTitle, Form, FormFieldGroup, FormGroup, SearchInput, TextInput, ToggleGroup, ToggleGroupItem, ToggleGroupItemProps } from '@patternfly/react-core';
import { Table, Caption, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';
import { questions } from '../data';
import { QuestionTable } from '@app/Table/Table';
import { MatchQuestionHelper } from '@app/components/MatchQuestionHelper';
import { Buzzers, JbqItem, MatchQuestion, Team } from 'src/types';
import { SetQuestion } from '@app/components/SetQuesetion';
import { TeamsForm } from './TeamsForm';


export const CoachHelper: React.FunctionComponent = () => {
    const [questions, setQuestions] = React.useState<MatchQuestion[]>([]);
    const [activeQuestion, setActiveQuestion] = React.useState<JbqItem | undefined>(undefined);
    const [greenTeam, setGreenTeam] = React.useState<Team | undefined>(undefined);
    const [redTeam, setRedTeam] = React.useState<Team | undefined>(undefined);

    const addQuestion = (question) => {
        setQuestions([...questions, {question: question, playerPoints:[]}]);
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
            <MatchQuestionHelper questions={questions}></MatchQuestionHelper>
            {activeQuestion && <>
                <Card>
                    <CardTitle>Active Question</CardTitle>
                    <CardBody>
                        <SetQuestion q={activeQuestion} />
                    </CardBody>
                    <CardFooter>
                        {}
                        <Button>No answer</Button>
                    </CardFooter>
                </Card>
            </> }
            {(redTeam && greenTeam && !activeQuestion) && <QuestionTable noQuoteDefault onQuestion={setActiveQuestion} /> }
        </>
    )
}