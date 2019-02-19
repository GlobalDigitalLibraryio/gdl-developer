import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import SwaggerUi, { presets } from 'swagger-ui';
import 'swagger-ui/dist/swagger-ui.css';

type Props = {
  domId: string;
  url: string;
  spec?: Object;
  clientId: string;
  redirectUrl: string;
};

class SwaggerUI extends Component<Props> {
  swaggerRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    /**
     * We want to remove/hide the client id for OAuth2 from the user which the Swagger UI doesn't provide
     * A hacky solution is to listen to DOM changes with Mutation observer to know when the modal
     * for authorizing is inserted to the DOM
     *
     * https://github.com/swagger-api/swagger-ui/issues/5178
     */
    const mutationObserver = new MutationObserver(mutations => {
      mutations[0].addedNodes.forEach((node: any) => {
        if (node.classList && node.classList.contains('dialog-ux')) {
          // The node we want to target has no id/classname other than 'wrapper'
          const wrappers = (findDOMNode(
            node
          ) as HTMLElement).getElementsByClassName('wrapper');
          // This is pure assumption that the clientId node is always the first one
          const firstNode = wrappers[0];
          if (firstNode && firstNode.parentNode) {
            firstNode.parentNode.removeChild(firstNode);
          }
        }
      });
    });

    const ui = SwaggerUi({
      dom_id: `#${this.props.domId}`,
      url: this.props.url,
      presets: [presets.apis],
      oauth2RedirectUrl: this.props.redirectUrl,
      onComplete: () => {
        // There is a delay upon initializing Swagger and this callback ensure that it has been loaded to the DOM
        if (this.swaggerRef.current) {
          mutationObserver.observe(this.swaggerRef.current, {
            attributes: false,
            characterData: false,
            childList: true,
            subtree: true,
            attributeOldValue: false,
            characterDataOldValue: false
          });
        }
      }
    });

    ui.initOAuth({
      clientId: this.props.clientId,
      realm: 'gdl-realm',
      appName: 'gdl-swagger',
      scopeSeparator: ' ',
      additionalQueryStringParams: { audience: 'gdl_system' }
    });
  }

  render() {
    return <div ref={this.swaggerRef} id={this.props.domId} />;
  }
}

export default SwaggerUI;
