"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "./ui/button";
import { AiChatSession } from "@/utils/AIModel";
import { Textarea } from "./ui/textarea";
import { BotMessageSquare } from "lucide-react";
import { NewFormDialog } from "./NewFormDialog";
import { AiGeneratedForm } from "@/types/form";

const PROMPT =
  " On the basis of description please give form in json format with form title, form description with form having Form field, form name, placeholder name, and form label, fieldType, field required In Json format .in French and not more than 600 caractere";

export const AiDialogue = () => {
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [generatedForm, setGeneratedForm] = useState<AiGeneratedForm | null>(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const result = await AiChatSession.sendMessage(
        "Description:" + userInput + PROMPT
      );
      const response = result.response.text();
      
      // Clean up the response by removing markdown code block markers
      const cleanJson = response
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();
      
      const formData = JSON.parse(cleanJson);
      setGeneratedForm(formData);
      setOpenDialog(false);
      setOpenFormDialog(true);
      setUserInput("");
    } catch (error) {
      console.error("Error parsing AI response:", error);
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={() => setOpenDialog(true)} variant={"outline"}>
        <BotMessageSquare className="text-blue-500" />
        Generate Form with Ai
      </Button>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Creation de formulaire</DialogTitle>
            <DialogDescription>
              <Textarea 
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)} 
                placeholder="Décrivez le formulaire que vous souhaitez générer..."
              />
              <div className="flex justify-end gap-2 mt-2">
                <Button
                  onClick={() => setOpenDialog(false)}
                  variant={"destructive"}
                >
                  annuler
                </Button>
                <Button disabled={isLoading} onClick={handleSubmit}>
                  {isLoading ? "Generating..." : "Generate Form"}
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <NewFormDialog
        open={openFormDialog}
        onOpenChange={setOpenFormDialog}
        aiGeneratedForm={generatedForm!}
      />
    </div>
  );
};
