"use client"
import { Trash2, Pencil } from "lucide-react";
import { Button } from "./ui/button";
import { CustomForm } from "@/types/form";
import { UpdateFormDialog } from "./UpdateForm";
import { useFormStore } from "@/store/formStore";
import { useState } from "react";
import Formfield from "./Formfield";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  
} from "./ui/card"; // Import des composants Card de Shadcn UI

export default function FormCard({ form }: { form: CustomForm }) {
  const deleteForm = useFormStore((state) => state.deleteForm);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isFormFieldDialogOpen, setIsFormFieldDialogOpen] = useState(false);

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Empêche la propagation du clic à la Card parente
    setIsUpdateDialogOpen(true);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Empêche la propagation du clic à la Card parente
    deleteForm(form.id);
  };

  const handleCardClick = () => {
    setIsFormFieldDialogOpen(true); // Ouvre le dialogue Formfield
  };

  return (
    <>
      <Card
        className="cursor-pointer transition-shadow hover:shadow-lg"
        onClick={handleCardClick} // Ouvre Formfield au clic sur la Card
      >
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{form.title}</CardTitle>
              <CardDescription>{form.description}</CardDescription>
            </div>
            <div className="flex space-x-2">
              {/* Bouton Modifier */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleEditClick} // Ouvre UpdateFormDialog
              >
                <Pencil className="h-4 w-4" />
              </Button>

              {/* Bouton Supprimer */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDeleteClick} // Supprime le formulaire
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-slate-500">
            {form.fields.length} champ(s)
          </div>
        </CardContent>
      </Card>

      {/* Dialogue pour modifier le formulaire */}
      {isUpdateDialogOpen && (
        <UpdateFormDialog
          open={isUpdateDialogOpen}
          onOpenChange={setIsUpdateDialogOpen}
          formId={form.id}
        />
      )}

      {/* Dialogue pour afficher les champs du formulaire */}
      {isFormFieldDialogOpen && (
        <Formfield
          open={isFormFieldDialogOpen}
          onOpenChange={setIsFormFieldDialogOpen}
          form={form}
        />
      )}
    </>
  );
}