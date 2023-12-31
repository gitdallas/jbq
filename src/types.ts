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
    number: number;
    question: JbqItem;
    player: Player[];
}

export type Player = {
    name: string;
    questionsCorrect: MatchQuestion[];
    questionsWrong: MatchQuestion[];
}

export type Buzzers = {
    green: {
        team: Team;
        one: Player[];
        two: Player[];
        three: Player[];
        four: Player[];
    };
    red: {
        team: Team;
        one: Player[];
        two: Player[];
        three: Player[];
        four: Player[];
    };
}

export type Team = {
    number?: number;
    name?: string;
    players: Player[];
    appeals: number;
    timeouts: number;
}

export type Match = {
    questions: MatchQuestion[];
    teams: Team[];
    buzzers: Buzzers;
}