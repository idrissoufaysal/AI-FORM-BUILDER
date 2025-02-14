import { create } from 'zustand';
import { CustomForm } from '@/types/form';

interface FormStore {
  forms: CustomForm[];
  addForm: (form: CustomForm) => void;
  updateForm: (id: string, form: CustomForm) => void;
  deleteForm: (id: string) => void;
}

export const useFormStore = create<FormStore>((set) => ({
  forms: [],
  addForm: (form) =>
    set((state) => ({
      forms: [...state.forms, form],
    })),
  updateForm: (id, updatedForm) =>
    set((state) => ({
      forms: state.forms.map((form) =>
        form.id === id ? updatedForm : form
      ),
    })),
  deleteForm: (id) =>
    set((state) => ({
      forms: state.forms.filter((form) => form.id !== id),
    })),
}));