// @flow
import handleActions from 'redux-actions/lib/handleActions';
import createAction from 'redux-actions/lib/createAction';
import { Record, type Map } from 'immutable';

const SHOW_USER_MENU = 'base/SHOW_USER_MENU';
const HIDE_USER_MENU = 'base/HIODE_USER_MENU';
const SET_FULLSCREEN_LOADER = 'base/SET_FULLSCREEN_LOADER';

export type BaseActionCreators = {
  showUserMenu(): any,
  hideUserMenu(): any,
  setFullscreenLoader(visibility: boolean): any,
};

export const actionCreators = {
  showUserMenu: createAction(SHOW_USER_MENU),
  hideUserMenu: createAction(HIDE_USER_MENU),
  setFullscreenLoader: createAction(SET_FULLSCREEN_LOADER),
};

export type Base = {
  userMenu: boolean,
  fullscreenLoader: boolean
}

const BaseRecord = Record({
  userMenu: false,
  fullscreenLoader: false,
});

const initialState: Map<string, *> = BaseRecord();

export default handleActions({
  [SHOW_USER_MENU]: state => state.set('userMenu', true),
  [HIDE_USER_MENU]: state => state.set('userMenu', false),
  [SET_FULLSCREEN_LOADER]: (state, {payload: visibility}) => state.set('fullscreenLoader', visibility),
}, initialState);