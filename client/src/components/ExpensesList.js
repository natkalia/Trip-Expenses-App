import React from 'react'; 
import styled from 'styled-components';
import { 
  LinkButtonSmall,
  Ul
} from './styled';
import { Chip } from './Chip';
import { theme } from '../utils/theme';

const ExpenseButtonSmall = styled(LinkButtonSmall)`
  margin: 0;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
`;

const ExpenseLineWrapper = styled.li`
  border-top: 1px solid ${theme.colors.neutralMidLight};
  padding: 0.5rem 0;

  &:nth-child(odd) {
    background-color: ${theme.colors.neutralExtraLight};
  }
`;

const ExpenseCard = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "name name"
    "category cost"
    "action action";
  padding: 0 0.5rem;
  ${theme.media.landscapePhone} {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
      "name name name"
      "category cost action";
  }
`;

const ExpenseDetail = styled.div`
  margin-bottom: 0.5rem;
  `;

const ExpenseNameWrapper = styled.div`
  font-size: 1.2em;
  font-weight: bold;
  grid-area: name;
  padding: 0.5rem 0;
`;

const ExpenseCategoryWrapper= styled(ExpenseDetail)`
  grid-area: category;
`;

const ExpenseCostWrapper= styled(ExpenseDetail)`
  grid-area: cost;
  text-align: right;
  ${theme.media.landscapePhone} {
    text-align: left;
  }
`;

const ExpenseButtonWrapper= styled.div`
  grid-area: action;
`;

export const ExpenseLine = (props) => {
  return (
    <ExpenseLineWrapper>
      <ExpenseCard>
        <ExpenseNameWrapper>
          {props.expense.name}
        </ExpenseNameWrapper>
        <ExpenseCategoryWrapper>
          <Chip content={props.expense.category}/>
        </ExpenseCategoryWrapper>
        <ExpenseCostWrapper>
          {props.expense.cost} {props.expense.currency}
        </ExpenseCostWrapper>
        <ExpenseButtonWrapper>
          <ExpenseButtonSmall to={`/trips/${props.tripId}/expenses/edit/${props.expense._id}`} color="greyOutline">Edit/Delete</ExpenseButtonSmall>
        </ExpenseButtonWrapper>
      </ExpenseCard>
    </ExpenseLineWrapper>
  )
}

export const ExpensesList = styled(Ul)`
`;
