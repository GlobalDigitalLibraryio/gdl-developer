import React, { Component } from 'react';

import SwaggerUi, { presets } from 'swagger-ui';
import 'swagger-ui/dist/swagger-ui.css';

type Props = {
  url: string;
  spec?: Object;
};

// TODO: create a typescript class, currently global typed in custom.d.ts
class SwaggerUI extends Component<Props> {
  static defaultProps = {
    url: 'https://api.test.digitallibrary.io/book-api/api-docs'
  };

  componentDidMount() {
    SwaggerUi({
      dom_id: '#swaggerContainer',
      url: this.props.url,
      presets: [presets.apis]
    });
  }

  render() {
    return <div id="swaggerContainer" />;
  }
}

export default SwaggerUI;
