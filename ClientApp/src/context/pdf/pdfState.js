import React, { createContext, useReducer } from 'react'
import pdfReducer from './pdfReducer'
import axios from 'axios'

const initialState = {
    result: null,
    loading: false,
    error: null
}

export const PdfContext = createContext(initialState);

export const PdfProvider = ({ children }) => {
    const [state, dispatch] = useReducer(pdfReducer, initialState);

    async function clearResult() {
        dispatch({
            type: 'POST_FILE_CLEAR',
            payload: null
        });
    }

    async function modify(dto) {
        try {
            dispatch({
                type: 'POST_FILE_REQUEST',
                payload: true
            });

            axios({
                url: '/pdf/modify',
                method: 'POST',
                data: dto,
                responseType: 'blob'
            }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');

                link.href = url;
                link.setAttribute('download', dto.Filename);

                document.body.appendChild(link);
                link.click();

                dispatch({
                    type: 'POST_FILE_COMPLETE',
                    payload: url
                });
            });
        }
        catch (err) {
            dispatch({
                type: 'POST_FILE_ERROR',
                payload: err.response.data.error
            });
        }
    }

    return (
        <PdfContext.Provider value={{
            result: state.result,
            loading: state.loading,
            error: state.error,
            clearResult,
            modify
        }}>
            {children}
        </PdfContext.Provider>
    );
}