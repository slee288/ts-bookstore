import { MouseEvent } from "react";
import { css } from "@emotion/react";
import { Book } from "../interfaces";
import styled from "@emotion/styled";

interface CardProps {
    book: Book;
    editAction: (id:string) => void;
    deleteAction: (event: MouseEvent, id: string) => void;
}

const Card = ({
    book = { id: "", name: "", price: 0, category: "" },
    editAction,
    deleteAction
}: CardProps) => {
    return (
        <CardWrapper onClick={() => editAction ? editAction(book.id) : () => {}} key={book.id}>
            <div css={css`padding-bottom: 32px;`}>
                <p css={css`font-size: 20px; font-weight: bold;`}>{book.name}</p>
                <p css={css`font-size: 16px; padding-bottom: 8px; color: #666`}>${book.price}</p>
                <p css={css`font-size: 16px;`}>Category: {book.category}</p>
            </div>
          
          {deleteAction && (
            <DeleteButton onClick={(event: MouseEvent) => deleteAction(event, book.id)}>
                Delete
            </DeleteButton>
          )}
        </CardWrapper>
    )
}

const CardWrapper = styled.a`
    padding: 16px 20px;
    border: 2px solid #999;
    border-radius: 16px;
    min-width: 200px;
    cursor: pointer;
    &:hover {
    opacity: 0.7;
    }
`;
const DeleteButton = styled.button`
    border: 1px solid #EF4F57;
    color: #ef4f57;
    min-width: 120px;
    &:hover {
        background-color: #ef4f57;
        color: #fff;
    }
`;

export default Card;