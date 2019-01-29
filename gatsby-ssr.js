const React = require('react');
const { renderToString } = require('react-dom/server');
const JssProvider = require('react-jss/lib/JssProvider').default;
const getPageContext = require('./src/getPageContext').default;
const { extractCritical } = require('emotion-server');

function replaceRenderer({
  bodyComponent,
  replaceBodyHTMLString,
  setHeadComponents
}) {
  // Get the context of the page to collect side effects
  const muiPageContext = getPageContext();

  const bodyHTML = renderToString(
    <JssProvider registry={muiPageContext.sheetsRegistry}>
      {bodyComponent}
    </JssProvider>
  );

  // SSR our CSS in JS styles (Emotion and JSS)
  const { html, ids, css } = extractCritical(bodyHTML);

  replaceBodyHTMLString(html);

  replaceBodyHTMLString(bodyHTML);
  setHeadComponents([
    <style
      type="text/css"
      id="jss-server-side"
      key="jss-server-side"
      dangerouslySetInnerHTML={{
        __html: muiPageContext.sheetsRegistry.toString()
      }}
    />,
    // Emotion
    <style key="emotion-css" dangerouslySetInnerHTML={{ __html: css }} />,
    <script
      key="emotion-ids-html"
      dangerouslySetInnerHTML={{
        __html: `window.__EMOTION_CRITICAL_CSS_IDS__ = ${JSON.stringify(ids)};`
      }}
    />
  ]);
}

exports.replaceRenderer = replaceRenderer;
