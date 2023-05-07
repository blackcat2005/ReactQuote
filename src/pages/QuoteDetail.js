import { Fragment, useEffect } from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import Comments from "./../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import NoQuotesFound from "./../components/quotes/NoQuotesFound";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from "../components/ui/LoadingSpinner";

export default function QuoteDetail() {
  const { quoteId } = useParams();
  const { path: pathName, url } = useRouteMatch();
  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote);

  useEffect(() => {
    sendRequest(quoteId);
    // console.log(
    // "🚀 ~ file: QuoteDetail.js ~ line 22 ~ useEffect ~ quoteId",
    // quoteId
    // );
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }
  // if (!loadedQuote.text) {
  //   return <NoQuotesFound />;
  // }

  return (
    <Fragment>
      <HighlightedQuote {...loadedQuote} />
      {/* <Route path="/quotes/:quoteId/comments"> */}
      <Route path={pathName} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${pathName}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
}
