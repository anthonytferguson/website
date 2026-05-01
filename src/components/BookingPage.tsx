import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useAuth } from "../lib/AuthContext";

const WEB3FORMS_ACCESS_KEY = "f900797c-f5ca-4e31-ad80-915a159ace50";

const SERVICE_LABEL: Record<string, string> = {
  lawn_maintenance: "Lawn & Garden Maintenance",
  decks_fences:     "Decks & Fences",
  rubbish_removal:  "Rubbish Removal",
  other:            "Other",
};

const bookingSchema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(8, "Please enter a valid phone number."),
  serviceType: z.string().min(1, "Please select a service type."),
  date: z.date(),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  notes: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;



export function BookingPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const initialService = searchParams.get("service") || "";
  
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: user?.displayName || "",
      email: user?.email || "",
      phone: "",
      serviceType: initialService,
      address: "",
      notes: "",
    },
  });

  // Update form values when user changes
  useEffect(() => {
    if (user) {
      form.setValue("name", user.displayName || "");
      form.setValue("email", user.email || "");
    }
  }, [user, form]);

  async function onSubmit(data: BookingFormValues) {
    const service = SERVICE_LABEL[data.serviceType] ?? data.serviceType;
    const dateStr = data.date
      ? data.date.toLocaleDateString("en-NZ", {
          weekday: "long", year: "numeric", month: "long", day: "numeric",
        })
      : "Not specified";

    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `New booking: ${service} — ${data.name}`,
      from_name: "Tendr Bookings",
      replyto: data.email,
      email: data.email,
      name: data.name,
      phone: data.phone,
      service: service,
      preferred_date: dateStr,
      address: data.address,
      notes: data.notes || "—",
      botcheck: "",
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Submission failed");
      }

      toast.success("Booking sent! We'll get back to you within 24 hours.");
      form.reset();
      navigate("/thank-you");
    } catch (err: any) {
      console.error("Booking submit error:", err);
      toast.error("Something went wrong. Please try again or email hello@tendr.services.");
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Book a Service</h1>
        <p className="text-muted-foreground">Fill out the form below and we'll get back to you with a confirmation.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Service Details</CardTitle>
              <CardDescription>Tell us what you need help with.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="021 123 4567" type="tel" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="serviceType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service Type</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="lawn_maintenance">Lawn Maintenance</SelectItem>
                              <SelectItem value="decks_fences">Decks & Fences</SelectItem>
                              <SelectItem value="rubbish_removal">Rubbish Removal</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="mb-2">Preferred Date</FormLabel>
                          <Popover>
                            <PopoverTrigger
                              className={cn(
                                "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service Address</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Maintenance St, Suburb" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Notes</FormLabel>
                        <FormControl>
                          <textarea
                            className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Tell us more about the job..."
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Include any specific details or access instructions.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Submit Booking Request"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Why Tendr?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-primary font-bold text-xs">1</span>
                </div>
                <p>Submit your request online in minutes.</p>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-primary font-bold text-xs">2</span>
                </div>
                <p>We'll review and confirm your appointment within 24 hours.</p>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-primary font-bold text-xs">3</span>
                </div>
                <p>Our professionals arrive and get the job done right.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted/50 border-none">
            <CardContent className="pt-6">
              <p className="text-sm italic text-muted-foreground">
                "Tendr made building our new fence so easy. The team was professional and the quality is outstanding."
              </p>
              <p className="text-xs font-semibold mt-4">— Sarah J., Homeowner</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
