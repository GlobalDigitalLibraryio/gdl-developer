import React, { Component } from 'react';

import SwaggerUi, { presets } from 'swagger-ui';
import 'swagger-ui/dist/swagger-ui.css';

type Props = {
  domId: string;
  url: string;
  spec?: Object;
};

// TODO: create a typescript class, currently global typed in custom.d.ts
class SwaggerUI extends Component<Props> {
  componentDidMount() {
    SwaggerUi({
      dom_id: `#${this.props.domId}`,
      url: this.props.url,
      presets: [presets.apis]
    });
  }

  render() {
    return <div id={this.props.domId} />;
  }
}

export default SwaggerUI;
