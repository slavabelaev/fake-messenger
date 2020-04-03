import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Attachment} from "../../models/Attachment";
import {fetchAttachments} from "../../services/attachmentService";
import {Dispatch} from "react";
import {ErrorResponse, FetchList} from "../../interfaces/Service";
import {RootState} from "../../app/rootReducer";

export interface AttachmentsState {
    items: Attachment[];
    loading: boolean;
    error: boolean;
}

const initialState: AttachmentsState = {
    items: [],
    loading: false,
    error: false
};

const attachmentsSlice = createSlice({
    name: 'attachments',
    initialState,
    reducers: {
        request(state) {
            state.loading = true;
            state.error = false;
        },
        success(state, action: PayloadAction<Attachment[]>) {
            state.error = false;
            state.loading = false;
            state.items = action.payload;
        },
        failure(state) {
            state.error = true;
            state.loading = false;
        },
    }
});

export const selectAttachments = (state: RootState) => state.attachments;

export const {
    request: attachmentsRequest,
    success: attachmentsSuccess,
    failure: attachmentsFailure
} = attachmentsSlice.actions;

export const fetchAttachmentsAsync = () => (dispatch: Dispatch<any>) => {
    dispatch(attachmentsRequest());
    fetchAttachments()
        .then(response => {
            const failedResponse = response as ErrorResponse;
            if (failedResponse.errors) throw new Error();
            const successResponse = response as FetchList<Attachment>;
            const action = attachmentsSuccess(successResponse.items);
            dispatch(action);
        })
        .catch(_ => dispatch(attachmentsFailure()))
};

const attachmentsReducer = attachmentsSlice.reducer;

export default attachmentsReducer;
