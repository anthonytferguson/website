export function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose prose-slate max-w-none">
        <p className="text-lg text-muted-foreground mb-6">
          Last updated: May 14, 2024
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">1. Information We Collect</h2>
        <p className="mb-4">
          We collect information you provide directly to us when you book a service, 
          create an account, or contact us. This may include your name, email address, 
          phone number, and service address.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">2. How We Use Your Information</h2>
        <p className="mb-4">
          We use the information we collect to:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Provide, maintain, and improve our services;</li>
          <li>Process your bookings and send you related information;</li>
          <li>Respond to your comments, questions, and requests;</li>
          <li>Communicate with you about services, offers, and events.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">3. Sharing of Information</h2>
        <p className="mb-4">
          We do not share your personal information with third parties except as 
          described in this policy or with your consent.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">4. Security</h2>
        <p className="mb-4">
          We take reasonable measures to help protect information about you from 
          loss, theft, misuse, and unauthorized access.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">5. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy, please contact us at 
          hello@tendr.services.
        </p>
      </div>
    </div>
  );
}
