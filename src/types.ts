export type JbqItem = {
    set: number;
    points: number;
    number: number;
    quotation: boolean;
    question: {
        start: string;
        end: string;
    };
    answer?: string;
    reference?: string;
    answers?: {
        answer: string;
        reference?: string;
    }[];
}

export type MatchQuestion = {
    number?: number;
    question: JbqItem;
    playerPoints: {player: Player, points: number}[];
}

export type Player = {
    name: string;
    questionsCorrect: MatchQuestion[];
    questionsWrong: MatchQuestion[];
}

export type Buzzer = {
    
}

export type Team = {
    number?: number;
    name?: string;
    buzzerOne?: Player[];
    buzzerTwo?: Player[];
    buzzerThree?: Player[];
    buzzerFour?: Player[];
    appeals?: number;
    timeouts?: number;
}

export type Match = {
    questions: MatchQuestion[];
    teams: Team[];
    buzzers: Buzzers;
}