import { Link } from "react-router";
import Page from "../components/Page.jsx";
import PageHeader from "../components/PageHeader.jsx";

export default function NotFound() {
  return (
    <Page title="Not found">
      <PageHeader eyebrow="404" title="Nothing here" intro="That page doesn't exist, or it moved." />
      <Link className="button button-solid" to="/">
        Back home
      </Link>
    </Page>
  );
}
