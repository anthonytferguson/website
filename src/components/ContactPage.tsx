import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { db, auth } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { sendEmailNotification } from "../lib/emailService";

enum OperationType {
  CREATE = 'create',
  WRITE = 'write',
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export function ContactPage() {
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
      createdAt: serverTimestamp(),
    };

    const path = 'inquiries';
    try {
      await addDoc(collection(db, path), data);

      // Send email notification
      const templateId = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID;
      if (templateId) {
        await sendEmailNotification(templateId, {
          to_name: "Tendr Admin",
          from_name: data.name,
          from_email: data.email,
          subject: `New Inquiry: ${data.subject}`,
          message: `A new inquiry has been received.\n\nFrom: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\n\nMessage:\n${data.message}`,
          inquiry_subject: data.subject,
          inquiry_message: data.message
        });
      }

      toast.success("Message sent! We'll get back to you soon.");
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-muted-foreground text-lg">
          Have a question or need a custom quote? We're here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" placeholder="John Doe" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" name="subject" placeholder="How can we help?" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
                    name="message"
                    className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Tell us more..."
                    required
                  />
                </div>
                <Button type="submit" disabled={loading} className="w-full md:w-auto gap-2">
                  {loading ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</>
                  ) : (
                    <>Send Message <Send className="h-4 w-4" /></>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Get in Touch</h2>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-muted-foreground">hello@tendr.services</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold">Phone</p>
                <p className="text-muted-foreground">0468 166 687</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold">Office</p>
                <p className="text-muted-foreground">5 Manning St South Brisbane</p>
              </div>
            </div>
          </div>

          <Card className="bg-muted/50 border-none">
            <CardContent className="pt-6">
              <h3 className="font-bold mb-2">Business Hours</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>8:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday</span>
                  <span>9:00 AM - 4:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
