import { ActionGroup, Button, Form, FormGroup, TextInput } from "@patternfly/react-core"
import React from "react"
import { Player, Team } from "src/types"

export const TeamsForm = ({onCreate}) => {
    const [gName, setGName] = React.useState<string>('')
    const [g1, setG1] = React.useState<string>('');
    const [g2, setG2] = React.useState<string>('');
    const [g3, setG3] = React.useState<string>('');
    const [g4, setG4] = React.useState<string>('');
    const [rName, setRName] = React.useState<string>('')
    const [r1, setR1] = React.useState<string>('');
    const [r2, setR2] = React.useState<string>('');
    const [r3, setR3] = React.useState<string>('');
    const [r4, setR4] = React.useState<string>('');


    const submitForm = () => {
        onCreate({
            green: createTeam(gName, [g1,g2,g3,g4]),
            red: createTeam(rName, [r1,r2,r3,r4]),
        });
    }

    const createTeam = (name, buzzers) => {
        return {
            name: name,
            buzzerOne: createPlayer(buzzers[0]),
            buzzerTwo: createPlayer(buzzers[1]),
            buzzerThree: createPlayer(buzzers[2]),
            buzzerFour: createPlayer(buzzers[3]),
            appeals: 2,
            timeouts: 3
        } as Team;
    }

    const createPlayer = (name) => {
        if (!name) {
            return [];
        }
        return [{
            name: name,
            questionsCorrect: [],
            questionsWrong: []
        } as Player];
    }
    return (
        <Form isHorizontal>
            <FormGroup label="Green Team Name"><TextInput onChange={(_e, val) => setGName(val)} value={gName} /></FormGroup>
            <FormGroup label="Buzzer 1"><TextInput onChange={(_e, val) => setG1(val)} value={g1} /></FormGroup>
            <FormGroup label="Buzzer 2"><TextInput onChange={(_e, val) => setG2(val)} value={g2} /></FormGroup>
            <FormGroup label="Buzzer 3"><TextInput onChange={(_e, val) => setG3(val)} value={g3} /></FormGroup>
            <FormGroup label="Buzzer 4"><TextInput onChange={(_e, val) => setG4(val)} value={g4} /></FormGroup>
            <FormGroup label="Red Team Name"><TextInput onChange={(_e, val) => setRName(val)} value={rName} /></FormGroup>
            <FormGroup label="Buzzer 1"><TextInput onChange={(_e, val) => setR1(val)} value={r1} /></FormGroup>
            <FormGroup label="Buzzer 2"><TextInput onChange={(_e, val) => setR2(val)} value={r2} /></FormGroup>
            <FormGroup label="Buzzer 3"><TextInput onChange={(_e, val) => setR3(val)} value={r3} /></FormGroup>
            <FormGroup label="Buzzer 4"><TextInput onChange={(_e, val) => setR4(val)} value={r4} /></FormGroup>
            <ActionGroup>
                <Button onClick={submitForm}>Create Teams</Button>
            </ActionGroup>
        </Form>
    )
}