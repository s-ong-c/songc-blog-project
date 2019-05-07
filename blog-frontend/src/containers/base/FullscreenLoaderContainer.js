// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { State } from 'store';
import FullscreenLoader from '../../components/base/FullscreenLoader';

type Props = {
  visible: boolean,
};

class FullscreenLoaderContainer extends Component<Props> {
  render() {
    return (
      <FullscreenLoader {...this.props} />
    );
  }
}

export default connect(
  ({ base }: State) => ({
    visible: base.fullscreenLoader,
  }),
  () => ({}),
)(FullscreenLoaderContainer);