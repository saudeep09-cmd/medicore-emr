
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useStore } from "@/lib/store";
import { Patient } from "@/lib/types";
import { toast } from "@/components/ui/use-toast";

const visitSchema = z.object({
  date: z.string().min(1, "Date is required."),
  type: z.enum(["routine", "follow-up", "urgent", "consultation", "procedure"]),
  chiefComplaint: z.string().min(5, "Chief complaint must be at least 5 characters."),
  temperature: z.coerce.number().optional(),
  bloodPressure: z.string().optional(),
  heartRate: z.coerce.number().optional(),
  weight: z.coerce.number().optional(),
  assessment: z.string().min(10, "Assessment must be at least 10 characters."),
  plan: z.string().min(10, "Plan must be at least 10 characters."),
  notes: z.string().optional(),
  providerName: z.string().min(2, "Provider name is required."),
});

type VisitFormValues = z.infer<typeof visitSchema>;

interface AddVisitDialogProps {
  patient: Patient;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddVisitDialog({ patient, open, onOpenChange }: AddVisitDialogProps) {
  const addVisit = useStore((state) => state.addVisit);

  const form = useForm<VisitFormValues>({
    resolver: zodResolver(visitSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      type: "routine",
      chiefComplaint: "",
      temperature: undefined,
      bloodPressure: "",
      heartRate: undefined,
      weight: undefined,
      assessment: "",
      plan: "",
      notes: "",
      providerName: "Dr. Sarah Smith",
    },
  });

  const onSubmit = (values: VisitFormValues) => {
    addVisit(patient.id, {
      date: values.date,
      type: values.type,
      chiefComplaint: values.chiefComplaint,
      vitalSigns: {
        temperature: values.temperature,
        bloodPressure: values.bloodPressure || undefined,
        heartRate: values.heartRate,
        weight: values.weight,
      },
      assessment: values.assessment,
      plan: values.plan,
      notes: values.notes || "",
      providerId: "prov1",
      providerName: values.providerName,
      status: "completed",
    });
    
    toast({
      title: "Visit Added",
      description: `New ${values.type} visit has been recorded for ${patient.name}.`,
    });
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Visit</DialogTitle>
          <DialogDescription>
            Record a new visit for {patient.name}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Visit Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Visit Type</FormLabel>
                    <FormControl>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md" {...field}>
                        <option value="routine">Routine</option>
                        <option value="follow-up">Follow-up</option>
                        <option value="urgent">Urgent</option>
                        <option value="consultation">Consultation</option>
                        <option value="procedure">Procedure</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="chiefComplaint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chief Complaint</FormLabel>
                  <FormControl>
                    <Input placeholder="Patient's main concern or reason for visit" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-3">
              <h4 className="font-medium">Vital Signs</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <FormField
                  control={form.control}
                  name="temperature"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Temperature (°F)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.1" placeholder="98.6" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bloodPressure"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blood Pressure</FormLabel>
                      <FormControl>
                        <Input placeholder="120/80" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="heartRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Heart Rate (bpm)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="72" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight (lbs)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.1" placeholder="150" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="assessment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assessment</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Clinical assessment and findings..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="plan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plan</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Treatment plan and next steps..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Additional clinical notes..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="providerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Provider</FormLabel>
                  <FormControl>
                    <Input placeholder="Dr. Sarah Smith" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="submit">Save Visit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
