import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import QuoteForm from "./../components/quotes/QuoteForm";
import useHttp from "../hooks/use-http.js";
import { addQuote } from "../lib/api.js";

export default function NewQuote() {
  const { sendRequest, status } = useHttp(addQuote);
  const history = useHistory();

  useEffect(() => {
    if (status === "completed") {
      history.push("/quotes");
    }
  }, [status, history]);

  const addQuoteHandler = (quote) => {
    console.log("🚀 ~ file: NewQuote.js ~ line 5 ~ NewQuote ~ quote", quote);
    sendRequest(quote);
  };
  return (
    <QuoteForm isLoading={status === "pending"} onAddQuote={addQuoteHandler} />
  );
}
