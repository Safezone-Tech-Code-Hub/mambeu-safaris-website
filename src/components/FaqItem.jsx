export default function FaqItem({ question, answer }) {
  return (
    <details className="faq">
      <summary>
        {question}
        <span aria-hidden="true"></span>
      </summary>
      <p>{answer}</p>
    </details>
  );
}
