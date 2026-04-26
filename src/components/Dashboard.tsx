import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { db, auth } from "../lib/firebase";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { useAuth } from "../lib/AuthContext";
import { useNavigate } from "react-router-dom";

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

interface Booking {
  id: string;
  serviceType: string;
  date: string;
  address: string;
  status: string;
  price?: string;
  userEmail?: string;
}

interface Inquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: any;
}

export function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = user?.email === "admin@tendr.services";

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate("/login");
      return;
    }

    const bookingsPath = 'bookings';
    const bookingsQuery = isAdmin 
      ? query(collection(db, bookingsPath), orderBy("createdAt", "desc"))
      : query(collection(db, bookingsPath), where("userId", "==", user.uid), orderBy("createdAt", "desc"));

    const unsubscribeBookings = onSnapshot(bookingsQuery, (snapshot) => {
      const fetchedBookings = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Booking[];
      setBookings(fetchedBookings);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, bookingsPath);
    });

    let unsubscribeInquiries = () => {};
    if (isAdmin) {
      const inquiriesPath = 'inquiries';
      const inquiriesQuery = query(collection(db, inquiriesPath), orderBy("createdAt", "desc"));
      unsubscribeInquiries = onSnapshot(inquiriesQuery, (snapshot) => {
        const fetchedInquiries = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Inquiry[];
        setInquiries(fetchedInquiries);
      }, (error) => {
        handleFirestoreError(error, OperationType.LIST, inquiriesPath);
      });
    }

    return () => {
      unsubscribeBookings();
      unsubscribeInquiries();
    };
  }, [user, authLoading, navigate, isAdmin]);

  if (authLoading || loading) {
    return (
      <div className="container mx-auto px-4 py-20 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">{isAdmin ? "Admin Dashboard" : "Your Dashboard"}</h1>
          <p className="text-muted-foreground">
            {isAdmin ? "Overview of all customer requests." : "Manage your bookings and view service history."}
          </p>
        </div>
        {!isAdmin && (
          <Button onClick={() => navigate("/book")}>
            New Booking
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">{isAdmin ? "All Bookings" : "Service History"}</h2>
            {bookings.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  No bookings found.
                </CardContent>
              </Card>
            ) : (
              bookings.map((booking) => (
                <Card key={booking.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="capitalize">{booking.serviceType.replace('-', ' ')}</CardTitle>
                        <CardDescription>
                          {isAdmin ? `User: ${booking.userEmail}` : `Booking ID: #${booking.id.slice(0, 8)}`}
                        </CardDescription>
                      </div>
                      <Badge variant={booking.status === "completed" ? "default" : "secondary"} className="capitalize">
                        {booking.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(booking.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{booking.address}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </section>

          {isAdmin && (
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">Customer Inquiries</h2>
              {inquiries.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center text-muted-foreground">
                    No inquiries yet.
                  </CardContent>
                </Card>
              ) : (
                inquiries.map((inquiry) => (
                  <Card key={inquiry.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{inquiry.subject}</CardTitle>
                      <CardDescription>
                        From: {inquiry.name} ({inquiry.email})
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm border-l-2 pl-4 border-primary/20 bg-muted/30 p-3 rounded-r-md italic">
                        "{inquiry.message}"
                      </p>
                      <div className="flex justify-end mt-4">
                        <Button variant="outline" size="sm" onClick={() => window.location.href = `mailto:${inquiry.email}`}>
                          Reply via Email
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </section>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Bookings</span>
                <span className="font-bold">2</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Member Since</span>
                <span className="font-bold">May 2024</span>
              </div>
              <div className="pt-4 border-t">
                <Button variant="outline" className="w-full">Edit Profile</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-primary" />
                Need Help?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground mb-4">
                Have questions about your booking or need to reschedule? Our support team is here to help.
              </p>
              <Button size="sm" className="w-full">Contact Support</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
