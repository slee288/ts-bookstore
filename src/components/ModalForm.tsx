import React, { useState, useEffect, SetStateAction, Dispatch, ChangeEvent } from 'react';
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Book } from "../interfaces";

interface ModalProps {
    opened: boolean;
    setOpened: Dispatch<SetStateAction<boolean>>;
    formState: string;
    formFields: Book;
    setFormFields: Dispatch<SetStateAction<Book>>;
    submitAction: (event: React.MouseEvent<Element, MouseEvent>) => void
}

const ModalForm = ({ 
    opened = false, 
    setOpened = () => {},
    formState = "add",
    formFields = { id: "", name: "", price: 0, category: "" },
    setFormFields = () => {},
    submitAction = (event: React.MouseEvent<Element, MouseEvent>) => { event.preventDefault() }
}: ModalProps) => {
    const [formIsValid, setFormIsValid] = useState(false);
    useEffect(() => {
        const { name, price, category } = formFields;
        if(!name || !price || !category) setFormIsValid(false);
        else setFormIsValid(true);
    }, [formFields]);

    function editFields(event: ChangeEvent) {
        const { name, value } = event.target as HTMLInputElement;
        setFormFields({ ...formFields, [name]: value });
    }

    return (
    <Modal className="modal" css={css`
        display: ${opened ? "flex" : "none"};
      `}>
        <ModalContent className="modal-content">
          <div className="modal-header" css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
          `}>
            <h2>{formState === "add" ? "Add a Book!" : "Edit the Book!"}</h2>
            <button onClick={() => setOpened(!opened)}>x</button>
          </div>
          <form id="bookForm" className="book-editor">
            <FormFieldWrapper>
              <FormLabel>Name:</FormLabel>
              <FormInput 
                type="text" name="name" value={formFields.name} 
                onChange={editFields} 
              />
            </FormFieldWrapper>
            <FormFieldWrapper>
              <FormLabel>Price ($):</FormLabel>
              <FormInput 
                type="number" name="price" value={formFields.price} 
                onChange={editFields} min="0" step="0.01" 
               />
            </FormFieldWrapper>
            <FormFieldWrapper>
              <FormLabel>Category:</FormLabel>
              <FormInput 
                type="text" name="category" 
                value={formFields.category} onChange={editFields} 
               />
            </FormFieldWrapper>
            <FormFieldWrapper>
              <FormLabel>Description:</FormLabel>
              <FormTextArea 
                name="description" value={formFields.description || ""} onChange={editFields}
              />
            </FormFieldWrapper>
            <SubmitButton disabled={!formIsValid} onClick={submitAction}>
                {formState === "add" ? "Add" : "Edit"}
            </SubmitButton>
          </form>
        </ModalContent>
    </Modal>
    )
}

const Modal = styled.div`
    position: fixed;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.6);
`;
const ModalContent = styled.div`
    position: relative;
    background-color: white;
    padding: 20px 40px;
    border-radius: 16px;
    min-width: 350px;
    height: fit-content;
`;
const FormFieldWrapper = styled.div`
    margin-bottom: 24px;
    & > * { display: block; }
`;
const FormLabel = styled.label`
    font-weight: bold;
    font-size: 16px;
    padding-bottom: 12px;
`;
const FormInput = styled.input`
    display: block;
    box-sizing: border-box;
    padding: 8px 16px;
    border-radius: 12px;
    width: 100%;
    border: 1px solid #333;
    &:hover { border: 1px solid #ccc; }
`;
const FormTextArea = styled.textarea`
    display: block;
    box-sizing: border-box;
    padding: 8px 16px;
    border-radius: 12px;
    width: 100%;
    border: 1px solid #333;
    &:hover { border: 1px solid #ccc; }
`;
const SubmitButton = styled.button`
    border: 1px solid #333;
    &[disabled] {
        pointer-events: none;
    };
    &:hover {
        border: 1px solid #999;
        color: #999;
    }
`;

export default ModalForm;