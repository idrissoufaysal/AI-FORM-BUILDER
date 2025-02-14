import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { CustomForm } from "@/types/form";

interface FormfieldProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: CustomForm;
}

export default function Formfield({ open, onOpenChange, form }: FormfieldProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex justify-center capitalize">{form.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {form.fields.map((field) => (
            <div key={field.id} className="space-y-2">
              <label className="block text-sm font-medium capitalize">
                {field.label}
              </label>
              <input
                type={field.type}
                placeholder={field.placeholder}
                className="w-full p-2 border rounded-md"
              />
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}