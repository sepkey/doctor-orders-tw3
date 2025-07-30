import Message from '@/components/ui/Message';
import { isRouteErrorResponse, useRouteError } from 'react-router';

export default function Error() {
  const error = useRouteError();
  const prod = import.meta.env.PROD;

  return (
    <div>
      <main className="prose p-5">
        <h1>Oops...</h1>
        {isRouteErrorResponse(error) ? (
          <Message status="error" message="The requested page was not found." />
        ) : prod ? (
          <Message status="error" message="An unexpected error occurred." />
        ) : (
          <Message status="error" message={(error as Error).message} />
        )}
      </main>
    </div>
  );
}
