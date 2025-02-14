import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormStore } from "@/store/formStore";
import { Plus, X } from "lucide-react";
import { CustomForm, FormField, FieldType } from "@/types/form";
import { DialogDescription } from "@radix-ui/react-dialog";

interface UpdateFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formId?: string;
}

export const UpdateFormDialog: React.FC<UpdateFormDialogProps> = ({
  open,
  onOpenChange,
  formId,
}) => {
  const updateForm = useFormStore((state) => state.updateForm);
  const currentForm = useFormStore((state) =>
    state.forms.find((f) => f.id === formId)
  );

  // États pour gérer les champs du formulaire
  const [title, setTitle] = useState(currentForm?.title || "");
  const [description, setDescription] = useState(
    currentForm?.description || ""
  );
  const [fields, setFields] = useState<FormField[]>(currentForm?.fields || []);

  // Ajouter un nouveau champ
  const handleAddField = () => {
    const newField: FormField = {
      id: crypto.randomUUID(),
      label: "",
      type: "text",
      required: false,
      placeholder: "",
    };
    setFields([...fields, newField]);
  };

  // Supprimer un champ
  const handleRemoveField = (id: string) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  // Mettre à jour un champ
  const handleFieldChange = (id: string, updates: Partial<FormField>) => {
    setFields(
      fields.map((field) =>
        field.id === id ? { ...field, ...updates } : field
      )
    );
  };

  // Soumettre les modifications
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentForm) return;

    const updatedForm: CustomForm = {
      ...currentForm,
      title,
      description,
      fields,
      updatedAt: new Date(),
    };

    updateForm(currentForm.id, updatedForm);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Modifier le formulaire</DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Titre</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Titre du formulaire"
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description du formulaire"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Champs du formulaire</h4>
              <Button
                type="button"
                variant="default"
                size="sm"
                onClick={handleAddField}
              >
                <Plus className="mr-2 h-4 w-4" />
                Ajouter un champ
              </Button>
            </div>

            {fields.map((field) => (
              <div
                key={field.id}
                className="flex items-start space-x-4 p-4 border rounded-lg"
              >
                <div className="flex-1 space-y-2">
                  <Input
                    value={field.label}
                    onChange={(e) =>
                      handleFieldChange(field.id, { label: e.target.value })
                    }
                    placeholder="Nom du champ"
                  />
                  <select
                    className="w-full border rounded-md h-9 px-3"
                    value={field.type}
                    onChange={(e) =>
                      handleFieldChange(field.id, {
                        type: e.target.value as FieldType,
                      })
                    }
                  >
                    <option value="text">Texte</option>
                    <option value="number">Nombre</option>
                    <option value="date">Date</option>
                    <option value="email">Email</option>
                    <option value="textarea">Zone de texte</option>
                  </select>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveField(field.id)}
                >
                  <X className="size-6" />
                </Button>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="destructive"
              onClick={() => onOpenChange(false)}
            >
              Annuler
            </Button>
            <Button type="submit">Enregistrer les modifications</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
