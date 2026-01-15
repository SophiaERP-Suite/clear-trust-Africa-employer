import DOMPurify from 'dompurify';
 
interface HtmlRendererProps {
  html: string;
}
 
export default function HtmlRenderer({ html }: HtmlRendererProps) {
  return (
    <div
      className="prose prose-sm max-w-none"
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(html),
      }}
    />
  );
}
