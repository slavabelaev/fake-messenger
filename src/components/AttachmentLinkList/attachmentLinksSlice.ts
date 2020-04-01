import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AttachmentLink} from "../../models/AttachmentLink";
import {findAttachmentLinks} from "../../services/attachmentLinkService";
import {Dispatch} from "react";
import {ErrorResponse, FindAllResponse} from "../../interfaces/Service";
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

export const fetchAttachmentLinks = () => (dispatch: Dispatch<any>) => {
    dispatch(attachmentLinksRequest());
    findAttachmentLinks()
        .then(response => {
            const failedResponse = response as ErrorResponse;
            if (failedResponse.errors) throw new Error();
            const successResponse = response as FindAllResponse<AttachmentLink>;
            const action = attachmentLinksSuccess(successResponse.items);
            dispatch(action);
        })
        .catch(_ => dispatch(attachmentLinksFailure()))
};

const attachmentLinksReducer = attachmentLinksSlice.reducer;

export default attachmentLinksReducer;
