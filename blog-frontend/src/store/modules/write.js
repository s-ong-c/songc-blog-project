// @flow
import createAction from 'redux-actions/lib/createAction';
import handleActions from 'redux-actions/lib/handleActions';
import { Record, fromJS, type Map } from 'immutable';

const EDIT_BODY = 'EDIT_BODY';
const EDIT_FILED = 'EDIT_FILED';
export type WriteActionCreators = {
    editBody(value: string): any,
    editFiled({field: string, value: string}): any
};

export const actionCreators = {
    editBody: createAction(EDIT_BODY),
};

export type Write = {
    body: string
};

const WriteRecord = Record({
    body: '',
});

const initalState : Map<string, *> = WriteRecord();

export default handleActions({
    [EDIT_BODY]: (state, {payload: value}) => state.set('body', value), 

},initalState);