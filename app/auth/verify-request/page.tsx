import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function VerifyRequestPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Check your email</CardTitle>
        </CardHeader>
        <CardContent>
          <p>A sign-in link has been sent to your email address.</p>
        </CardContent>
      </Card>
    </div>
  );
}
