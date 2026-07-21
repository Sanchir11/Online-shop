export default function HtmlPage({ html }) {
  return <main dangerouslySetInnerHTML={{ __html: html }} />;
}
