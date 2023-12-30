import React, { useState, useEffect, SetStateAction, Dispatch, ChangeEvent } from 'react';
import { css } from "@emotion/react";
import { Book } from "../interfaces";

interface ModalProps {
    opened: boolean;
    setOpened: Dispatch<SetStateAction<boolean>>;
    formFields: Book;
    setFormFields: Dispatch<SetStateAction<Book>>;
    submitAction: (event: React.MouseEvent<Element, MouseEvent>) => void
}

const ModalForm = ({ 
    opened = false, 
    setOpened = () => {},
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
    <div className="modal" css={css`
        position: fixed;
        display: ${opened ? "flex" : "none"};
        flex-wrap: wrap;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.6);
      `}>
        <div className="modal-content" css={css`
          position: relative;
          background-color: white;
          padding: 20px 40px;
          border-radius: 16px;
          min-width: 350px;
          height: fit-content;
        `}>
          <div className="modal-header" css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
          `}>
            <h2>Book Manager</h2>
            <button onClick={() => setOpened(!opened)}>x</button>
          </div>
          <form id="bookForm" className="book-editor">
            <div css={css`
              margin-bottom: 24px;
              & > * { display: block; }
            `}>
              <label css={css`
                font-weight: bold;
                font-size: 16px;
                padding-bottom: 12px;
              `}>
                Name:
              </label>
              <input type="text" name="name" value={formFields.name} onChange={editFields} 
                css={css`
                    display: block;
                    box-sizing: border-box;
                    padding: 8px 16px;
                    border-radius: 12px;
                    width: 100%;
                    border: 1px solid #333;
                    &:hover { border: 1px solid #ccc; }
                `} />
            </div>
            <div css={css`
              margin-bottom: 24px;
              & > * { display: block; }
            `}>
              <label css={css`
                font-weight: bold;
                font-size: 16px;
                padding-bottom: 12px;
              `}>
                Price ($):
              </label>
              <input type="number" name="price" value={formFields.price} onChange={editFields}
                min="0" step="0.01"
                css={css`
                    display: block;
                    box-sizing: border-box;
                    padding: 8px 16px;
                    border-radius: 12px;
                    width: 100%;
                    border: 1px solid #333;
                    &:hover { border: 1px solid #ccc; }
                `} />
            </div>
            <div css={css`
              margin-bottom: 24px;
              & > * { display: block; }
            `}>
              <label css={css`
                font-weight: bold;
                font-size: 16px;
                padding-bottom: 12px;
              `}>
                Category:
              </label>
              <input type="text" name="category" value={formFields.category} onChange={editFields}
              css={css`
                display: block;
                box-sizing: border-box;
                padding: 8px 16px;
                border-radius: 12px;
                width: 100%;
                border: 1px solid #333;
                &:hover { border: 1px solid #ccc; }
              `} />
            </div>
            <div css={css`
              margin-bottom: 24px;
              & > * { display: block; }
            `}>
              <label css={css`
                font-weight: bold;
                font-size: 16px;
                padding-bottom: 12px;
              `}>
                Description:
              </label>
              <textarea name="description" value={formFields.description} onChange={editFields}
              css={css`
                display: block;
                box-sizing: border-box;
                padding: 8px 16px;
                border-radius: 12px;
                width: 100%;
                border: 1px solid #333;
                &:hover { border: 1px solid #ccc; }
              `} />
            </div>
            <button disabled={!formIsValid} onClick={submitAction} css={css`
                &[disabled] {
                    pointer-events: none;
                }
            `}>Submit</button>
          </form>
        </div>
    </div>
    )
}

export default ModalForm;