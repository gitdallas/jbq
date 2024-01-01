import { Answer, Reference } from "@app/utils/common"
import { DataListCell, DataListItem, DataListItemCells, DataListItemRow, Flex, FlexItem, List, ListItem } from "@patternfly/react-core"
import React from "react"
import { JbqItem } from "src/types"


export const SetQuestion = ({q}: {q: JbqItem}) => {
    return (
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
    )
}