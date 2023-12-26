export type JbqItem = {
    section: number;
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