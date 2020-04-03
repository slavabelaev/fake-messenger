import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AttachmentLink} from "../../models/AttachmentLink";
import {fetchAttachmentLinks} from "../../services/attachmentLinkService";
import {Dispatch} from "react";
import {ErrorResponse, FetchList} from "../../interfaces/Service";
import {RootState} from "../../app/rootReducer";

export interface LinksState {
    items: AttachmentLink[];
    loading: boolean;
    error: boolean;
}

const initialState: LinksState = {
    items: [],
    loading: false,
    error: false
};

const attachmentLinksSlice = createSlice({
    name: 'attachmentLinks',
    initialState,
    reducers: {
        request(state) {
            state.loading = true;
            state.error = false;
        },
        success(state, action: PayloadAction<AttachmentLink[]>) {
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

export const selectAttachmentLinks = (state: RootState) => state.attachmentLinks;

export const {
    request: attachmentLinksRequest,
    success: attachmentLinksSuccess,
    failure: attachmentLinksFailure
} = attachmentLinksSlice.actions;

export const fetchAttachmentLinksAsync = () => (dispatch: Dispatch<any>) => {
    dispatch(attachmentLinksRequest());
    fetchAttachmentLinks()
        .then(response => {
            const errors = (response as ErrorResponse).errors;
            if (errors) throw new Error(errors[0]);
            const attachmentLinks = (response as FetchList<AttachmentLink>).items;
            const action = attachmentLinksSuccess(attachmentLinks);
            dispatch(action);
        })
        .catch(error => {
            const action = attachmentLinksFailure();
            dispatch(action);
        })
};

const attachmentLinksReducer = attachmentLinksSlice.reducer;

export default attachmentLinksReducer;
